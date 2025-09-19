import { Request, Response} from 'express'
import Usuario from '../models/Usuario'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const login = async(request:Request, response:Response)=>{
    //de momento password es un hash, no "123" literalmente
    const {email,password} = request.body
    const SECRET = process.env.SECRET_KEY

    try {
        //buscar el usuario
        const usuario = await Usuario.findByPk(email)

        //aqui el bcrypt revisa el hash y compara el atributo password de usuario
        if(!usuario || !bcrypt.compareSync(password,usuario.password)){
            //aqui el cliente comentio el error
            response.status(401).json({error:'Credenciales incorrectas'})
        }

        //si llegamos aca las credenciales son correctas, en ese caso generar el token
        const token =  jwt.sign({email:usuario.email},SECRET,{expiresIn:'1h'})
        response.json({ token })


    } catch (error) {
        console.error('Error de login:',error)
        //no es un error de password, es de servidor ("no pude chequear porq algo paso")
        response.status(500).json({error:'Error interno del servidor'})
    }
}




export const crearUsuario = async(request:Request, response:Response)=>{
    //response.json('crear usuario') el post en postman si funciono
    const {email,password} = request.body
    if(!email || !password){
        response.status(400).json({error:'Email y contraseña son obligatorios'})
    }

    try {
        const existente = await Usuario.findByPk(email)
        if(existente){
            response.status(409).json({error:'ese email ya esta registrado en el sistema'})
        }
        const nuevoUsuario = await Usuario.create({email,password})
        //nota: el postman ya mostro "usuario creado correctamente" de lo que llevo   
        response.status(201).json({message:'Usuario creado correctamente'})
    } catch (error) {
        console.error('Error al registrar usuario:',error)
        response.status(500).json({error: 'Error interno del servidor'})
    }
}