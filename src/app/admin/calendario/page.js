'use client'

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function compressImage(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      let w = img.width, h = img.height;
      if (w > maxWidth) { h = h * maxWidth / w; w = maxWidth; }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob((blob) => resolve(blob), "image/jpeg", quality);
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function AdminCalendario() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => router.push("/calendario"), 1500);
      return () => clearTimeout(t);
    }
  }, [success, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");
    if (!file) { setError("Seleccioná una imagen"); return; }
    setLoading(true);
    try {
      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("password", password);
      formData.append("image", compressed, "calendario.jpg");
      const res = await fetch(`${API_URL}/calendario-upload`, { method: "POST", body: formData });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        let msg = "Error";
        try { const d = JSON.parse(text); msg = d.message || msg; } catch {}
        setError(msg); return;
      }
      setSuccess(true);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {success ? (
          <div className="text-center py-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 text-green-500 mx-auto mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-green-700 font-semibold text-lg">Imagen subida</p>
            <p className="text-gray-500 text-sm mt-2">Redirigiendo al calendario...</p>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Subir calendario</h1>

            {message && <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg mb-4 text-sm font-semibold">{message}</div>}
            {error && <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg mb-4 text-sm font-semibold">{error}</div>}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-700">Contraseña</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border rounded px-3 py-2 text-gray-900" required />
            </div>

            {!preview && (
              <div onClick={() => fileRef.current?.click()} className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-2 hover:border-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-sm text-gray-500">Hacé clic para seleccionar</span>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="hidden" />

            {preview && (
              <div className="space-y-4">
                <div className="relative">
                  <img src={preview} alt="" className="w-full rounded-lg border" />
                  <button type="button" onClick={() => { setFile(null); setPreview(null); if (fileRef.current) fileRef.current.value = ""; }} className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:bg-red-50 transition" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-red-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
                <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium">
                  {loading ? "Subiendo..." : "Guardar"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
