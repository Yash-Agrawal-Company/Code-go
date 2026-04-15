import Room from '../models/Room.js';
import { v4 as uuidv4 } from 'uuid';

export const createRoom = async (req, res) => {
  const { name } = req.body;
  try {
    const roomId = uuidv4();
    const room = await Room.create({
      roomId,
      name,
      createdBy: req.user._id,
      participants: [req.user._id]
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      $or: [
        { createdBy: req.user._id },
        { participants: req.user._id }
      ]
    }).populate('createdBy', 'name email').populate('participants', 'name email');
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const joinRoomRequest = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({ roomId });
    if (!room) return res.status(404).json({ message: 'Room not found' });
    
    // If the user isn't in the pending requests and not a participant, add them
    if (!room.participants.includes(req.user._id) && !room.pendingRequests.includes(req.user._id)) {
      room.pendingRequests.push(req.user._id);
      await room.save();
    }
    res.status(200).json({ message: 'Request sent successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
