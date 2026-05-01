import { Request, Response } from "express";
import User from "../models/postgres/User.model";
import { checkPassword, hashPassword } from "../utils/bcrypt";
import { generateJWT } from "../utils/jwt"
import { sendPasswordResetEmail } from "../services/authEmail"

export class AuthController {
    static login = async (req : Request, res : Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
            }

            const isPaswordCorrect = await checkPassword(password, user.password);
            if (!isPaswordCorrect) {
                return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
            }

            const token = generateJWT({ id: user.id });

            res.status(200).json({ data: token });

        } catch (error) {
            res.status(500).json({ error: '¡Ocurrio un error!' });
        }
    }

    static signin = async (req : Request, res : Response) => {
        try {
            const { name, email, password } = req.body;

            const userExist = await User.findOne({ where: { email } });
            if (userExist) {
                return res.status(409).json({ error: "El correo proporcionado ya ha sido registrado" });
            }

            const passwordHashed = await hashPassword(password);

            const user = await User.create({
                name,
                email,
                password: passwordHashed
            });
            
            const token = generateJWT({ id: user.id });

            res.status(201).json({ data: token });

        } catch (error) {
            res.status(500).json({ error: '¡Ocurrio un error!' });
        }
    }

    static forgotPassword = async (req : Request, res : Response) => {
        try {
            const { email } = req.body

            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            // Enviar email
            sendPasswordResetEmail({
                email : user.email,
                name: user.name
            });

            res.status(200).send("!Correo de recuperación de contraseña enviado!");
        } catch (error) {
            res.status(500).json({ error: '¡Ocurrio un error!' });
        }
    }
}