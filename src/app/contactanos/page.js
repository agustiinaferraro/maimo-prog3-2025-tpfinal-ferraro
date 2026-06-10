'use client'

import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import BackButton from "../components/BackButton";

const Contacto = () => {
  const { enviarContacto, loading, modal, setModal } = useAppContext();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    necesidad: ""
  });

  const [errores, setErrores] = useState({ email: "", telefono: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono") {
      setFormData({ ...formData, [name]: value.replace(/[^0-9+\-\s]/g, "") });
      return;
    }
    setFormData({ ...formData, [name]: value });
    if (name === "email") setErrores({ ...errores, email: "" });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value) return;
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrores(prev => ({ ...prev, email: emailRegex.test(value) ? "" : "Email inválido" }));
    }
    if (name === "telefono") {
      const telRegex = /^[0-9+\-\s]{7,15}$/;
      setErrores(prev => ({ ...prev, telefono: telRegex.test(value) ? "" : "Teléfono inválido" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    handleBlur({ target: { name: "email", value: formData.email } });
    handleBlur({ target: { name: "telefono", value: formData.telefono } });

    if (!formData.nombre || !formData.email || !formData.telefono || !formData.necesidad || errores.email || errores.telefono) {
      setModal({ open: true, mensaje: "Corrige los errores antes de enviar.", error: true });
      return;
    }

    const success = await enviarContacto(formData);
    if (success) setFormData({ nombre: "", email: "", telefono: "", necesidad: "" });
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-3 mb-6">
          <BackButton />
          <div className="w-1.5 h-8 bg-white rounded-full" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-10 h-10">
            <rect x="2" y="4" width="20" height="16" rx="3" fill="white" />
            <polyline points="2,6 12,13 22,6" fill="none" stroke="black" strokeWidth="2" />
          </svg>
          <h3 className="text-4xl sm:text-5xl font-bold text-white">Contacto</h3>
        </div>
        <div className="max-w-md mb-8 px-4 sm:px-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Campos */}
          <label className="flex flex-col">
            Nombre:
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Ingrese su nombre" className="mt-1 p-3 text-gray-600 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"/>
          </label>

          <label className="flex flex-col">
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} required placeholder="Ingrese su email" className={`mt-1 p-3 text-gray-600 bg-white border rounded focus:outline-none focus:ring-2 w-full ${errores.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"}`}/>
            {errores.email && <span className="text-red-500 text-sm mt-1">{errores.email}</span>}
          </label>

          <label className="flex flex-col">
            Teléfono:
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} onBlur={handleBlur} required placeholder="Ingrese su teléfono" className={`mt-1 p-3 text-gray-600 bg-white border rounded focus:outline-none focus:ring-2 w-full ${errores.telefono ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"}`}/>
            {errores.telefono && <span className="text-red-500 text-sm mt-1">{errores.telefono}</span>}
          </label>

          <label className="flex flex-col">
            Necesidad:
            <textarea name="necesidad" value={formData.necesidad} onChange={handleChange} required placeholder="Describa su necesidad" className="mt-1 p-3 text-gray-600 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 w-full min-h-[120px]"/>
          </label>

          <button type="submit" disabled={loading} className="cursor-pointer bg-white text-black rounded p-3 mt-2 transform transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50">
            {loading ? "Enviando..." : "Enviar"}
          </button>
        </form>

        {modal.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
              <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${modal.error ? "bg-red-500/20" : "bg-green-500/20"}`}>
                {modal.error ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8 text-red-400">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-8 h-8 text-green-400">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9,12 11,14 15,10" />
                  </svg>
                )}
              </div>
              <h3 className={`text-xl font-bold mb-2 ${modal.error ? "text-red-300" : "text-green-300"}`}>
                {modal.error ? "Error" : "Mensaje enviado"}
              </h3>
              <p className="text-gray-200 mb-6">{modal.mensaje}</p>
              <button onClick={() => setModal({ ...modal, open: false })} className="cursor-pointer px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:scale-105 active:scale-95 transition-transform duration-200 w-full">
                Aceptar
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Contacto;