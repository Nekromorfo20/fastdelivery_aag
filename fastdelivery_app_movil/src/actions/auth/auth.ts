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

export const authLogin = async (email : string, password : string) => {
    email = email.toLocaleLowerCase()
    
    try {
        const { data } = await fastDeliveryApi.post('/auth/login', {
            email,
            password
        })
        return data;
    } catch (error) {
        console.log(error)
        return null
    }
}

export const authCheckStatus = async () => {
    try {
        const { data } = await fastDeliveryApi.post('/auth/check-token');
        return data;
    } catch (error) {
        console.log(error)
        return null
    }
}