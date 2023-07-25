import { Request ,Response } from "express"
import bcrypt from 'bcrypt'
import { User } from "../models/user";
import jwt from 'jsonwebtoken'

export const newUser = async (req : Request,res :Response)=>{

    const {username, password} = req.body;
     
    //validacion
    const user = await User.findOne({where:{username:username}})

    if(user){       
        return res.status(400).json({
            msg:`Ya existe un usuario con el  nombre de ${username}`
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);
    
    try {
        await User.create({
            username:username,
            password:hashedPassword
        })
    
        res.json({
            msg: `usuario ${username} creado exitosamente`
        })
    } catch (error) {
        res.status(400).json({
            msg:'ups ocurrio un error',
            error
        })
    }
}


export const loginUser = async (req : Request,res :Response)=>{

    const {username,password} = req.body;
   
    //validacion si el usuario existe
    const user:any = await User.findOne({where:{username:username}})
    
    if (!user){
        return res.status(400).json({
            msg:`No existe usuario con el nombre ${username} en la base de datos`
        })
    }

    //validamos la contraseña
    const passwordValid = await bcrypt.compare(password,user.password)
    if(!passwordValid){
        return res.status(400).json({
            msg:`Password Incorrecta`
        })
    }

    //Generar token
     const token=jwt.sign({
        username:username
    },process.env.SECRET_KEY || 'admin123')
    res.json(token)
}