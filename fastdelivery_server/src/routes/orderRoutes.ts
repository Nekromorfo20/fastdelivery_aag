import { Router } from "express";
import { body } from "express-validator"
import { handleInputErrors  } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";
import { OrderController } from "../controllers/OrderController";

const router = Router();

/* ROUTES FOR ORDERS */

router.use(authenticate)

router.post("/",
    body('receiverName')
        .trim().notEmpty().withMessage('El receiver name no puede ir vacio'),
    handleInputErrors,
    OrderController.createOrder
);


export default router;