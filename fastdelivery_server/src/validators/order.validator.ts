import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

export const createOrderValidator = [
  body("userAssignedId")
    .optional()
    .isUUID()
    .withMessage("Id de usuario repartidor no tiene un formato válido"),

  body("clientId")
    .notEmpty()
    .withMessage("Id de cliente no puede ir vacio")
    .isUUID()
    .withMessage("Id de cliente no tiene un formato válido"),

  body("receiverName")
    .notEmpty()
    .withMessage("El nombre del destinatario no puede ir vacio"),

  body("receiverAddress")
    .notEmpty()
    .withMessage("La dirección del destinatario no puede ir vacia"),

  body("lat")
    .notEmpty()
    .withMessage("El valor latitud no puede ir vacio")
    .isNumeric()
    .withMessage("Valor latitud no tiene un formato válido"),

  body("lng")
    .notEmpty()
    .withMessage("El valor longitud no puede ir vacia")
    .isNumeric()
    .withMessage("Valor longitud no tiene un formato válido"),

  body("comments")
    .optional(),

  handleInputErrors
];

export const updateOrderValidator = [
  param('id')
    .notEmpty().withMessage("Id del pedido no puede ir vacio")
    .isInt().withMessage('Id del pedido no tiene un formato válido'),

  body("status")
    .notEmpty()
    .withMessage("El valor status no puede ir vacio"),

  body("lat")
    .notEmpty()
    .withMessage("El valor latitud no puede ir vacio")
    .isNumeric()
    .withMessage("Valor latitud no tiene un formato válido"),

  body("lng")
    .notEmpty()
    .withMessage("El valor longitud no puede ir vacia")
    .isNumeric()
    .withMessage("Valor longitud no tiene un formato válido"),

  body("comments")
    .optional(),

  handleInputErrors
];