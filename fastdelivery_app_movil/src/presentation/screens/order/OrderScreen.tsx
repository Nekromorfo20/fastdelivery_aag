import { Input, Layout, List, Text } from "@ui-kitten/components";
import { MainLayout } from "../../layouts/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNagivator";
import { getOrderById } from "../../../actions/orders/get-order-by-id";
import { statusTranslations } from "../../../locales/es";
import { formatDate } from "../../../utils/formatDate";
import { MovementCard } from "../../components/movement/MovimentCard";

interface Props extends StackScreenProps<RootStackParams, "OrderScreen"> {}

export const OrderScreen = ({ route }: Props) => {
  const { orderId } = route.params;

  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
  });

  if (!order) return <MainLayout title="Cargando..." />;

  return (
    <MainLayout
      title={order.data.trackingNumber}
      subtitle={order.data.status}
    >
      <List
        contentContainerStyle={{ paddingBottom: 24 }}
        data={order.data.movements}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListHeaderComponent={
          <Layout style={{ margin: 5 }}>
            <Input
              label="Número de rastreo"
              value={order.data.trackingNumber}
              readOnly
            />

            <Input
              label="Cliente"
              value={order.data.clientName}
              readOnly
            />

            <Input
              label="Estatus actual"
              value={statusTranslations[order.data.status]}
              readOnly
            />

            <Input
              label="Creación del pedido"
              value={formatDate(order.data.creationDate)}
              readOnly
            />

            <Text style={{ marginTop: 20 }}>
              Historial de movimientos:
            </Text>
          </Layout>
        }
        renderItem={({ item }) => (
          <MovementCard movement={item} />
        )}
      />
    </MainLayout>
  );
};