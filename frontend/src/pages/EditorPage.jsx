import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import io from "socket.io-client";
import Editor from "@monaco-editor/react";
import { Users, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const SOCKET_SERVER_URL = import.meta.env.VITE_API_URL;

export default function EditorPage() {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  const [code, setCode] = useState(
    "// Welcome to CodeGo! \n// Start typing to collaborate in real-time.\n",
  );
  const [language, setLanguage] = useState("javascript");
  const [activeUsers, setActiveUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);

  const editorRef = useRef(null);
  const decorationsRef = useRef([]);

  // Socket initialization
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_API_URL, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.emit("join-room", { roomId, user });

    // Ensure current user is in active users
    setActiveUsers([{ socketId: newSocket.id, user }]);

    return () => {
      newSocket.emit("leave-room", { roomId, user });
      newSocket.disconnect();
    };
  }, [roomId, user]);

  // Socket events
  useEffect(() => {
    if (!socket) return;

    socket.on(
      "room-state",
      ({ code: initialCode, language: initialLanguage }) => {
        if (initialCode) setCode(initialCode);
        if (initialLanguage) setLanguage(initialLanguage);
      },
    );

    socket.on("language-sync", (newLang) => {
      setLanguage(newLang);
    });

    socket.on("user-joined", ({ socketId, user: joinedUser }) => {
      setActiveUsers((prev) => {
        if (prev.find((u) => u.socketId === socketId)) return prev;
        return [...prev, { socketId, user: joinedUser }];
      });
    });

    socket.on("code-sync", (newCode) => {
      if (newCode !== code) {
        setCode(newCode);
      }
    });

    socket.on("user-typing-sync", ({ user: typist }) => {
      setTypingUser(typist);
      clearTimeout(window.typingTimeout);
      window.typingTimeout = setTimeout(() => setTypingUser(null), 2000);
    });

    socket.on("cursor-sync", ({ socketId, user: cursorUser, position }) => {
      if (!editorRef.current) return;
      const editor = editorRef.current;

      const decorationTheme =
        cursorUser.name === "Alice" ? "cursor-pink" : "cursor-blue";

      // Basic Monaco decorations for cursors
      const newDecoration = {
        range: new window.monaco.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column,
        ),
        options: {
          className: `remote-cursor ${decorationTheme}`,
          hoverMessage: { value: cursorUser.name },
        },
      };

      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
        newDecoration,
      ]);
    });

    socket.on("user-left", ({ socketId }) => {
      setActiveUsers((prev) => prev.filter((u) => u.socketId !== socketId));
    });

    return () => {
      socket.off("room-state");
      socket.off("language-sync");
      socket.off("user-joined");
      socket.off("code-sync");
      socket.off("user-typing-sync");
      socket.off("cursor-sync");
      socket.off("user-left");
    };
  }, [socket, code]);

  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit("code-change", { roomId, code: value });
    socket.emit("user-typing", { roomId, user });

    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => {
      socket.emit("save-document", { roomId, code: value, language });
    }, 1000);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    window.monaco = monaco;

    editor.onDidChangeCursorPosition((e) => {
      socket.emit("cursor-move", {
        roomId,
        user,
        position: e.position,
      });
    });
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-2 hover:bg-white/5 rounded-xl transition text-gray-400"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-bold text-lg">CodeGo Workspace</h1>
            <p className="text-xs text-gray-400 font-mono flex items-center gap-2 mt-0.5">
              Room ID: {roomId}
              <button
                onClick={() => navigator.clipboard.writeText(roomId)}
                className="bg-slate-800 hover:bg-slate-700 text-blue-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold transition"
              >
                Copy ID
              </button>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex -space-x-3 pr-4 border-r border-slate-700">
            {activeUsers.slice(0, 5).map((u, i) => (
              <div
                key={i}
                title={u.user?.name}
                className="w-8 h-8 rounded-full border-2 border-slate-900 bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-xs font-bold shadow-lg z-10"
              >
                {u.user?.name?.charAt(0).toUpperCase()}
              </div>
            ))}
            {activeUsers.length > 5 && (
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold z-0">
                +{activeUsers.length - 5}
              </div>
            )}
          </div>

          <select
            value={language}
            onChange={(e) => {
              const newLang = e.target.value;
              setLanguage(newLang);
              if (socket) {
                socket.emit("language-change", { roomId, language: newLang });
                socket.emit("save-document", {
                  roomId,
                  code,
                  language: newLang,
                });
              }
            }}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c">C / C++</option>
            <option value="html">HTML / CSS</option>
            <option value="json">JSON</option>
          </select>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex pt-4 px-4 pb-4 gap-4">
        {/* Editor Area */}
        <div className="flex-1 bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl relative border border-slate-700/50">
          {typingUser && typingUser.name !== user.name && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 right-4 z-10 bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2"
            >
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                <span
                  className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></span>
                <span
                  className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>
              </div>
              {typingUser.name} is typing...
            </motion.div>
          )}

          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: '"Fira Code", monospace',
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: true,
              smoothScrolling: true,
              padding: { top: 20 },
            }}
          />
        </div>
      </div>

      <style>{`
        .remote-cursor {
          border-left: 2px solid;
          position: absolute;
        }
        .remote-cursor::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .cursor-blue { border-color: #3b82f6; }
        .cursor-blue::before { background-color: #3b82f6; }
        .cursor-pink { border-color: #ec4899; }
        .cursor-pink::before { background-color: #ec4899; }
      `}</style>
    </div>
  );
}
