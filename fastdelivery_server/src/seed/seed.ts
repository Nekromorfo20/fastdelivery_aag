import colors from "colors";
import { exit } from "node:process";
import { connectPostgreDB, db } from "../config/postgreDB";
import { connectMongoDB } from "../config/mongoDB";
import User from "../models/postgres/User.model";
import Client from "../models/postgres/Clients.model";
import Order from "../models/postgres/Orders.model";
import Movement from "../models/mongo/Movement.model";
import { hashPassword } from "../utils/bcrypt";

const seed = async () => {
  try {
    console.log(colors.cyan.bold("Iniciando seed..."));

    // Conectar a las DB
    await connectPostgreDB();
    await connectMongoDB();

    // Eliminar tablas de base de datos de PostgreSQL
    await db.sync({ force: true });

    // Crear datos por defecto tablas PostgreSQL
    const users = await User.bulkCreate([
      {
        name: "Alan Aguilar",
        email: "alan@example.com",
        password: await hashPassword("12345678")
      },
      {
        name: "María López",
        email: "maria@example.com",
        password: await hashPassword("12345678")
      },
    ]);

    console.log(colors.blue("✅ Usuarios creados"));

    const clients = await Client.bulkCreate([
      {
        name: "Pepsi",
        address: "Av. Morones Prieto 300, Col. Nuevo Sur, Monterrey, N.L.",
        contactEmail: "Pepsi@example.com",
        contactPhone: "8111111111"
      },
      {
        name: "CocaCola",
        address: "Av. Cuahutemoc 244, Col. Centro, Monterrey, N.L.",
        contactEmail: "cocacola@example.com",
        contactPhone: "8222222222"
      },
    ]);

    console.log(colors.blue("✅ Clientes creados"));

    const orders = await Order.bulkCreate([
      {
        userAssignedId: users[0].id,
        clientId: clients[0].id,
        trackingNumber: "1111111111",
        status: "pending",
        receiverName: "Monica Soto",
        receiverAddress: "Av. Miguel Aleman 111, Apodaca, N.L.",
        receiverPhone: "8333333333",
        receiverEmail: "monica@example.com"
      },
      {
        userAssignedId: users[0].id,
        clientId: clients[1].id,
        trackingNumber: "2222222222",
        status: "pending",
        receiverName: "Fernando Guzman",
        receiverAddress: "Av. Romulo Garza 455, San Nicolas de los Garza, N.L.",
        receiverPhone: "8444444444",
        receiverEmail: "fernando@example.com"
        
      },
      {
        userAssignedId: users[1].id,
        clientId: clients[0].id,
        trackingNumber: "3333333333",
        status: "pending",
        receiverName: "Roberto Sanchez",
        receiverAddress: "Av. Pablo Livas 89, Guadalupe, N.L.",
        receiverPhone: "8555555555",
        receiverEmail: "roberto@example.com"
      },
      {
        userAssignedId: users[1].id,
        clientId: clients[1].id,
        trackingNumber: "4444444444",
        status: "pending",
        receiverName: "Alejandra Torres",
        receiverAddress: "Av. Miravalle 12, San Pedro Garza Garcia, N.L.",
        receiverPhone: "8666666666",
        receiverEmail: "alejandra@example.com",
      }
    ]);

    console.log(colors.blue("✅ Orders creados"));

    // Eliminar tablas de base de datos de MongoDB
    await Movement.deleteMany({});

    // Crear datos por defecto tablas de MongoDB
    await Movement.insertMany([
        {
            orderId: orders[0].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 25.718062481658816,
            lng: -100.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        },
        {
            orderId: orders[1].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 26.718062481658816,
            lng: -120.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        },
        {
            orderId: orders[2].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 27.718062481658816,
            lng: -140.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        },
        {
            orderId: orders[3].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 28.718062481658816,
            lng: -160.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        }
    ]);

    console.log(colors.blue("✅ Movements creados"));

    console.log(colors.cyan.bold("🎉 Seed ejecutado correctamente 🎉"));
    exit(0);
  } catch (error) {
    console.error(colors.red.bold("Error en seed: "), error);
    exit(1);
  }
};

seed();