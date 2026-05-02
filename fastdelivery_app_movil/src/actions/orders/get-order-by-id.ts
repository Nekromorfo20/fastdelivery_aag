import { fastDeliveryApi } from "../../config/api/fastDeliveryApi";

export const getOrderById = async (id : number) => {
    try {
        const { data } = await fastDeliveryApi.get(`/order/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}