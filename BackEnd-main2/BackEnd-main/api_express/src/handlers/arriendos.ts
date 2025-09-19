import { Request,Response } from "express"
import Arriendo from "../models/Arriendo"
import { Op } from "sequelize";


//ACTIVOS (campo FECHA_FIN NULA)
export const getArriendosActivos = async (request: Request, response: Response) => {
    try {
        const arriendosActivos = await Arriendo.findAll({
            where: {
                fechaFin: {
                    [Op.is]: null
                }
            }
        });
        response.json({ data: arriendosActivos });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al obtener los arriendos activos' });
    }
};


//TERMINADOS (CON campo FECHA_FIN NO NULA. para "ver arriendos activos" y "ver")
export const getArriendosTerminados = async (request: Request, response: Response) => {
    try {
        const arriendosTerminados = await Arriendo.findAll({
            where: {
                fechaFin: {
                    [Op.not]: null
                }
            }
        });
        response.json({ data: arriendosTerminados });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al obtener los arriendos aterminados' });
    }
};


//MOSTRAR TODOS LOS ARRIENDOS ( PARA "borrar un arriendo", primero los mostramos en pantalla luego solo apretamos un boton para borrarlo)
export const getArriendos = async (request: Request, response: Response) => {
  try {
    const arriendos = await Arriendo.findAll();
    response.json({ data: arriendos });
  } catch (error) {
    console.error('Error al obtener arriendos:', error);
    response.status(500).json({ error: 'Error al obtener los arriendos' });
  }
};



//CREAR ARRIENDO NUEVO ("Registrar un nuevo arriendo")
//si dice undefine es por que no ah recibido los datos que insertamos.
export const crearArriendo = async(request:Request,response:Response)=>{
    const arriendoNuevo = await Arriendo.create(request.body)
    response.json({data:arriendoNuevo})
}



//EDITAR ARRIENDO ("Registar devolucion")

export const editarArriendo = async(request:Request,response:Response)=>{
    const { id } = request.params
    const arriendo = await Arriendo.findByPk(id)
    await arriendo.update(request.body)
    await arriendo.save()
    response.json({ data: arriendo})
}



//BORRAR ARRIENDO ("borrar un arriendo (ya sea activo o innactivo")

export const borrarArriendo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const arriendo = await Arriendo.findByPk(id);
  await arriendo?.destroy();
  res.json({ data: 'Arriendo borrado' });
};