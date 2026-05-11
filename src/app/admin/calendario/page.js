'use client'

import { useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminCalendario() {
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!file) {
      setError("Seleccioná una imagen");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("password", password);
    formData.append("image", file);

    try {
      const res = await fetch(`${API_URL}/calendario-upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Imagen subida correctamente");
        setPassword("");
        setFile(null);
      } else {
        setError(data.message || "Error al subir la imagen");
      }
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <Link href="/calendario" className="text-white hover:text-gray-300 transition-colors mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Volver al calendario
      </Link>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-900">Subir imagen del calendario</h1>

        {message && <p className="text-green-700 text-sm text-center font-medium">{message}</p>}
        {error && <p className="text-red-700 text-sm text-center font-medium">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Contraseña de administrador</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 text-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Imagen del calendario</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Subiendo..." : "Subir imagen"}
        </button>
      </form>
    </div>
  );
}
