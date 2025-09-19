import { Form, redirect, useActionData, Link, type ActionFunctionArgs } from "react-router-dom";
import { login } from "../services/UsuarioService";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const resultado = await login(formData);
  if (!resultado.success) {
    return resultado;
  }
  return redirect("/");
}

export default function Login() {
  const actionData = useActionData() as {
    success?: boolean;
    error?: string;
    detalleErrores?: { [key: string]: string[] };
  };

  return (
    <div className="vh-100 bg-light d-flex align-items-center">
      <div className="container-fluid">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="card p-3 mb-5">
              <div className="card-body">
                <h5>Iniciar Sesión</h5>

                {/* MENSAJE ERROR */}
                {actionData?.error && (
                  <div className="alert alert-danger">{actionData.error}</div>
                )}

                {/* FORMULARIO */}
                <Form method="POST">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        actionData?.detalleErrores?.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      name="email"
                    />
                    {"email" in (actionData?.detalleErrores || {}) && (
                      <div className="invalid-feedback">
                        {actionData.detalleErrores?.email[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        actionData?.detalleErrores?.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      name="password"
                    />
                    {"password" in (actionData?.detalleErrores || {}) && (
                      <div className="invalid-feedback">
                        {actionData.detalleErrores?.password[0]}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 text-end">
                    <button type="submit" className="btn btn-primary">
                      Iniciar Sesión
                    </button>
                  </div>
                </Form>

                {/* LINK A CREAR CUENTA */}
                <div className="text-center mt-3">
                  <Link to="/usuarios/crear">Crear cuenta</Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
