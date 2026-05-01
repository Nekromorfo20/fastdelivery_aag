import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import { exit } from "node:process"

dotenv.config();

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_MONGODB_URL);
        console.log(colors.blue("¡Conexión exitosa a MongoDB!"));
    } catch (error) {
        console.log(colors.red.bold("¡¡Ocurrio un error al conectar a MongoDB!!"), error);
        exit(1);
    }
}