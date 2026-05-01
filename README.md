## PROYECTO - FAST DELIVERY
*Prueba ténica para MOVIRO.*

## Descrición:
Prueba técnica para MOVIRO, sistema de Gestión de Logística de Última Milla.

Este es un proyecto API REST y App Movil que consiste en construir el prototipo de una aplicación de logística donde los repartidores pueden gestionar sus entregas del día, registrar eventos en tiempo real y consultar su historial.

Dentro del proyecto *fastdelivery_server* se pueden realizarse peticiones API REST para la consulta, creación y actualización de sus diferentes endpoints mediante Postman u otra herramienta de manejo de peticiones HTTP.

Dentro del proyecto *fastdelivery_app_movil* se puede hacer uso de la aplicación móvil que a su vez consulta la API REST para el manejo de transacciones.

## Desarrollado por:
Ing. Alan Eduardo Aguilar Guerrero (Desarrollador Full-Stack.)

## Fecha:
Jueves 30 de Abril del 2026

### Tecnologías implementadas:
|      App Movil         |        API        |     Bases de datos    |  Servicios adicionales |
| ---------------------- | ----------------- | --------------------- | ---------------------- |
| React Native CLI       | Node              | postgreSQL            | Mongo Atlas            |
| TypeScript             | Express           | mongoDB               | Render                 |
| axios                  | TypeScript        |                       | Git y GitHub           |
| tanStack - react query | sequelize         |                       | Mailtrap               |
| zustand                | mongoose          |                       |                        |
| react-hook-form        | jwt               |                       |                        |
| ionic-icons            | dotenv            |                       |                        |
| jwt                    | express-validator |                       |                        |
| zod                    | bcrypt            |                       |                        |
| async storage          | colors            |                       |                        |
|                        | nodemailer        |                       |                        |
|                        | morgan            |                       |                        |
|                        | cors              |                       |                        |

### Instrucciones para clonación e instalación de proyecto "fastdelivery":

1. Descargue e instale en su máquina la herramienta de gestion de repositorios "Git" de la siguiente URL "https://git-scm.com/downloads", si ya cuenta con "Git" instalado omita este paso.
1. Descargue e instale en su máquina el entorno de desarrollo de "Node" de la siguiente URL "https://nodejs.org/es/download", si ya cuenta con "Node" instalado omita este paso.
2. Para instalar y ejecutar el proyecto desde una terminal (Simbolo del sistema) abra una terminal en su computadora y coloque la dirección del directorio donde desea instalar el proyecto y ejecute el comando `git clone https://github.com/Nekromorfo20/fastdelivery_aag.git`
3. Entre a la carpeta _fastdelivery_server_ con el comando `cd fastdelivery_server` y ejecute el comando `npm install` para instalar todas las dependencias del proyecto Servidor (Backend).
4. Crear el archivo `.env` basado en `.env.template`, este archivo contiene llaves de conexión a BD, configuraciones de envio de emails, entre otros datos.
5. Ejecutar el comando `npm run seed` para crear datos de prueba por defecto en las bases de datos del proyecto.
6. Ejecutar `npm run dev` para ejecutar la aplicación API.

### Usuario de Prueba:
|     Usuario      |   Contraseña   |
| ---------------- | -------------- |
| alan@example.com | 12345678       |