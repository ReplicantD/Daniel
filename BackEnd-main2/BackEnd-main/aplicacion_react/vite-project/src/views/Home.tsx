export default function Home() {
  return (
    <>
      <h2>Opciones de Gestión de Arriendos</h2>
      <div className="list-group mt-4">
        <a
          href="arriendos/crear"
          className="list-group-item list-group-item-action"
        >
          <h5 className="mb-1">1. Registrar un Nuevo Arriendo</h5>
          <p className="mb-1">
            Permite al usuario ingresar un nuevo arriendo de un vehículo.
          </p>
        </a>

        <a
          href="/arriendos/devolucion"
          className="list-group-item list-group-item-action"
        >
          <h5 className="mb-1">2. Registrar Devolución de Vehículo</h5>
          <p className="mb-1">
            Permite al usuario registrar la devolución de un vehículo en
            arriendo.
          </p>
        </a>

        <a
          href="/arriendos/borrar"
          className="list-group-item list-group-item-action"
        >
          <h5 className="mb-1">3. Borrar un Arriendo</h5>
          <p className="mb-1">
            Permite al usuario borrar un arriendo existente.
          </p>
        </a>

        <a
          href="/arriendos/activos"
          className="list-group-item list-group-item-action"
        >
          <h5 className="mb-1">4. Ver Arriendos Activos</h5>
          <p className="mb-1">
            Muestra todos los arriendos que están actualmente activos.
          </p>
        </a>

        <a
          href="/arriendos/terminados"
          className="list-group-item list-group-item-action"
        >
          <h5 className="mb-1">5. Ver Arriendos Terminados</h5>
          <p className="mb-1">
            Muestra todos los arriendos que han sido finalizados.
          </p>
        </a>

        <a
          href="/arriendos/estadisticas"
          className="list-group-item list-group-item-action"
        >
          <h5 className="mb-1">6. Ver Estadísticas de Arriendos</h5>
          <p className="mb-1">
            Muestra la cantidad de arriendos realizados para cada tipo de
            vehículo.
          </p>
        </a>
      </div>
    </>
  );
}
