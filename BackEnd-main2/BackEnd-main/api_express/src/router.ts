import { Router } from "express";
import { getArriendos,getArriendosActivos, getArriendosTerminados, crearArriendo,editarArriendo, borrarArriendo  } from "./handlers/arriendos";
import { crearUsuario, login } from "./handlers/usuarios";
import { verificarToken } from "./middleware/verificarToken";

const router = Router()

//CREAR CUENTA
router.post('/usuarios/crear',crearUsuario)

//LOGIN
router.post('/login',login)

//MIDDLEWARE DESDE ESTE PUNTO
router.use(verificarToken)

//Arriendos

//activos
router.get('/arriendos',getArriendos)
router.get('/arriendos/activos',getArriendosActivos)
router.get('/arriendos/terminados',getArriendosTerminados)
router.post('/arriendos',crearArriendo)
router.put('/arriendos/:id',editarArriendo)
router.delete('/arriendos/:id', borrarArriendo);

//USUARIOS
//esto es un form



export default router
