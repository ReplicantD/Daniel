import { useState } from "react";
import axios from "../services/axiosInstance";

export default function NuevoArriendo() {
  const [formulario, setFormulario] = useState({
    rutCliente: "",
    patenteVehiculo: "",
    tipoVehiculo: "",
    nombreCliente: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    try {
      const data = {
        ...formulario,
        tipoVehiculo: formulario.tipoVehiculo.toLowerCase(), // se guarda en minúscula
        fechaInicio: new Date().toISOString().split("T")[0], // solo fecha, sin hora
        fechaFin: null,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/arriendos`, data);

      setMensaje("✅ Arriendo registrado correctamente.");
      setFormulario({
        rutCliente: "",
        patenteVehiculo: "",
        tipoVehiculo: "",
        nombreCliente: "",
      });
    } catch (error) {
      console.error("Error al registrar arriendo:", error);
      setMensaje("❌ Error al registrar el arriendo.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Registrar un Nuevo Arriendo</h2>

      <div className="card">
        <div className="card-header bg-primary text-white">
          Registrar Nuevo Arriendo
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="rutCliente" className="form-label">RUT del Cliente</label>
              <input
                type="text"
                className="form-control"
                id="rutCliente"
                name="rutCliente"
                value={formulario.rutCliente}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="patenteVehiculo" className="form-label">Patente del Vehículo</label>
              <input
                type="text"
                className="form-control"
                id="patenteVehiculo"
                name="patenteVehiculo"
                value={formulario.patenteVehiculo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tipoVehiculo" className="form-label">Tipo de Vehículo</label>
              <select
                className="form-select"
                id="tipoVehiculo"
                name="tipoVehiculo"
                value={formulario.tipoVehiculo}
                onChange={handleChange}
                required
              >
                <option value="">Elige uno</option>
                <option value="sedan">Sedán</option>
                <option value="suv">SUV</option>
                <option value="camioneta">Camioneta</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="nombreCliente" className="form-label">Nombre Cliente</label>
              <input
                type="text"
                className="form-control"
                id="nombreCliente"
                name="nombreCliente"
                value={formulario.nombreCliente}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              Registrar Arriendo
            </button>

            {mensaje && (
              <div className="alert alert-info mt-3">
                {mensaje}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
