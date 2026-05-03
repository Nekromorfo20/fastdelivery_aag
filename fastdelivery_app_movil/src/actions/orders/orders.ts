import { fastDeliveryApi } from "../../config/api/fastDeliveryApi";

interface OrderDataProps {
  status: string;
  comments: string;
  lat: number;
  lng: number;
}

export const getOrderById = async (id : number) => {
    try {
        const { data } = await fastDeliveryApi.get(`/order/${id}`);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrders = async () => {
    try {
        const { data } = await fastDeliveryApi.get('/order');
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateOrder = async (id: number, orderData: OrderDataProps) => {
  const { data } = await fastDeliveryApi.put(`/order/${id}`, {
      status: orderData.status,
      comments: orderData.comments,
      lat: orderData.lat,
      lng: orderData.lng,
    }
  );

  return data
};