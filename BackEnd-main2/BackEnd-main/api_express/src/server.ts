import  Express  from "express";
import router from "./router";
import db from "./config/database";
import cors,{CorsOptions} from 'cors'
const server = Express()

//conectar a la base de datos
async function conectarBD(){
    try {
        await db.authenticate()
        db.sync()
        console.log('conexion a la bd exitosa.')
    } catch (error) {
        console.log('NO SE PUDO CONECTAR A LA BD.')
        console.log(error)
    }
}

conectarBD()


//CORS
const corsOptions : CorsOptions = {
    origin: function(origin,callback){
        if(!origin || origin===process.env.FRONTEND_URL){
            //permitir
            callback(null,true) // (error, si se permite)
        }else{
            //denegar
            callback(new Error('Error de CORS'),false)
        }
    }
}

server.use(cors(corsOptions))

//habilitar para la lectura de json enviado desde el cliente
//si funciona, aparecera en la consola el request
server.use(Express.json())


//todos los request que comiencen con "/api" se deben derivar a router.ts
server.use('/api',router)

export default server
