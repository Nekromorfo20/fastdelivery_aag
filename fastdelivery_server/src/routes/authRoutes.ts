import { Router } from "express";
import { body } from "express-validator"
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middlewares/validation";

const router = Router();

router.post("/login",
    body('email')
        .trim().notEmpty().isEmail().withMessage('E-mail no válido o vacio'),
    body('password')
        .trim().notEmpty().withMessage('El password no puede ir vacio'),
    handleInputErrors,
    AuthController.login
);

router.post('/signin',
    body('name')
        .trim().notEmpty().isString().withMessage('El nombre no puede ir vacio'),
    body('email')
        .trim().notEmpty().isEmail().withMessage('E-mail no válido o vacio'),
    body('password')
        .trim().isLength({ min: 8 }).withMessage('El password es muy corto, minimo 8 caracteres'),
    body('passwordConfirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Los password no son iguales');
        }
        return true;
    }),
    handleInputErrors,
    AuthController.signin
);

router.post('/forgot-password',
    body('email')
        .trim().notEmpty().isEmail().withMessage('E-mail no válido o vacio'),
    handleInputErrors,
    AuthController.forgotPassword
);

export default router;