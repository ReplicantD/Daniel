import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { arriendoBorrar, getArriendos } from "../services/ArriendoService";
import type { Arriendo } from "../types/arriendo";

// loader para cargar arriendos inicialmente
export async function loader() {
  try {
    const arriendos = await getArriendos();
    return arriendos;
  } catch (error) {
    console.error("Error en loader de arriendos:", error);
    return [];
  }
}

export default function Arriendos() {
  const arriendosIniciales = useLoaderData() as Arriendo[];
  const [arriendos, setArriendos] = useState(arriendosIniciales);

  const handleEliminarArriendo = async (id: number) => {
    
    const resultado = await arriendoBorrar(id);

    if (resultado.success) {
      // Filtra el arreglo para eliminar el arriendo borrado
      setArriendos(prev => prev.filter(a => a.id !== id));
    } else {
      alert("No se pudo eliminar el arriendo.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Arriendos</h2>
      {arriendos.length === 0 ? (
        <p>No hay arriendos para mostrar</p>
      ) : (
        <ul className="list-group">
          {arriendos.map((a) => (
            <li
              key={a.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                #{a.id.toString().padStart(3, "0")} - Cliente: {a.nombreCliente} - Vehículo: {a.patenteVehiculo}
              </span>
              <button
                onClick={() => handleEliminarArriendo(a.id)}
                className="btn btn-sm btn-danger"
              >
                Borrar Arriendo
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
