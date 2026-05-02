
import { Card, Text } from "@ui-kitten/components"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "../../navigation/StackNagivator"
import { Order } from "../../../domain/entities/order"
import { statusTranslations } from "../../../locales/es"

interface Props {
    order : Order
}

export const OrderCard = ({ order } : Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <Card
        style={{ flex: 1, margin: 1, justifyContent: "center", alignItems: "center" }}
        onPress={() => navigation.navigate('OrderScreen', { orderId: order.id })}
    >
        <Text>
            <Text style={{ fontWeight: "bold" }}>Orden:</Text>
            {" "}#{order.id}
        </Text>
        <Text>
            <Text style={{ fontWeight: "bold" }}>Número de rastero:</Text>
            {" "}{order.trackingNumber}
        </Text>
        <Text>
            <Text style={{ fontWeight: "bold" }}>Estatus:</Text>
            {" "}{statusTranslations[order.status]}
        </Text>
    </Card>
  )
}

