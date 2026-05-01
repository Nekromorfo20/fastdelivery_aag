import express from "express";
import morgan from "morgan";
import { connectPostgreDB } from "./config/postgreDB";
import { connectMongoDB } from "./config/mongoDB";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes"

// Conectar a bases de datos
const initDBs = async () => {
    await connectPostgreDB();
    await connectMongoDB();
}
initDBs();

// Crear servidor de Express
const app = express();

// Loggin
app.use(morgan('dev'));

// Middlewares para porcesar json y urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

export default app;