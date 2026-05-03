import React, { useMemo, useState } from "react";
import { Layout } from "@ui-kitten/components";
import { MainLayout } from "../../layouts/MainLayout";
import {
  useQuery,
} from "@tanstack/react-query";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNagivator";
import { getOrderById } from "../../../actions/orders/orders";
import { statusTranslations } from "../../../locales/es";
import { OrderMovementsList } from "../../components/order/OrderMovementsList";
import { FloatingActionButton } from "../../components/ui/FloatingActionButton";

interface Props extends StackScreenProps<RootStackParams, "OrderScreen"> {}

export const OrderScreen = ({
  route,
  navigation,
}: Props) => {
  const { orderId } = route.params;

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
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
          onPress={() =>
            navigation.navigate("UpdateOrderScreen", {
              orderId,
              initialStatus:
                latestMovement?.currentStatus ??
                order.data.status,
            })
          }
        />
      </Layout>
    </MainLayout>
  );
};