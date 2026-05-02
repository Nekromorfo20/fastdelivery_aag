import React from "react";
import { Input, Layout } from "@ui-kitten/components";
import { statusTranslations } from "../../../locales/es";
import { formatDate } from "../../../utils/formatDate";

interface Props {
  order: {
    trackingNumber: string;
    clientName: string;
    userAssignedName: string;
    status: string;
    creationDate: Date;
  };
}

export const OrderInfoCard = ({ order }: Props) => {
  return (
    <Layout style={{ paddingHorizontal: 8, paddingTop: 8 }}>
      <Input
        label="Número de rastreo"
        value={order.trackingNumber}
        readOnly
        style={{ marginBottom: 8 }}
      />

      <Input
        label="Cliente"
        value={order.clientName}
        readOnly
        style={{ marginBottom: 8 }}
      />

      <Input
        label="Usuario asignado"
        value={order.userAssignedName}
        readOnly
        style={{ marginBottom: 8 }}
      />

      <Input
        label="Estatus actual"
        value={statusTranslations[order.status]}
        readOnly
        style={{ marginBottom: 8 }}
      />

      <Input
        label="Creación del pedido"
        value={formatDate(order.creationDate)}
        readOnly
        style={{ marginBottom: 16 }}
      />
    </Layout>
  );
};