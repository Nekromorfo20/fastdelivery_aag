import React from "react";
import {
  Card,
  Layout,
  Text,
} from "@ui-kitten/components";
import { statusTranslations } from "../../../locales/es";
import { formatDate } from "../../../utils/formatDate";
import { statusStyles } from "../../../presentation/themes/order-status"

interface Props {
  order: {
    trackingNumber: string;
    clientName: string;
    userAssignedName: string;
    status: string;
    creationDate: Date;
  };
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <Layout style={{ marginBottom: 12 }}>
    <Text
      category="s2"
      appearance="hint"
    >
      {label}
    </Text>

    <Text
      category="p1"
      style={{ marginTop: 2 }}
    >
      {value}
    </Text>
  </Layout>
);

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

export const OrderInfoCard = ({
  order,
}: Props) => {
  return (
    <Card
      style={{
        marginHorizontal: 12,
        marginTop: 8,
        borderRadius: 14,
      }}
    >
      <Layout>
        <Text
          category="label"
          appearance="hint"
        >
          Número de rastreo
        </Text>

        <Text
          category="h6"
          style={{
            marginTop: 2,
            marginBottom: 16,
          }}
        >
          {order.trackingNumber}
        </Text>

        <Layout style={{ marginBottom: 14 }}>
          <Text
            category="s2"
            appearance="hint"
            style={{ marginBottom: 4 }}
          >
            Estatus actual
          </Text>

          <StatusBadge status={order.status} />
        </Layout>

        <InfoRow
          label="Cliente"
          value={order.clientName}
        />

        <InfoRow
          label="Usuario asignado"
          value={order.userAssignedName}
        />

        <InfoRow
          label="Creación del pedido"
          value={formatDate(order.creationDate)}
        />
      </Layout>
    </Card>
  );
};