import React from "react";
import {
  Card,
  Layout,
  Text,
} from "@ui-kitten/components";
import { statusTranslations } from "../../../locales/es";
import { formatDate } from "../../../utils/formatDate";
import { statusStyles } from "../../../presentation/themes/order-status"

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

const StatusBadge = ({
  status,
}: {
  status: string;
}) => {
  const current =
    statusStyles[
      status as keyof typeof statusStyles
    ] ?? statusStyles.pending;

  return (
    <Layout
      style={{
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: current.background,
      }}
    >
      <Text
        category="c1"
        style={{
          fontWeight: "700",
          color: current.text,
        }}
      >
        {
          statusTranslations[
            status as keyof typeof statusTranslations
          ]
        }
      </Text>
    </Layout>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <Layout style={{ marginBottom: 8 }}>
    <Text
      category="s2"
      appearance="hint"
    >
      {label}
    </Text>

    <Text
      category="p2"
      style={{ marginTop: 2 }}
    >
      {value}
    </Text>
  </Layout>
);

export const MovementCard = ({ movement }: Props) => {
  const current = statusStyles[movement.currentStatus as keyof typeof statusStyles] ?? statusStyles.pending;

  return (
    <Card
      style={{
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      <Layout
        style={{
          flexDirection: "row",
        }}
      >
        <Layout
          style={{
            width: 4,
            borderRadius: 999,
            backgroundColor: current.accent,
            marginRight: 12,
          }}
        />

        <Layout style={{ flex: 1 }}>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 12,
            }}
          >
            <Layout style={{ flex: 1 }}>
              <Text
                category="label"
                appearance="hint"
              >
                Movimiento
              </Text>

              <Text
                category="s1"
                numberOfLines={1}
                style={{ marginTop: 2 }}
              >
                {movement.id}
              </Text>
            </Layout>

          </Layout>

          <InfoRow
            label="Fecha"
            value={formatDate(
              movement.lastMovementDate
            )}
          />

          <InfoRow
            label="Estatus actual"
            value={
              movement.currentStatus
                ? statusTranslations[
                    movement.currentStatus as keyof typeof statusTranslations
                  ] ?? movement.currentStatus
                : "-----"
            }
          />

          <InfoRow
            label="Estatus anterior"
            value={
              movement.lastStatus
                ? statusTranslations[
                    movement.lastStatus as keyof typeof statusTranslations
                  ] ?? movement.lastStatus
                : "-----"
            }
          />

          <InfoRow
            label="Coordenadas"
            value={`${movement.lat.toFixed(
              6
            )}, ${movement.lng.toFixed(6)}`}
          />

          {!!movement.comments && (
            <Layout style={{ flex: 1 }}>
              <Text
                category="label"
                appearance="hint"
              >
                Comentarios
              </Text>

              <Text
                category="s1"
                numberOfLines={1}
                style={{ marginTop: 2 }}
              >
                {movement.comments}
              </Text>
            </Layout>
          )}
        </Layout>
      </Layout>
    </Card>
  );
};