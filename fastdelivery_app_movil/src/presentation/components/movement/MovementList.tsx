import React from "react";
import { List, Layout, Text } from "@ui-kitten/components";
import { MovementCard, Movement } from "./MovimentCard";

interface Props {
  movements: Movement[];
  title?: string;
}

export const MovementList = ({
  movements,
  title = "Historial de movimientos",
}: Props) => {
  return (
    <List
      style={{ marginTop: 8 }}
      contentContainerStyle={{ paddingBottom: 8 }}
      data={movements}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <Layout
          style={{
            paddingHorizontal: 8,
            paddingBottom: 8,
            backgroundColor: "transparent",
          }}
        >
          <Text category="s1">{title}</Text>
        </Layout>
      }
      ListEmptyComponent={
        <Layout
          style={{
            paddingHorizontal: 8,
            paddingVertical: 12,
            backgroundColor: "transparent",
          }}
        >
          <Text appearance="hint">
            No hay movimientos registrados.
          </Text>
        </Layout>
      }
      renderItem={({ item }) => (
        <MovementCard movement={item} />
      )}
    />
  );
};