import { Sequelize } from "sequelize-typescript";
import colors from "colors";
import dotenv from "dotenv";
import { exit } from "node:process";

dotenv.config();

export const db = new Sequelize(process.env.DATABASE_POSTGRESQL_URL!, {
    models: [__dirname + '/../models/postgres/**/*'],
    logging: false
});

export const connectPostgreDB = async () => {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue("¡Conexión exitosa a PostgreSQL! "));
  } catch (error) {
    console.error(colors.red.bold("¡¡Ocurrio un error al conectar a PostgreSQL!!"), error);
    exit(1);
  }
}