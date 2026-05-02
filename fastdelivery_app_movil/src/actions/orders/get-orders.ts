import { fastDeliveryApi } from "../../config/api/fastDeliveryApi";

export const getOrders = async () => {
    try {
        const { data } = await fastDeliveryApi.get('/order');
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}