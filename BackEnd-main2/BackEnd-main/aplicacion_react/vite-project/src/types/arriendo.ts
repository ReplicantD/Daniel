import { object, number, string, nullable, date, array, type InferOutput } from "valibot";

// Schema para un solo arriendo
export const ArriendoSchema = object({
  id: number(),
  nombreCliente: string(),
  patenteVehiculo: string(),
  fechaInicio: date(),
  fechaFin: nullable(date()),
  tipoVehiculo: string(),
  rutCliente: string(),
});

// Schema para un arreglo de arriendos
export const ArriendosSchema = array(ArriendoSchema);

// Tipo TypeScript basado en el schema de un arriendo
export type Arriendo = InferOutput<typeof ArriendoSchema>;

