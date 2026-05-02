import { getOrders } from "../../../actions/orders/get-orders";
import { useQuery } from "@tanstack/react-query";
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { OrderList } from "../../components/order/OrderList";

export const HomeScreen = () => {
  const { isLoading, data:orders=[] } = useQuery({
    queryKey: ["orders", "0"],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getOrders()
  });

  return (
    <MainLayout
      title="Pedidos"
      subtitle="Lista de pedidos"
    >
      { isLoading ? (<FullScreenLoader />) :
        <OrderList orders={orders.data} />
      }
    </MainLayout>
  )
}
