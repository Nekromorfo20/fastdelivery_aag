import React from "react";
import {
  Layout,
  List,
  Text,
} from "@ui-kitten/components";
import { MovementCard } from "../movement/MovimentCard";
import { OrderInfoCard } from "./OrderInfoCard";

interface Movement {
  id: string;
  currentStatus: string;
  lastStatus: string | null;
  lat: number;
  lng: number;
  lastMovementDate: Date;
  comments: string;
}

interface Props {
  order: {
    trackingNumber: string;
    clientName: string;
    userAssignedName: string;
    status: string;
    creationDate: Date;
    movements: Movement[];
  };
}

export const OrderMovementsList = ({
  order,
}: Props) => {
  return (
    <List
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingBottom: 110,
      }}
      data={order.movements}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Layout>
          <OrderInfoCard order={order} />

          <Layout
            style={{
              paddingHorizontal: 16,
              paddingTop: 18,
              paddingBottom: 4,
            }}
          >
            <Text
              category="label"
              appearance="hint"
            >
              Historial de movimientos
            </Text>

            <Text
              category="s1"
              style={{ marginTop: 2 }}
            >
              Seguimiento del pedido
            </Text>
          </Layout>
        </Layout>
      }
      renderItem={({ item }) => (
        <MovementCard movement={item} />
      )}
      ListEmptyComponent={
        <Layout
          style={{
            paddingHorizontal: 16,
            paddingTop: 8,
          }}
        >
          <Text appearance="hint">
            No hay movimientos registrados.
          </Text>
        </Layout>
      }
    />
  );
};