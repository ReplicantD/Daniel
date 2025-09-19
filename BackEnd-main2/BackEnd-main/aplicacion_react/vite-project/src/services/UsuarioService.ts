import { safeParse } from "valibot"
import { LoginFormSchema } from "../types/usuario"
import axios from "../services/axiosInstance"
import.meta.env.VITE_API_URL
type UsuarioFormData = {
    [k:string]: FormDataEntryValue
}

//SI EL ERROR LO ATRAPA EN EL API LO IMPRIMOS, SINO, PONEMOS "ERROR INESPERADO"
export async function login(formData:UsuarioFormData){
    try{
        const resultado = safeParse(LoginFormSchema,formData)
        if(resultado.success){
            const url = `${import.meta.env.VITE_API_URL}/login`;
            const {data} = await axios.post(url,resultado.output)
            localStorage.setItem('token',data.token)
            //data del form pasa la validacion del schema
            return {success:true}

        }else{
            //no pasa validacion, mostrar errores
            const detalleErrores: Record<string, string[]> = {}
            for( const issue of resultado.issues){
                const campo = issue.path![0].key as string
                if (!detalleErrores[campo]){
                    detalleErrores[campo] = []
                }
                detalleErrores[campo].push(issue.message)
            }
            return {
                success: false,
                error: 'datos del formulario no validos',
                detalleErrores: detalleErrores,
            }
        }
    }catch(error:any){
        //API INDICA ERROR
        return {
            success:false,
            error: error.response?.data?.error ?? 'Error inesperado',
        }
    }
}

//REGISTRAR ( OJALA FUNCIONE, nose como conectarlo pero creo que es un apartado diferente)

export async function registrarUsuario(data: { email: string; password: string }) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/usuarios/crear`;
    const response = await axios.post(url, data);

    if (response.status === 201) {
      return { success: true };
    } else {
      return {
        success: false,
        error: "No se pudo registrar el usuario",
      };
    }
  } catch (err: any) {
    if (err.response?.status === 409) {
      return {
        success: false,
        error: "Ese correo ya está registrado",
      };
    }

    console.error("Error en registrarUsuario:", err);
    return {
      success: false,
      error: "Error inesperado del servidor",
    };
  }
}