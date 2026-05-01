import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

export const loginValidator = [
    body('email')
        .notEmpty().withMessage("E-mail no puede ir vacio")
        .isEmail().withMessage("El E-mail no tiene un formato válido"),
    body('password')
        .notEmpty().withMessage("El password no puede ir vacio"),

  handleInputErrors
];

export const signinValidator = [
    body('name')
        .notEmpty().withMessage("El nombre no puede ir vacio"),
    body('email')
        .notEmpty().withMessage("E-mail no puede ir vacio")
        .isEmail().withMessage("El E-mail no tiene un formato válido"),
    body('password')
        .notEmpty().withMessage("El password no puede ir vacio")
        .isLength({ min: 8 }).withMessage("El password es muy corto, minimo 8 caracteres"),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Los password no son iguales");
        }
        return true;
    }),

  handleInputErrors
];

export const updateProfileValidator = [
    body('name')
        .notEmpty().withMessage("El nombre no puede ir vacio"),
    body('email')
        .notEmpty().withMessage("E-mail no puede ir vacio")
        .isEmail().withMessage("El E-mail no tiene un formato válido"),

  handleInputErrors
];