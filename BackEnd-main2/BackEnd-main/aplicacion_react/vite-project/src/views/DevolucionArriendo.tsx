// src/views/Devolucion.tsx

import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "../services/axiosInstance";
import { getArriendosActivos } from "../services/ArriendoService";
import type { Arriendo } from "../types/arriendo";

// Loader: carga arriendos activos desde el backend
export async function loader() {
  try {
    const arriendos = await getArriendosActivos();
    return arriendos;
  } catch (error) {
    console.error("Error cargando arriendos activos:", error);
    return [];
  }
}

export default function Devolucion() {
  const arriendosIniciales = useLoaderData() as Arriendo[];
  const [arriendos, setArriendos] = useState(arriendosIniciales);

  // Función para registrar la devolución (coloca la fecha actual como fechaFin)
  const handleRegistrarDevolucion = async (id: number) => {
    const confirmar = window.confirm("¿Registrar devolución de este arriendo?");
    if (!confirmar) return;

    try {
      const fechaFin = new Date().toISOString().split("T")[0];
      await axios.put(`/arriendos/${id}`, { fechaFin });

      // Quitar el arriendo devuelto de la lista
      setArriendos((prev) => prev.filter((a) => a.id !== id));
      alert("Devolución registrada correctamente");
    } catch (error) {
      console.error("Error registrando devolución:", error);
      alert("No se pudo registrar la devolución");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registrar Devoluciones</h2>

      <div className="card shadow">
        <div className="card-header bg-warning text-dark fw-bold">
          Arriendos Activos
        </div>
        <div className="card-body">
          {arriendos.length === 0 ? (
            <p>No hay arriendos activos para devolver.</p>
          ) : (
            <ul className="list-group">
              {arriendos.map((a) => (
                <li
                  key={a.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  #{a.id.toString().padStart(3, "0")} - Cliente: {a.nombreCliente} - Vehículo: {a.patenteVehiculo}
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleRegistrarDevolucion(a.id)}
                  >
                    Registrar Devolución
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
