import { Router } from "express";
import { param } from "express-validator"
import { handleInputErrors  } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";
import { OrderController } from "../controllers/OrderController";
import { createOrderValidator } from "../validators/order.validator";

const router = Router();

router.use(authenticate);

router.get("/",
    OrderController.getAllOrders
);

router.get("/:id",
    param('id')
        .notEmpty().withMessage("Id del pedido no puede ir vacio")
        .isInt().withMessage('Id del pedido no tiene un formato válido'),
    handleInputErrors,
    OrderController.getOrderDetail
);

router.post("/",
    createOrderValidator,
    OrderController.createOrder
);

router.put("/:id",
    param('id')
        .notEmpty().withMessage("Id del pedido no puede ir vacio")
        .isInt().withMessage('Id del pedido no tiene un formato válido'),
    handleInputErrors,
    OrderController.updateOrder
);

export default router;