import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
      {/* Background blobs for glassmorphism effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/20 blur-[120px]" />

      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <Code2 className="w-8 h-8 text-blue-400" />
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            CodeGo
          </span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
          <Link to="/login" className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 font-medium">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            Code Together, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              In Real-Time.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-light">
            The ultimate collaborative workspace for developers. Write, execute, and build faster with live synchronization.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/login" className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 transition text-lg font-bold shadow-xl shadow-purple-500/25 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Start Coding Now
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-24 grid md:grid-cols-3 gap-8 text-left"
        >
          <FeatureCard 
            icon={<Users className="w-8 h-8 text-blue-400" />}
            title="Real-time Collaboration"
            desc="See exactly what your team is typing with instant cursor syncing."
          />
          <FeatureCard 
            icon={<Code2 className="w-8 h-8 text-purple-400" />}
            title="Clean Interface"
            desc="A powerful Monaco-based editor optimized strictly for seamless and reliable real-time collaboration."
          />
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-pink-400" />}
            title="Lightning Fast"
            desc="Powered by WebSockets for zero latency code synchronization."
          />
        </motion.div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition group">
      <div className="mb-4 p-3 bg-white/5 rounded-2xl inline-block group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
}
