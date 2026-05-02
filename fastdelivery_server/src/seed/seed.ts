import colors from "colors";
import { exit } from "node:process";
import { connectPostgreDB, db } from "../config/postgreDB";
import { connectMongoDB } from "../config/mongoDB";
import User from "../models/postgres/User.model";
import Client from "../models/postgres/Clients.model";
import Order from "../models/postgres/Orders.model";
import Movement from "../models/mongo/Movement.model";
import { hashPassword } from "../utils/bcrypt";
import { generateTrackigNumber } from "../utils/trackingNumber";

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
        name: "UPS",
        address: "Av. Morones Prieto 300, Col. Nuevo Sur, c.p. 66789, Monterrey, N.L.",
        contactEmail: "ups@example.com",
        contactPhone: "8111111111"
      },
      {
        name: "DHL",
        address: "Av. Cuahutemoc 244, Col. Centro, c.p. 69654, Monterrey, N.L.",
        contactEmail: "dhl@example.com",
        contactPhone: "8222222222"
      },
    ]);

    console.log(colors.blue("✅ Clientes creados"));

    const orders = await Order.bulkCreate([
      {
        userAssignedId: users[0].id,
        clientId: clients[0].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Monica Soto",
        receiverAddress: "Av. Miguel Aleman 111, Apodaca, c.p. 11234, N.L.",
        receiverPhone: "8333333333",
        receiverEmail: "monica@example.com"
      },
      {
        userAssignedId: users[0].id,
        clientId: clients[1].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Fernando Guzman",
        receiverAddress: "Av. Romulo Garza 455, San Nicolas de los Garza, c.p. 56789, N.L.",
        receiverPhone: "8444444444",
        receiverEmail: "fernando@example.com"
      },
      {
        userAssignedId: users[0].id,
        clientId: clients[0].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Roberto Sanchez",
        receiverAddress: "Av. Pablo Livas 89, Guadalupe, c.p. 63745, N.L.",
        receiverPhone: "8555555555",
        receiverEmail: "roberto@example.com"
      },
      {
        userAssignedId: users[0].id,
        clientId: clients[1].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Alejandra Torres",
        receiverAddress: "Av. Miravalle 12, San Pedro Garza Garcia, c.p. 45378, N.L.",
        receiverPhone: "8666666666",
        receiverEmail: "alejandra@example.com",
      },
      {
        userAssignedId: users[0].id,
        clientId: clients[0].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Manuel Herrera",
        receiverAddress: "Av. Arboledas 1111, Guadalupe, c.p. 99045, N.L.",
        receiverPhone: "87777777777",
        receiverEmail: "manuel@example.com"
      },
      {
        userAssignedId: users[1].id,
        clientId: clients[1].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Raul Torres",
        receiverAddress: "Av. Mirador 11, Monterrey, c.p. 53334, N.L.",
        receiverPhone: "88888888888",
        receiverEmail: "raul@example.com",
      },
      {
        userAssignedId: users[1].id,
        clientId: clients[0].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Angel Lopez",
        receiverAddress: "Av. gonzalitos 390, monterry, c.p. 12234, N.L.",
        receiverPhone: "8999999999",
        receiverEmail: "angel@example.com"
      },
      {
        userAssignedId: users[1].id,
        clientId: clients[1].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Hector",
        receiverAddress: "Av. tunel poniente 800, Monterrey, c.p. 78906, N.L.",
        receiverPhone: "8000000000",
        receiverEmail: "hector@example.com",
      },
      {
        userAssignedId: users[1].id,
        clientId: clients[0].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Maria de la Rosa",
        receiverAddress: "Av. Acapulco 200, Apodaca, c.p. 10098, N.L.",
        receiverPhone: "8111122222",
        receiverEmail: "angel@example.com"
      },
      {
        userAssignedId: users[1].id,
        clientId: clients[1].id,
        trackingNumber: `${generateTrackigNumber()}`,
        status: "pending",
        receiverName: "Rosario Cruz",
        receiverAddress: "Av. Torres 100, San Nicolas de los garza, c.p. 89454,, N.L.",
        receiverPhone: "8000000000",
        receiverEmail: "rosario@example.com",
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
        },
        {
            orderId: orders[4].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 30.718062481658816,
            lng: -180.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        },
        {
            orderId: orders[4].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 31.718062481658816,
            lng: -200.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        },
        {
            orderId: orders[5].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 32.718062481658816,
            lng: -220.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        },
        {
            orderId: orders[6].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 33.718062481658816,
            lng: -240.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        },
        {
            orderId: orders[7].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 34.718062481658816,
            lng: -260.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        },
        {
            orderId: orders[8].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 35.718062481658816,
            lng: -280.23188221874608,
            lastMovementDate: new Date(),
            comments: "Pedido creado"
        },
        {
            orderId: orders[9].id,
            currentStatus: "pending",
            lastStatus: null,
            lat: 36.718062481658816,
            lng: -300.23188221874608,
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