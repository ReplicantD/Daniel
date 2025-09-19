import { Form, redirect, useActionData, type ActionFunctionArgs } from "react-router-dom";
import { registrarUsuario } from "../services/UsuarioService";

export async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData()) as {
    email: string;
    password: string;
  };

  const { email, password } = formData;

  const errores: { [key: string]: string[] } = {};

  // Validación básica
  if (!email) {
    errores.email = ["El email es obligatorio"];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.email = ["El formato del email no es válido"];
  }

  if (!password) {
    errores.password = ["La contraseña es obligatoria"];
  } else if (password.length < 6) {
    errores.password = ["La contraseña debe tener al menos 6 caracteres"];
  }

  if (Object.keys(errores).length > 0) {
    return {
      success: false,
      detalleErrores: errores,
    };
  }

  const resultado = await registrarUsuario({ email, password });

  if (!resultado.success) {
    return resultado;
  }

  return redirect("/");
}

export default function RegistroUsuario() {
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
                <h5>Crear Cuenta</h5>

                {actionData?.error && (
                  <div className="alert alert-danger">{actionData.error}</div>
                )}

                <Form method="POST">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="text"
                      className={`form-control ${actionData?.detalleErrores?.email ? "is-invalid" : ""}`}
                      id="email"
                      name="email"
                    />
                    {"email" in (actionData?.detalleErrores || {}) && (
                      <div className="invalid-feedback">{actionData.detalleErrores?.email[0]}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className={`form-control ${actionData?.detalleErrores?.password ? "is-invalid" : ""}`}
                      id="password"
                      name="password"
                    />
                    {"password" in (actionData?.detalleErrores || {}) && (
                      <div className="invalid-feedback">{actionData.detalleErrores?.password[0]}</div>
                    )}
                  </div>

                  <div className="mb-3 text-end">
                    <button type="submit" className="btn btn-primary">
                      Crear Cuenta
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
