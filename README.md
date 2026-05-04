## PROYECTO - Fast Delivery
*Prueba técnica para evaluación de MOVIRO.*

## Descripción
Prueba técnica para MOVIRO, sistema de gestión de logística de última milla.

Este es un proyecto de API REST y aplicación móvil que consiste en construir el prototipo de una aplicación de logística en la que los repartidores pueden gestionar sus entregas del día, registrar eventos en tiempo real y consultar su historial.

* Dentro de la carpeta */fastdelivery_server* se encuentra el proyecto API REST. Este consiste en un servidor que se encarga de gestionar toda la lógica transaccional relacionada con la aplicación.

* Dentro de la carpeta */fastdelivery_app_movil* se encuentra el proyecto de aplicación móvil. Esta es una aplicación para teléfono celular que se encarga de la interacción directa con los usuarios para la gestión de los pedidos.

## Desarrollado por
Ing. Alan Eduardo Aguilar Guerrero (Desarrollador Full-Stack)

## Fecha
Viernes 01 de mayo de 2026

### Tecnologías implementadas

|        App móvil         |     API REST      |     Bases de datos    |  Servicios adicionales |
| ------------------------ | ----------------- | --------------------- | ---------------------- |
| React Native CLI         | Node.js           | PostgreSQL            | Mongo Atlas            |
| TypeScript               | Express           | MongoDB               | Render                 |
| Axios                    | TypeScript        |                       | Git y GitHub           |
| TanStack React Query     | Sequelize         |                       | Mailtrap               |
| Zustand                  | Mongoose          |                       |                        |
| React Hook Form          | JWT               |                       |                        |
| Ionicons                 | dotenv            |                       |                        |
| UI Kitten                | express-validator |                       |                        |
| react-native-dotenv      | bcrypt            |                       |                        |
| Async Storage            | colors            |                       |                        |
| community/geolocation    | nodemailer        |                       |                        |
| react-native-permissions | morgan            |                       |                        |
| react-native-maps        | cors              |                       |                        |

**NOTA IMPORTANTE:** Este proyecto cuenta con conexiones a bases de datos en la nube, por lo que es necesario implementar las API keys para su correcto funcionamiento. Se le proporcionará el archivo **api_keys.txt** con las API keys del proyecto, enviado por correo electrónico por motivos de seguridad. Siga las instrucciones que se presentan a continuación para implementar el proyecto y garantizar su correcto funcionamiento.

## Instrucciones para descarga y ejecución del proyecto en local

### Descarga del proyecto desde GitHub
Puede descargar el proyecto utilizando la herramienta de control de versiones Git o bien descargándolo como un archivo `.zip` desde GitHub.

#### Opción con Git
1. Descargue e instale en su máquina la herramienta de gestión de repositorios *Git* desde la siguiente URL: `https://git-scm.com/downloads`. Si ya cuenta con Git instalado, omita este paso.
2. Descargue e instale en su máquina el entorno de desarrollo de *Node.js* desde la siguiente URL: `https://nodejs.org/es/download`. Si ya cuenta con Node.js instalado, omita este paso.
3. Cree una nueva carpeta en la ubicación de su disco `C:/` (por ejemplo, `proyecto`). No utilice espacios ni caracteres especiales para nombrar la carpeta.
4. Abra una terminal (Símbolo del sistema) en la ubicación donde creó la carpeta en el paso anterior y ejecute el comando `git clone https://github.com/Nekromorfo20/fastdelivery_aag.git`.

#### Opción manual
1. Descargue e instale en su máquina el entorno de desarrollo de *Node.js* desde la siguiente URL: `https://nodejs.org/es/download`. Si ya cuenta con Node.js instalado, omita este paso.
2. En la página del proyecto en GitHub `https://github.com/Nekromorfo20/fastdelivery_aag.git`, seleccione el botón *<> Code* y luego la opción *Download ZIP* para descargar el proyecto como un archivo `.zip`.
3. Cree una nueva carpeta en la ubicación de su disco `C:/` (por ejemplo, `proyecto`). No utilice espacios ni caracteres especiales para nombrar la carpeta.
4. Mueva y descomprima el archivo `.zip` en la ubicación donde creó la carpeta en el paso anterior.

### Descarga de Android Studio y creación de dispositivo virtual
Para ejecutar el proyecto *fastdelivery_app_movil* requerirá un teléfono celular virtual o físico con sistema operativo **Android 7 o superior** para alojar la aplicación.

**NOTA:** Si prefiere ejecutar el proyecto *fastdelivery_app_movil* utilizando un teléfono celular físico, debe habilitar la opción **Depuración USB** y después conectar un cable USB de la computadora al teléfono. Debe mantener conectado el teléfono mientras se instala la aplicación (explicado en pasos posteriores). Si elige esta opción, no será necesario instalar Android Studio.

