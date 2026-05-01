import { Request, Response } from "express";
import Client from "../models/postgres/Clients.model";
import Order from "../models/postgres/Orders.model";
import User from "../models/postgres/User.model";
import Movement from "../models/mongo/Movement.model";
import { generateTrackigNumber } from "../utils/trackingNumber"
import { orderStatus } from "../utils/constants"

export class OrderController {
    static createOrder = async (req : Request, res : Response) => {
        try {
            let {
                userAssignedId,
                clientId,
                receiverName,
                receiverAddress,
                receiverPhone,
                receiverEmail,
                lat,
                lng,
                comments
            } = req.body;

            if (userAssignedId) {
                const userExist = await User.findByPk(userAssignedId);
                if (!userExist) return res.status(404).json({ error: "El usuario repartidor proporcionado no existe" });
            } else {
                userAssignedId = req.user.id;
            }

            const clientExist = await Client.findByPk(clientId);
            if (!clientExist) {
                return res.status(404).json({ error: "El cliente proporcionado no existe" });
            }

            const trackingNumber = generateTrackigNumber();

            const newOrder = await Order.create({
                userAssignedId,
                clientId: clientExist.id,
                trackingNumber,
                receiverName,
                receiverAddress,
                receiverPhone,
                receiverEmail,
                lat,
                lng
            });

            const newMovement = new Movement();

            newMovement.orderId = newOrder.id;
            newMovement.currentStatus = orderStatus.PENDING;
            newMovement.lastStatus = null;
            newMovement.lat = lat,
            newMovement.lng = lng,
            newMovement.lastMovementDate = new Date();
            newMovement.comments = comments?.trim() ? comments : null;

            await newMovement.save();

            res.status(201).send("¡Orden creada correctamente!");

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: '¡Ocurrio un error!' })
        }
    }

    static getAllOrders = async (req : Request, res : Response) => {
        try {
            const orders = await Order.findAll({
                where: { userAssignedId: req.user.id },
                attributes: ["id", "trackingNumber", "status"]
            });

            res.status(200).json({ data: orders });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: '¡Ocurrio un error!' })
        }
    }

    static getOrderDetail = async (req : Request, res : Response) => {
        const { id } = req.params;

        try {
            const order = await Order.findOne({
                where: {
                    id,
                    userAssignedId: req.user.id
                },
                include: [
                    {
                        model: User,
                        attributes: ["id", "name"]
                    },
                    {
                        model: Client,
                        attributes: ["id", "name"]
                    },
                ]
            });

            if (!order) {
                return res.status(404).json({ error: "El pedido no ha sido encontrado" });
            }

            const movements = await Movement.find({ orderId: order.id })
                .select('_id currentStatus lastStatus lat lng lastMovementDate comments');

            const orderDetail = {
                id: order.id,
                userAssignedId: order.userAssignedId,
                userAssignedName: order.user.name, 
                clientId: order.clientId,
                clientName: order.client.name,
                trackingNumber: order.trackingNumber,
                status: order.status,
                creationDate: order.createdAt,
                movements: movements.map(movement => {
                    return {
                        id: movement._id,
                        currentStatus: movement.currentStatus,
                        lastStatus: movement.lastStatus,
                        lat: movement.lat,
                        lng: movement.lng,
                        lastMovementDate: movement.lastMovementDate,
                        comments: movement.comments
                    }
                })
            };

        res.status(200).json({ data: orderDetail });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: '¡Ocurrio un error!' })
        }
    }

    static updateOrder = async (req : Request, res : Response) => {
        try {
            const { id } = req.params;
            const { 
                status,
                comments,
                lat,
                lng
            } = req.body;

            const order = await Order.findByPk(Number(id));

            if (!order) {
                return res.status(404).json({ error: "¡No se encontró la orden proporcionada!" })
            }

            await order.update({ status })
            
            const newMovement = new Movement();

            newMovement.orderId = order.id;
            newMovement.currentStatus = status
            newMovement.lastStatus = order.status;
            newMovement.lat = lat,
            newMovement.lng = lng,
            newMovement.lastMovementDate = new Date();
            newMovement.comments = comments;

            await newMovement.save();

            res.status(204).send("¡Orden actualizada correctamente!");

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: '¡Ocurrio un error!' })
        }
    }
}