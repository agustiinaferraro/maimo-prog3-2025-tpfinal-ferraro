'use client'

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

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
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasImage, setHasImage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef(null);

  const checkImage = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/calendario-image`);
      setHasImage(res.ok);
    } catch {
      setHasImage(false);
    }
  }, []);

  useEffect(() => { checkImage(); }, [checkImage]);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (message || error) {
      const t = setTimeout(() => { setMessage(""); setError(""); }, 4000);
      return () => clearTimeout(t);
    }
  }, [message, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!file) {
      setError("Seleccioná una imagen");
      return;
    }

    setLoading(true);
    try {
      const compressed = await compressImage(file);
      const formData = new FormData();
      formData.append("password", password);
      formData.append("image", compressed, "calendario.jpg");

      const res = await fetch(`${API_URL}/calendario-upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        let msg = "Error al subir la imagen";
        try { const d = JSON.parse(text); msg = d.message || msg; } catch {}
        setError(msg);
        return;
      }

      setMessage("Imagen subida correctamente");
      setPassword("");
      setFile(null);
      setPreview(null);
      setHasImage(true);
      if (fileRef.current) fileRef.current.value = "";
    } catch (e) {
      setError("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!password) { setError("Ingresá la contraseña primero"); return; }
    setDeleting(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch(`${API_URL}/calendario-delete?password=${encodeURIComponent(password)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessage("Imagen eliminada");
        setHasImage(false);
        setPassword("");
      } else {
        const d = await res.json().catch(() => ({}));
        setError(d.message || "Error al eliminar");
      }
    } catch (e) {
      setError("Error: " + e.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <Link href="/calendario" className="text-white hover:text-gray-300 transition-colors mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Volver al calendario
      </Link>

      {message && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded-lg mb-4 max-w-md w-full text-center text-sm font-semibold">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg mb-4 max-w-md w-full text-center text-sm font-semibold">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Imagen del calendario</h1>

        {/* Contraseña */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">Contraseña de administrador</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 text-gray-900"
            required
          />
        </div>

        {hasImage ? (
          /* Estado: ya hay imagen subida */
          <div className="space-y-4">
            <img
              src={`${API_URL}/calendario-image?t=${Date.now()}`}
              alt="Calendario actual"
              className="w-full rounded-lg border"
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setHasImage(false); setFile(null); setPreview(null); }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Reemplazar imagen
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting || !password}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition disabled:opacity-50 flex items-center gap-2"
                title="Eliminar imagen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          /* Estado: formulario de subida */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Imagen del calendario</label>
              <div
                onClick={() => fileRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-2 hover:border-blue-400 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-sm text-gray-500">Hacé clic para seleccionar</span>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                required
              />
              {preview && (
                <div className="mt-3 flex items-center gap-3 bg-gray-50 rounded-lg p-2">
                  <img src={preview} alt="Vista previa" className="w-16 h-16 object-cover rounded border" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 font-medium truncate">{file?.name}</p>
                    <p className="text-xs text-gray-500">{file ? `${(file.size / 1024).toFixed(0)} KB` : ""}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setFile(null); setPreview(null); if (fileRef.current) fileRef.current.value = ""; }}
                    className="text-gray-400 hover:text-red-600 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 font-medium"
            >
              {loading ? "Subiendo..." : "Subir imagen"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
