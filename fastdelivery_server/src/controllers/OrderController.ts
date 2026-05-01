import { Request, Response } from "express";
import Client from "../models/postgres/Clients.model";

export class OrderController {
    static createOrder = async (req : Request, res : Response) => {
        try {
            const {
                clientId,
                trackingNumber,
                receiverName,
                receiverAddress,
                receiverPhone,
                receiverEmail,
                lat,
                lng
            } = req.body;

            console.log("Información del usuario en token: ", req.user);

            const clientExist = await Client.findByPk(clientId);
            if (!clientExist) {
                return res.status(400).json({ error: "El cliente proporcionado no existe" });
            }

            return res.status(200).json({ data: "Ok" });

        } catch (error) {
            res.status(500).json({ error: '¡Ocurrio un error!' })
        }
    }
}