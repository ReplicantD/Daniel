import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {

  const navigate = useNavigate()

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Gestión de Arriendos</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="arriendos/crear" className="nav-link">Nuevo Arriendo</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="arriendos/devolucion" className="nav-link">Devolución Vehiculo</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="arriendos/borrar" className="nav-link">Borrar Arriendo</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="arriendos/activos" className="nav-link">Arriendos Activos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="arriendos/terminados" className="nav-link">Arriendos Terminados</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="arriendos/estadisticas" className="nav-link">Estadísticas</NavLink>
            </li>
            
          </ul>
          <div className="d-flex ms-auto">
            <button className='btn btn-sm btn-outline-dark' onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
