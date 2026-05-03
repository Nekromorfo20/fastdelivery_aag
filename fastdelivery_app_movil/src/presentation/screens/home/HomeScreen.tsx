import { getOrders } from "../../../actions/orders/orders";
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
      title="Lista de entregas"
      subtitle="Pedidos asignados"
    >
      { isLoading ? (<FullScreenLoader />) :
        <OrderList orders={orders.data} />
      }
    </MainLayout>
  )
}
