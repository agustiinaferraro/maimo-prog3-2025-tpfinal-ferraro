'use client'

import { createContext, useContext, useState } from "react";
import axios from "axios";

const AppContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AppProvider = ({ children }) => {
  const [actividades, setActividades] = useState([]); //estas son las que necesito del back
  const [predicas, setPredicas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); //busqueda

   // ACTIVIDADES
  const fetchActividades = async () => { //fetch es una fucncion asincronica
    try {
      const res = await axios.get(`${API_URL}/actividades`); //agarro acitivdadeds del link de api
      // link img
      const dataWithImages = res.data.map(act => ({
      ...act,//... me trae todas las rtas del objeto, en este caso de las portadas, imgs y acts
      Portada: act.Portada 
        ? `${API_URL}/${act.Portada}` 
        : "",
      ImagenesActividades: act.ImagenesActividades
      ? act.ImagenesActividades.map(img => `${API_URL}/${img}`)  
      : [],    
    }));

      setActividades(dataWithImages);
    } catch (error) {
      console.log("Error fetching actividades:", error);
      setActividades([]);
    }
  };
  
  const fetchPredicas = async () => {
    try{
    const res = await axios.get (`${API_URL}/predicas`);
    const dataWithPredicas = res.data.map(pred => ({
      ...pred
    }))
    setPredicas(dataWithPredicas)
    } catch (error) {
      console.log("Error al hacer el fetch de las predicas", error);
      setPredicas([]);
    }
  }

  return (
    <AppContext.Provider
      value={{
        API_URL,
        searchTerm,
        setSearchTerm,
        actividades,
        fetchActividades,
        predicas,
        fetchPredicas
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
