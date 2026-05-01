## "PROYECTO - Fast Delivery"
*Prueba ténica para evalucación de MOVIRO.*

## Descrición:
Prueba técnica para MOVIRO, sistema de Gestión de Logística de Última Milla.

Este es un proyecto API REST y App Movil que consiste en construir el prototipo de una aplicación de logística donde los repartidores pueden gestionar sus entregas del día, registrar eventos en tiempo real y consultar su historial.

* Dentro del la carpeta */fastdelivery_server* se encuentre el proyecto API REST, este consisten en un servidor que se encarga de gestionar toda lógica transaccional relacionadas a la aplicación.

* Dentro de la carpeta */fastdelivery_app_movil* se encuentra el proyecto App Movil, esta es una aplicación para teléfono celular que se encarga la interacción directa con los usuarios para la gestión de los pedidos.

## Desarrollado por:
Ing. Alan Eduardo Aguilar Guerrero (Desarrollador Full-Stack.)

## Fecha:
Viernes 01 de Mayo del 2026

### Tecnologías implementadas:
|      App Movil         |     API REST      |     Bases de datos    |  Servicios adicionales |
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

**NOTA IMPORTANTE:** Este proyecto cuenta con conexiónes a bases de datos en la nube, por lo que es necesario implementar las API KEY para su correcto funcionamiento, se le proporcionará el archivo **api_keys.txt** con las API KEY del proyecto **enviado por correo electrónico** por motivos de seguridad, siga las instrucciones de a continuación para implementar el proyecto y garantizar su funcionamiento.

## Instrucciones para descarga y ejecución de proyecto en local.

### Descarga de proyecto desde GitHub.
Para descargar el proyecto utilizando la herramienta de control de versiones Git o bien descargando el proyecto como un archivo .zip desde GitHub.

#### Opción con Git.
1. Descargue e instale en su máquina la herramienta de gestion de repositorios *"Git"* de la siguiente URL "https://git-scm.com/downloads", si ya cuenta con "Git" instalado omita este paso.
2. Descargue e instale en su máquina el entorno de desarrollo de *"Node"* de la siguiente URL "https://nodejs.org/es/download", si ya cuenta con "Node" instalado omita este paso.
3. Cree una nueva carpeta en la ubicación de su disco `C:/` (por ejemplo "proyecto"), no coloque espacios ni caracteres especiales para nombrar la carpeta.
4. Abra un terminal (Simbolo de sistema) en la ubicación donde creo la carpeta en el paso anterior y ejecute el comando `git clone https://github.com/Nekromorfo20/fastdelivery_aag.git`

#### Opción manual.
1. Descargue e instale en su máquina el entorno de desarrollo de *"Node"* de la siguiente URL "https://nodejs.org/es/download", si ya cuenta con "Node" instalado omita este paso.
2. En la página del proyecto en GitHub "https://github.com/Nekromorfo20/fastdelivery_aag.git" seleccione el botón *<> Code* y seleccione la opción *Download ZIP* para descargar el proyecto como un archivo .zip.
3. Cree una nueva carpeta en la ubicación de su disco `C:/` (por ejemplo "proyecto"), no coloque espacios ni caracteres especiales para nombrar la carpeta.
4. Mueva y descomprima el archivo .zip en en la ubicación donde creo la carpeta en el paso anterior.

### Descarga de Android Studio y creación de dispositivo virtual.
Para ejecutar el proyecto "fastdelivery_app_movil" requerirá de un teléfono célular virtual o físico con el sistema operativo **Android 7 o Superior** para alojar su aplicación.

**NOTA:** Si prefiere ejecutar el proyecto *"fastdelivery_app_movil"* utilizando un teléfono celular, debe habilitar la **"Depuración USB"** y despues conectar un cable USB de la computadora al teléfono, debe mantener conectado el teléfono mientras se instala la aplicación (explicado en pasos posteriores), si elije esta opción no será necesario instalar Android Studio.

