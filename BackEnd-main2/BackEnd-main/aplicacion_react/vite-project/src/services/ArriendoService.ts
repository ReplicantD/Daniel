// services/ArriendoService.ts
import { parse } from "valibot";
import { ArriendosSchema } from "../types/arriendo";
import type { Arriendo } from "../types/arriendo";
import axios from "../services/axiosInstance";


export async function getArriendos(): Promise<Arriendo[]> {
  try {
    const url = "/arriendos";
    const res = await axios.get(url);

    console.log("Respuesta cruda backend:", res.data);

    const dataParseada = res.data.data.map((a: any) => ({
      id: a.id,
      rutCliente: a.rut_cliente,
      nombreCliente: a.nombre_cliente,
      patenteVehiculo: a.patente_vehiculo,
      tipoVehiculo: a.tipo_vehiculo,
      fechaInicio: a.fecha_inicio ? new Date(a.fecha_inicio) : null,
      fechaFin: a.fecha_fin ? new Date(a.fecha_fin) : null,
    }));

    console.log("Datos parseados con fechas:", dataParseada);

    try {
      const validado = parse(ArriendosSchema, dataParseada);
      console.log("Datos validados por valibot:", validado);
      return validado;
    } catch (e) {
      console.error("Error validando datos con valibot:", e);
      return dataParseada; // fallback
    }
  } catch (error) {
    console.error("Error al traer los arriendos con axios:", error);
    throw new Error("No se pudo obtener la lista de arriendos.");
  }
}

//BORRAR




export async function arriendoBorrar(arriendoId: number) {
  try {
    const url = `/arriendos/${arriendoId}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: 'Error inesperado en servidor' };
    }
  } catch (error) {
    console.error('Error en arriendoBorrar:', error);
    return { success: false, error: 'No se pudo eliminar el elemento' };
  }
}


//OBTENER SOLO LOS ARRIENDOS TERMINADOS 

export async function getArriendosTerminados(): Promise<Arriendo[]> {
  try {
    const url = '/arriendos/terminados';
    const response = await axios.get(url);
    // Devuelve directamente response.data.data sin transformar fechas ni validar
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener arriendos terminados:", error);
    throw error;
  }
}

//OBTENER LSO ARRIENDOS ACTIVOS, en este lo k hace es que los arriendos tiene los fecha fin en nulo xd
export async function getArriendosActivos(): Promise<Arriendo[]> {
  try {
    const url = '/arriendos/activos';
    const response = await axios.get(url);
    // Asumo que la respuesta viene en { data: Arriendo[] } sino funciona en la revision me pego un tiro
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener arriendos activos:", error);
    throw error;
  }
}


//devolucion d arriendo ( es como un update)
export async function registrarDevolucion(arriendoId: number) {
  try {
    const url = `/arriendos/${arriendoId}`;
    // Solo enviamos fechaFin = fecha actual ISO string
    const fechaFin = new Date().toISOString();

    const response = await axios.put(url, { fechaFin });

    if (response.status === 200) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, error: 'Error inesperado en el servidor' };
    }
  } catch (error) {
    console.error('Error en registrarDevolucion:', error);
    return { success: false, error: 'No se pudo registrar la devolución' };
  }
}