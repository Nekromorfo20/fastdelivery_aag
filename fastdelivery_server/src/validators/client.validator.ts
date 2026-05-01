import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

export const createClientValidator = [
  body("name")
    .notEmpty()
    .withMessage("El nombre del cliente no puede ir vacio"),

  body("address")
    .optional(),

  body("contactEmail")
    .optional()
    .isEmail().withMessage("E-mail no válido"),

  body("contactPhone")
    .optional(),

  handleInputErrors
];

export const updateClientValidator = [
  param('id')
    .notEmpty().withMessage("Id de cliente no puede ir vacio")
    .isUUID().withMessage('Id del cliente no tiene un formato válido'),

  body("name")
    .notEmpty()
    .withMessage("El nombre del cliente no puede ir vacio"),

  body("address")
    .optional(),

  body("contactEmail")
    .optional()
    .isEmail().withMessage("E-mail no válido"),

  body("contactPhone")
    .optional(),

  handleInputErrors
];