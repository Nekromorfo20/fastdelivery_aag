import React from "react";
import { Card, Layout, Text } from "@ui-kitten/components";
import { statusTranslations } from "../../../locales/es";
import { formatDate } from "../../../utils/formatDate";

export interface Movement {
  id: string;
  currentStatus: string;
  lastStatus?: string | null;
  lat: number;
  lng: number;
  lastMovementDate: Date;
  comments?: string | null;
}

interface Props {
  movement: Movement;
}

const Field = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Layout
    style={{
      flexDirection: "row",
      marginBottom: 4,
      backgroundColor: "transparent",
    }}
  >
    <Text category="s2">{label}: </Text>
    <Text style={{ flex: 1 }}>{value}</Text>
  </Layout>
);

export const MovementCard = ({ movement }: Props) => {
  return (
    <Card
      style={{
        marginHorizontal: 8,
        marginVertical: 4,
      }}
    >
      <Field label="Movimiento" value={movement.id} />

      <Field
        label="Estatus actual"
        value={
          statusTranslations[
            movement.currentStatus as keyof typeof statusTranslations
          ] ?? movement.currentStatus
        }
      />

      <Field
        label="Estatus anterior"
        value={
          movement.lastStatus
            ? statusTranslations[
                movement.lastStatus as keyof typeof statusTranslations
              ] ?? movement.lastStatus
            : "-----"
        }
      />

      <Field
        label="Fecha"
        value={formatDate(movement.lastMovementDate)}
      />

      <Field
        label="Coordenadas"
        value={`${movement.lat.toFixed(6)}, ${movement.lng.toFixed(6)}`}
      />

      {!!movement.comments && (
        <Layout
          style={{
            marginTop: 8,
            backgroundColor: "transparent",
          }}
        >
          <Text category="s2" style={{ marginBottom: 4 }}>
            Comentarios
          </Text>

          <Text appearance="hint">{movement.comments}</Text>
        </Layout>
      )}
    </Card>
  );
};