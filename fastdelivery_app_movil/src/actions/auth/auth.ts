import { fastDeliveryApi } from "../../config/api/fastDeliveryApi"

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

export const authSignin = async (name : string, email : string, password : string, passwordConfirmation : string) => {
    name = name.toLocaleLowerCase()
    email = email.toLocaleLowerCase()
    
    try {
        const { data } = await fastDeliveryApi.post('/auth/signin', {
            name,
            email,
            password,
            passwordConfirmation
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