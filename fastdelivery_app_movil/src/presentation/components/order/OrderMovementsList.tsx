import React from "react";
import { Layout, List, Text } from "@ui-kitten/components";
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

export const OrderMovementsList = ({ order }: Props) => {
  return (
    <List
      style={{ marginBottom: 60 }}
      contentContainerStyle={{ paddingBottom: 100 }}
      data={order.movements}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      ListHeaderComponent={
        <>
          <OrderInfoCard order={order} />

          <Layout style={{ paddingHorizontal: 8, paddingBottom: 8 }}>
            <Text category="s1">Historial de movimientos</Text>
          </Layout>
        </>
      }
      renderItem={({ item }) => (
        <Layout style={{ marginVertical: 4 }}>
          <MovementCard movement={item} />
        </Layout>
      )}
    />
  );
};