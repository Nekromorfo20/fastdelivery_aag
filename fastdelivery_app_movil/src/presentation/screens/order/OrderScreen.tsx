import React, { useMemo, useState } from "react";
import { Button, Layout } from "@ui-kitten/components";
import { MainLayout } from "../../layouts/MainLayout";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNagivator";
import { getOrderById } from "../../../actions/orders/get-order-by-id";
import { statusTranslations } from "../../../locales/es";
import { OrderMovementsList } from "../../components/order/OrderMovementsList";
import { UpdateOrderModal } from "../../components/order/UpdateOrderModal";
import { FloatingActionButton } from "../../components/ui/FloatingActionButton";

interface Props
  extends StackScreenProps<RootStackParams, "OrderScreen"> {}

const updateOrderMovement = async (payload: {
  orderId: number;
  currentStatus: string;
  comments: string;
}) => {
  console.log(payload);
  return true;
};

export const OrderScreen = ({ route }: Props) => {
  const { orderId } = route.params;
  const queryClient = useQueryClient();

  const [visible, setVisible] = useState(false);

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
  });

  const mutation = useMutation({
    mutationFn: updateOrderMovement,
    onSuccess: () => {
      setVisible(false);

      queryClient.invalidateQueries({
        queryKey: ["order", orderId],
      });
    },
  });

    const latestMovement = useMemo(() => {
    if (!order?.data?.movements?.length) return null;
    return order.data.movements[0];
  }, [order]);

  if (isLoading || !order) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <MainLayout
      title={order.data.trackingNumber}
      subtitle={statusTranslations[order.data.status]}
    >
      <Layout style={{ flex: 1 }}>
        <Layout style={{ flex: 1 }}>
          <OrderMovementsList order={order.data} />
        </Layout>

        <FloatingActionButton
          icon="✏️"
          onPress={() => setVisible(true)}
        />

        <UpdateOrderModal
          visible={visible}
          initialStatus={
            latestMovement?.currentStatus ?? order.data.status
          }
          isLoading={mutation.isPending}
          onClose={() => setVisible(false)}
          onSubmit={(values) =>
            mutation.mutate({
              orderId,
              currentStatus: values.currentStatus,
              comments: values.comments,
            })
          }
        />
      </Layout>
    </MainLayout>
  );
};