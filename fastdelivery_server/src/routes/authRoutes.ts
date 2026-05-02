import { Router } from "express";
import { body } from "express-validator"
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";
import { loginValidator, signinValidator, updateProfileValidator } from "../validators/auth.validator";

const router = Router();

router.post("/login",
    loginValidator,
    AuthController.login
);

router.post('/signin',
    signinValidator,
    AuthController.signin
);

router.post('/forgot-password',
    body('email')
        .notEmpty().withMessage("El E-mail no puede ir vacio")
        .isEmail().withMessage("El E-mail no tiene un formato válido"),
    handleInputErrors,
    AuthController.forgotPassword
);

router.use(authenticate);

router.put('/update-profile',
    updateProfileValidator,
    AuthController.updateProfile
);

router.post('/check-token',
    AuthController.checkToken
);

export default router;