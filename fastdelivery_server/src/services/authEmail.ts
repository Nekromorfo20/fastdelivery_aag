import { transporter } from "../config/nodemailer"

interface IEmail {
    email : string
    name : string
}

export const sendPasswordResetEmail = async (user : IEmail) => {
    const info = await transporter.sendMail({
        from: 'FastDelivery <admin@fastdelivery.com>',
        to: user.email,
        subject: 'FastDelivery - Restablece tu contraseña',
        text: 'FastDelivery - Restablece tu contraseña',
        html: `<p>Hola: ${user.name}, has solicitado restablecer tu contraseña.</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer contraseña</a>
        `
    })
    console.log('Mensaje enviado: ', info.messageId);
}