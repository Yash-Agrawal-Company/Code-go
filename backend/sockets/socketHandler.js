import Room from '../models/Room.js';

export default function setupSockets(io) {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join room
    socket.on('join-room', async ({ roomId, user }) => {
      socket.join(roomId);
      console.log(`User ${user?.name} joined room: ${roomId}`);
      
      try {
        const room = await Room.findOne({ roomId });
        if (room) {
          // Send current state to the user who just joined
          socket.emit('room-state', { code: room.code, language: room.language });
          
          // Ensure user is added to participants array on join
          if (user && user._id) {
            await Room.updateOne({ roomId }, { $addToSet: { participants: user._id } });
          }
        }
      } catch (err) {
        console.error('Error fetching room state:', err);
      }
      
      // Notify others in room
      socket.to(roomId).emit('user-joined', { socketId: socket.id, user });
    });

    // Handle code change
    socket.on('code-change', ({ roomId, code }) => {
      socket.to(roomId).emit('code-sync', code);
    });

    // Handle saving code to db
    socket.on('save-document', async ({ roomId, code, language }) => {
      try {
        await Room.findOneAndUpdate({ roomId }, { code, language });
      } catch (err) {
        console.error('Error saving document:', err);
      }
    });

    // Handle language change
    socket.on('language-change', ({ roomId, language }) => {
      socket.to(roomId).emit('language-sync', language);
    });

    // Handle typing indicator
    socket.on('user-typing', ({ roomId, user }) => {
      socket.to(roomId).emit('user-typing-sync', { user });
    });

    // Handle cursor tracking
    socket.on('cursor-move', ({ roomId, user, position }) => {
      socket.to(roomId).emit('cursor-sync', { socketId: socket.id, user, position });
    });

    // Handle leaving room explicitly
    socket.on('leave-room', ({ roomId, user }) => {
      socket.leave(roomId);
      socket.to(roomId).emit('user-left', { socketId: socket.id, user });
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      // Usually would need to map socket.id to a room to broadcast user-left
      // That will be handled on the frontend via 'leave-room' on unmount
    });
  });
}