A continuación se establecen los pasos para descargar el IDE **Android Studio** y crear un dispositivo virtual.
1. Descarge e instale en su máquina *"Android Studio"* desde la siguiente URL "https://developer.android.com/studio?hl=es-419", si ya cuenta con "Android Studio" omita este paso.
2. Abra Android Studio.
3. En la pantalla principal Seleccione **Tools → Device Manager**
4. Haga clic en **Create Device**.
5. Eliga la categoría Phone y selecciona un modelo (por ejemplo, Pixel XL Pro), despues de clic en *Next*.
6. En **System Image**, descarga una imagen de Android si todavía no tien alguna (por ejemplo, Android 16), cuando termine la descarga, selecciónala y pulsa *Next*.
7. Asigna un nombre al dispositivo virtual y ajusta opciones las como orientación, memoria o gráficos.
8. Haz clic en *Finish* para crear el dipositivo virtual.
9. Despues de crearce el dispositivo, esta aparecerá en **Device Manager**, Para iniciarlo haga clic en el botón *"Play"*.

### Implementación de proyecto "fastdelivery_server".
1. Abra una terminal (Simbolo de sistema) en la ubicación donde descargó el proyecto de GitHub (`C:/<nombre_carpeta>`).
2. Entre a la carpeta _fastdelivery_server_ con el comando `cd fastdelivery_server` y despues ejecute el comando `npm install` para instalar todas las dependencias del proyecto API REST.
3. Crear el archivo `.env` basado en el archivo `.env.template` del proyecto asegurese de colocarlo en la misma ubicación que el archivo `package.json`.
4. Copie y pege la información proporcionada en el archivo **api_keys.txt** dentro del archivo .env creado en el paso anterior.
5. Ejecutar el comando `npm run seed` para crear datos de prueba por defecto en las bases de datos del proyecto.
6. Ejecutar `npm run dev` para ejecutar la aplicación API REST, deje esta terminal ejecutandose en todo momento para poder probar el proyecto.
7. Si desea finalizar la ejecución del proyecto en la terminal oprima las teclas `Ctrl + C`

**Puede consultar las rutas de consulta (Endpoints) en la siguiente URL de colección de Postman:**

"https://documenter.getpostman.com/view/8167457/2sBXqKoKbj"

### Implementación de proyecto "fastdelivery_app_movil".
1. Abra una nueva terminal (Simbolo de sistema) en la ubicación donde descargó el proyecto de GitHub (`C:/<nombre_carpeta>`).
2. Entre a la carpeta _fastdelivery_app_movil_ con el comando `cd fastdelivery_app_movil` y ejecute el comando `npm install` para instalar todas las dependencias del proyecto App Movil.
3. Crear el archivo `.env` basado en el archivo `.env.template` del proyecto asegurese de colocarlo en la misma ubicación que el archivo `package.json`.
4. *PENDIENTE* - Obtener la IP de su máquina y colocarlas en la .env
5. Abra su aplicación *"Androi dStudio"*, seleccione su dispositivo virtual y ejecutelo, espere a que termine de encenderce y desbloquerse complatemente.
6. Regrese a su terminal y ejecute el comando `npm run android` para ejecutar la aplicación App Movil, este proceso realizará la instalación del proyecto su dispositivo, tardará unos minutos, deje esta terminal ejecutandose en todo momento para poder probar el proyecto.
7. Al finalizar la aplicación movil se estará ejecutando en su dispositivo virtual.
8. Si desea finalizar la ejecución del proyecto en la terminal oprima las teclas `Ctrl + C` y despues cierre la aplicación en su dispositivo virtual.

**NOTA:** Si optó por instalar el proyecto en un teléfono celular puede omitir los pasos 5 a 7 y solo ejecutar el comando `npm run android`, dejando la terminal ejecutandose en todo momento y siempre manteniendo el cable USB conectado de su computadora a el teléfono celular. Cuando termine de utilizar la aplicación desactive la opción **"Depuración USB"** de su teléfono celular.

### Usuario de Prueba:
**NOTA:** Se le proporcionan los siguientes usuarios de prueba para realizar pruebas de funcionamiento del proyecto.

|     Usuario      |   Contraseña   |
| ---------------- | -------------- |
| alan@example.com | 12345678       |
| maria@example.com | 12345678      |