import { useEffect, useState } from "react";
import { getArriendosTerminados } from "../services/ArriendoService";
import type { Arriendo } from "../types/arriendo";

export default function TerminadoArriendo() {
  const [arriendosTerminados, setArriendosTerminados] = useState<Arriendo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarArriendos() {
      try {
        const data = await getArriendosTerminados();
        setArriendosTerminados(data);
      } catch (err) {
        setError("No se pudo cargar los arriendos terminados");
      } finally {
        setCargando(false);
      }
    }

    cargarArriendos();
  }, []);

  if (cargando) return <p>Cargando arriendos terminados...</p>;

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Ver Arriendos Terminados</h2>

      <div className="card shadow mb-4">
        <div className="card-header bg-secondary text-white">
          Arriendos Terminados
        </div>
        <div className="card-body">
          {arriendosTerminados.length === 0 ? (
            <p>No hay arriendos terminados para mostrar.</p>
          ) : (
            <ul className="list-group">
              {arriendosTerminados.map((a) => (
                <li key={a.id} className="list-group-item">
                  #{a.id.toString().padStart(3, "0")} - Cliente: {a.nombreCliente} - Vehículo: {a.patenteVehiculo}  
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
