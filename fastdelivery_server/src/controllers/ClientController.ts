import { Request, Response } from "express";
import Client from "../models/postgres/Clients.model";
import { Op } from "sequelize";

export class ClientController {
    static createClient = async (req : Request, res : Response) => {
        const {
            name,
            address,
            contactEmail,
            contactPhone
        } = req.body;

        try {
            const clientExist = await Client.findOne({
                where: { name }
            });

            if (clientExist) {
                res.status(409).json({ error: "El cliente por crear ya existe" });
            }

            await Client.create({
                name,
                address,
                contactEmail,
                contactPhone
            });

            return res.status(201).send("¡Cliente creado correctamente!");

        } catch (error) {
            res.status(500).json({ error: '¡Ocurrio un error!' })
        }
    }

    static getAllClients = async (req : Request, res : Response) => {
        try {
            const clients = await Client.findAll({
                attributes: ["id", "name"]
            });

            return res.status(200).json({ data: clients });

        } catch (error) {
            res.status(500).json({ error: '¡Ocurrio un error!' })
        }
    }

    static getClient = async (req : Request, res : Response) => {
        const { id } = req.params;

        try {
            const client = await Client.findOne({
                where: { id },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            });

            if (!client) {
                res.status(404).json({ error: "¡No se encontro el cliente solicitado!" });
            }

            return res.status(200).json({ data: client });

        } catch (error) {
            res.status(500).json({ error: '¡Ocurrio un error!' })
        }
    }

    static updateClient = async (req : Request, res : Response) => {
        const { id } = req.params;
        const {
            name,
            address,
            contactEmail,
            contactPhone
        } = req.body;

        try {
            const client = await Client.findOne({ where: { id } });

            if (!client) {
                return res.status(404).json({ error: "¡El cliente por actualizar no fue encontrado!" });
            }

            const existingName = await Client.findOne({
                where: {
                    name,
                    id: { [Op.ne]: id }
                }
            });

            if (existingName) {
                return res.status(409).json({  error: "¡El nombre de cliente proporcionado ya está en uso!" });
            }

            await client.update({
                name,
                address,
                contactEmail,
                contactPhone
            });
            
            return res.status(204).send("¡Cliente actualizado correctamente!");

        } catch (error) {
            res.status(500).json({ error: '¡Ocurrio un error!' })
        }
    }
}