**NOTA:** Puede verificar que el teléfono celular esté conectado abriendo una terminal (Símbolo del sistema) y ejecutando el comando `adb devices`. Debe aparecer al menos un dispositivo conectado.

A continuación se establecen los pasos para descargar el IDE **Android Studio** y crear un dispositivo virtual.

1. Descargue e instale en su máquina *Android Studio* desde la siguiente URL: `https://developer.android.com/studio?hl=es-419`. Si ya cuenta con Android Studio instalado, omita este paso.
2. Abra Android Studio.
3. En la pantalla principal, seleccione **Tools → Device Manager**.
4. Haga clic en **Create Device**.
5. Elija la categoría **Phone** y seleccione un modelo (por ejemplo, Pixel XL Pro). Después haga clic en *Next*.
6. En **System Image**, descargue una imagen de Android si todavía no tiene alguna (por ejemplo, Android 16). Cuando termine la descarga, selecciónela y pulse *Next*.
7. Asigne un nombre al dispositivo virtual y ajuste opciones como orientación, memoria o gráficos.
8. Haga clic en *Finish* para crear el dispositivo virtual.
9. Después de crearse el dispositivo, este aparecerá en **Device Manager**. Para iniciarlo, haga clic en el botón *Play*.

### Implementación del proyecto *fastdelivery_server*
1. Abra una terminal (Símbolo del sistema) en la ubicación donde descargó el proyecto de GitHub (`C:/<nombre_carpeta>`).
2. Entre a la carpeta `fastdelivery_server` con el comando `cd fastdelivery_server` y después ejecute el comando `npm install` para instalar todas las dependencias del proyecto API REST.
3. Cree el archivo `.env` basado en el archivo `.env.template` del proyecto. Asegúrese de colocarlo en la misma ubicación que el archivo `package.json`.
4. Copie y pegue la información proporcionada en el archivo **api_keys.txt** dentro del archivo `.env` creado en el paso anterior.
5. Ejecute el comando `npm run seed` para crear datos de prueba por defecto en las bases de datos del proyecto.
6. Ejecute `npm run dev` para iniciar la aplicación API REST. Deje esta terminal ejecutándose en todo momento para poder probar el proyecto.
7. Si desea finalizar la ejecución del proyecto en la terminal, oprima las teclas `Ctrl + C`.

**Puede consultar las rutas de consulta (endpoints) en la siguiente colección de Postman:**

`https://documenter.getpostman.com/view/8167457/2sBXqKoKbj`

### Implementación del proyecto *fastdelivery_app_movil*
1. Abra una nueva terminal (Símbolo del sistema) en la ubicación donde descargó el proyecto de GitHub (`C:/<nombre_carpeta>`).
2. Entre a la carpeta `fastdelivery_app_movil` con el comando `cd fastdelivery_app_movil` y ejecute `npm install` para instalar todas las dependencias del proyecto de aplicación móvil.
3. Cree el archivo `.env` basado en el archivo `.env.template` del proyecto. Asegúrese de colocarlo en la misma ubicación que el archivo `package.json`.
4. Reemplace el valor *localhost* del archivo `.env` por la dirección IPv4 de su máquina. Para obtener este valor, ejecute el comando `ipconfig` en una terminal (Símbolo del sistema), copie el valor **Dirección IPv4** de la sección *Adaptador de LAN inalámbrica Wi-Fi* y péguelo en lugar de la palabra *localhost*.
5. Abra *Android Studio*, seleccione su dispositivo virtual y ejecútelo. Espere a que termine de encenderse y desbloquearse completamente.
6. Regrese a su terminal y ejecute el comando `npm run android` para iniciar la aplicación móvil. Este proceso realizará la instalación del proyecto en su dispositivo y puede tardar algunos minutos. Deje esta terminal ejecutándose en todo momento para poder probar el proyecto.
7. Al finalizar, la aplicación móvil estará ejecutándose en su dispositivo virtual.
8. Si desea finalizar la ejecución del proyecto en la terminal, oprima las teclas `Ctrl + C` y después cierre la aplicación en su dispositivo virtual.

**NOTA:** Si optó por instalar el proyecto en un teléfono celular físico, puede omitir los pasos 5 a 7 y únicamente ejecutar el comando `npm run android`, dejando la terminal ejecutándose en todo momento y manteniendo siempre conectado el cable USB entre su computadora y el teléfono celular. Cuando termine de utilizar la aplicación, desactive la opción **Depuración USB** del teléfono.

### Usuario de prueba
**NOTA:** Se proporcionan los siguientes usuarios de prueba para realizar pruebas de funcionamiento del proyecto.

| Usuario            | Contraseña |
| ------------------ | ---------- |
| alan@example.com   | 12345678   |
| maria@example.com  | 12345678   |