import React from "react";
import {
  Card,
  Layout,
  Text,
} from "@ui-kitten/components";
import { statusTranslations } from "../../../locales/es";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNagivator";
import { statusStyles } from "../../../presentation/themes/order-status"

interface Order {
  id: number;
  trackingNumber: string;
  status: string;
  receiverName: string;
  receiverAddress: string;
}

interface Props {
  order: Order;
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

export const OrderCard = ({ order }: Props) => {
  const current =
    statusStyles[
      order.status as keyof typeof statusStyles
    ] ?? statusStyles.pending;

    const navigation = useNavigation<NavigationProp<RootStackParams>>()
    

  return (
    <Card
      onPress={() => navigation.navigate('OrderScreen', { orderId: order.id })}
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
          alignItems: "stretch",
        }}
      >
        <Layout
          style={{
            width: 5,
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
              marginBottom: 10,
            }}
          >
            <Layout style={{ flex: 1 }}>
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
                  flexShrink: 1,
                }}
              >
                {order.trackingNumber}
              </Text>
            </Layout>

            <StatusBadge status={order.status} />
          </Layout>

          <Layout style={{ marginBottom: 8 }}>
            <Text
              category="s2"
              appearance="hint"
            >
              Recibe
            </Text>

            <Text
              category="p1"
              style={{ marginTop: 2 }}
            >
              {order.receiverName}
            </Text>
          </Layout>

          <Layout>
            <Text
              category="s2"
              appearance="hint"
            >
              Dirección
            </Text>

            <Text
              category="p2"
              style={{ marginTop: 2 }}
              numberOfLines={2}
            >
              {order.receiverAddress}
            </Text>
          </Layout>
        </Layout>
      </Layout>
    </Card>
  );
};