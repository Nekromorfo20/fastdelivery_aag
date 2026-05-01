import { Router } from "express";
import { param } from "express-validator"
import { handleInputErrors  } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";
import { ClientController } from "../controllers/ClientController"
import { createClientValidator, updateClientValidator } from "../validators/client.validator";

const router = Router();

router.use(authenticate)

router.get("/",
    ClientController.getAllClients
);

router.get("/:id",
    param('id')
        .notEmpty().withMessage("Id de cliente no puede ir vacio")
        .isUUID().withMessage('Id del pedido no tiene un formato válido'),
    handleInputErrors,
    ClientController.getClient
);

router.post("/",
    createClientValidator,
    ClientController.createClient
);

router.put("/:id",
    updateClientValidator,
    ClientController.updateClient
);

export default router;