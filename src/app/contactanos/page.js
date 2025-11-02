'use client';

import { useState } from "react";
//import emailjs from "@emailjs/browser";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    necesidad: ""
  });

  const [errores, setErrores] = useState({
    email: "",
    telefono: ""
  });

  const [modal, setModal] = useState({ open: false, mensaje: "", error: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefono") {
      const soloNumeros = value.replace(/[^0-9+\-\s]/g, "");
      setFormData({ ...formData, [name]: soloNumeros });
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
      setErrores((prev) => ({ ...prev, email: emailRegex.test(value) ? "" : "Email inválido" }));
    }

    if (name === "telefono") {
      const telRegex = /^[0-9+\-\s]{7,15}$/;
      setErrores((prev) => ({ ...prev, telefono: telRegex.test(value) ? "" : "Teléfono inválido" }));
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

    setLoading(true);

    try {
      await emailjs.send(
        "TU_SERVICE_ID",   // reemplazar con tu service ID
        "TU_TEMPLATE_ID",  // reemplazar con tu template ID
        formData,
        "TU_PUBLIC_KEY"    // reemplazar con tu public key
      );
      setModal({ open: true, mensaje: "Formulario enviado correctamente!", error: false });
      setFormData({ nombre: "", email: "", telefono: "", necesidad: "" });
      setErrores({ email: "", telefono: "" });
    } catch (err) {
      console.error(err);
      setModal({ open: true, mensaje: "Hubo un error al enviar el mensaje.", error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Contacto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Nombre */}
        <label className="flex flex-col">
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ingrese su nombre"
            className="mt-1 p-2 text-gray-600 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        {/* Email */}
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Ingrese su email"
            className={`mt-1 p-2 text-gray-600 bg-white border rounded focus:outline-none focus:ring-2 ${
              errores.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errores.email && <span className="text-red-500 text-sm mt-1">{errores.email}</span>}
        </label>

        {/* Teléfono */}
        <label className="flex flex-col">
          Teléfono:
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="Ingrese su teléfono"
            className={`mt-1 p-2 text-gray-600 bg-white border rounded focus:outline-none focus:ring-2 ${
              errores.telefono ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {errores.telefono && <span className="text-red-500 text-sm mt-1">{errores.telefono}</span>}
        </label>

        {/* Necesidad */}
        <label className="flex flex-col">
          Necesidad:
          <textarea
            name="necesidad"
            value={formData.necesidad}
            onChange={handleChange}
            required
            placeholder="Describa su necesidad"
            className="mt-1 p-2 text-gray-600 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
          />
        </label>

        {/* Botón */}
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-black border border-black rounded p-3 mt-2 transform transition-transform duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full text-center">
            <p className={`mb-4 ${modal.error ? "text-red-500" : "text-green-500"}`}>{modal.mensaje}</p>
            <button
              onClick={() => setModal({ ...modal, open: false })}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacto;
