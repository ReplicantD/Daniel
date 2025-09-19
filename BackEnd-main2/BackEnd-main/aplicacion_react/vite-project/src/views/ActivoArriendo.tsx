import { useEffect, useState } from "react";
import { getArriendosActivos } from "../services/ArriendoService";
import type { Arriendo } from "../types/arriendo";

export default function ActivoArriendo() {
  const [arriendosActivos, setArriendosActivos] = useState<Arriendo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarArriendos() {
      try {
        const data = await getArriendosActivos();
        setArriendosActivos(data);
      } catch (err) {
        setError("No se pudo cargar los arriendos activos");
      } finally {
        setCargando(false);
      }
    }

    cargarArriendos();
  }, []);

  if (cargando) return <p>Cargando arriendos activos...</p>;

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Ver Arriendos Activos</h2>

      <div className="card">
        <div className="card-header bg-success text-white">Arriendos Activos</div>
        <div className="card-body">
          {arriendosActivos.length === 0 ? (
            <p>No hay arriendos activos para mostrar.</p>
          ) : (
            <ul className="list-group">
              {arriendosActivos.map((a) => (
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
