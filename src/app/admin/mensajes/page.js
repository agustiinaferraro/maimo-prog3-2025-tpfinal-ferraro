'use client'

import { useState, useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AdminMensajes = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (password === "admin123") {
      setAuthenticated(true);
    } else {
      setError("Contraseña incorrecta");
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    fetch(`${API_URL}/contact`)
      .then((res) => res.json())
      .then((data) => { setMessages(data); setLoading(false); })
      .catch(() => { setError("Error al cargar mensajes"); setLoading(false); });
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Mensajes recibidos</h1>
          {error && <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}
          <form onSubmit={handleLogin}>
            <label className="block text-sm font-medium mb-1 text-gray-700">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 text-gray-900 mb-4" required />
            <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium">Ingresar</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Mensajes recibidos</h1>
        {loading && <p className="text-gray-400">Cargando...</p>}
        {!messages.length && !loading && <p className="text-gray-400">No hay mensajes.</p>}
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
              <p className="text-white font-semibold">{msg.nombre}</p>
              <p className="text-gray-300 text-sm">{msg.email} — {msg.telefono}</p>
              <p className="text-gray-200 mt-2">{msg.necesidad}</p>
              <p className="text-gray-500 text-xs mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMensajes;
