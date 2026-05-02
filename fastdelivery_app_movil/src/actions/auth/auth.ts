import { fastDeliveryApi } from "../../config/api/fastDeliveryApi"
// import { User } from "../../domain/entities/user"
// import type { AuthResponse } from "../../infraestructure/interfaces/auth.responses"

// Generar respuesta interface/DTO para User
// const returnUserToken = (data : AuthResponse) => {
//     const user : User = {
//         id: data.id,
//         email: data.email,
//         fullName: data.fullName,
//         isActive: data.isActive ,
//         roles: data.roles    
//     }

//     return {
//         user: user,
//         token: data.token
//     }
// }

// POST - /api/auth/login "Servicio de autenticación de usuario"
export const authLogin = async (email : string, password : string) => {
    email = email.toLocaleLowerCase()
    
    try {
        const { data } = await fastDeliveryApi.post('/auth/login', {
            email,
            password
        })
        // return returnUserToken(data)
        return data;
    } catch (error) {
        console.log(error)
        return null
    }
}

// GET - /api/auth/check-status "Revisión de token valido y refrescar token"
export const authCheckStatus = async () => {
    try {
        const { data } = await fastDeliveryApi.get('/auth/check-status')
        // return returnUserToken(data)
    } catch (error) {
        console.log(error)
        return null
    }
}