import { useEffect, useState } from "react";
import axios from "../services/axiosInstance";

// Estructura del tipo de respuesta esperada (puedes ajustar si es distinto)
type Estadisticas = {
  sedan: number;
  suv: number;
  camioneta: number;
};

export default function EstadisticaArriendo() {
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);

  useEffect(() => {
    // Peticion al backend
    const url = `${import.meta.env.VITE_API_URL}/arriendos`;
    axios.get(url)
      .then((res) => {
        const data = res.data.data;

        const contador = {
          sedan: 0,
          suv: 0,
          camioneta: 0,
        };

        for (const arriendo of data) {
          const tipo = arriendo.tipoVehiculo?.toLowerCase();
          if (tipo === "sedan") contador.sedan++;
          else if (tipo === "suv") contador.suv++;
          else if (tipo === "camioneta" || tipo === "camionetas") contador.camioneta++;
        }

        setEstadisticas(contador);
      })
      .catch((err) => {
        console.error("Error al obtener estadisticas:", err);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Ver Estadísticas de Arriendos</h2>

      <div className="card">
        <div className="card-header bg-dark text-white">
          Estadísticas de Arriendos
        </div>

        <div className="card-body">
          <p>Resumen de arriendos por tipo de vehículo:</p>
          {estadisticas ? (
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Sedán
                <span className="badge bg-primary rounded-pill">{estadisticas.sedan}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                SUV
                <span className="badge bg-success rounded-pill">{estadisticas.suv}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Camionetas
                <span className="badge bg-warning rounded-pill">{estadisticas.camioneta}</span>
              </li>
            </ul>
          ) : (
            <p>Cargando estadísticas...</p>
          )}
        </div>
      </div>
    </div>
  );
}
