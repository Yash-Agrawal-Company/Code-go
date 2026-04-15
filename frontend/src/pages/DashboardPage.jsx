import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, LayoutDashboard, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get('/rooms');
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoomName) return;
    try {
      const res = await api.post('/rooms', { name: newRoomName });
      setIsCreating(false);
      setNewRoomName('');
      navigate(`/editor/${res.data.roomId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoinRequested = async (e) => {
    e.preventDefault();
    if (!joinRoomId) return;
    navigate(`/editor/${joinRoomId}`); 
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10 text-blue-400 font-bold text-xl">
          <LayoutDashboard /> Dashboard
        </div>
        
        <div className="flex-1 space-y-4">
        </div>

        <div className="mt-auto border-t border-slate-800 pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate w-32">{user?.email}</p>
            </div>
          </div>
          <button onClick={logout} className="w-full flex items-center gap-2 text-gray-400 hover:text-red-400 transition">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      
      <main className="flex-1 p-10 overflow-y-auto w-full relative">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Your Workspaces</h1>
          <div className="flex gap-4">
            <form onSubmit={handleJoinRequested} className="flex gap-2">
              <input 
                 type="text"
                 placeholder="Enter Room ID to join..."
                 className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 text-sm w-64"
                 value={joinRoomId}
                 onChange={(e) => setJoinRoomId(e.target.value)}
              />
              <button 
                 type="submit"
                 className="px-5 py-2 bg-slate-700 hover:bg-slate-600 rounded-xl font-medium text-sm transition"
              >
                Join
              </button>
            </form>
            <button 
              onClick={() => setIsCreating(true)}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium flex items-center gap-2 transition text-sm"
            >
              <Plus className="w-4 h-4"/> New Room
            </button>
          </div>
        </header>

        {isCreating && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 p-6 rounded-2xl mb-8 border border-slate-700 flex gap-4"
            onSubmit={handleCreateRoom}
          >
            <input 
              type="text" 
              placeholder="Workspace Name (e.g. Next.js App)"
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 text-sm"
              value={newRoomName}
              onChange={e => setNewRoomName(e.target.value)}
              autoFocus
            />
            <button type="submit" className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded-xl text-sm font-medium transition">Create</button>
            <button type="button" onClick={() => setIsCreating(false)} className="bg-slate-700 hover:bg-slate-600 px-6 py-2 rounded-xl text-sm font-medium transition">Cancel</button>
          </motion.form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <div key={room._id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-500 transition group cursor-pointer flex flex-col" onClick={() => navigate(`/editor/${room.roomId}`)}>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">{room.name}</h3>
              <p className="text-sm text-gray-400 mb-6 flex items-center gap-2">
                Room ID: <span className="font-mono bg-slate-900 px-2 rounded-md">{room.roomId.split('-')[0]}...</span>
              </p>
              
              <div className="mt-auto flex justify-between items-center text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {room.participants.length} Participant(s) 
                </span>
                <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs">Active</span>
              </div>
            </div>
          ))}
          {rooms.length === 0 && !isCreating && (
             <div className="col-span-full py-20 text-center text-gray-500 border-2 border-dashed border-slate-700 rounded-3xl">
               No workspaces found. Create one to get started!
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
