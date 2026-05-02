import { Card, Text } from "@ui-kitten/components"
import { Movement } from "../../../domain/entities/movement"
import { statusTranslations } from "../../../locales/es"

interface Props {
    movement : Movement
}

export const MovementCard = ({ movement } : Props) => {
  return (
    <Card
        style={{ flex: 1, margin: 1, justifyContent: "center", alignItems: "center" }}
    >
        <Text>
            <Text style={{ fontWeight: "bold" }}>Id:</Text>
            {" "}{movement.id}
        </Text>
        <Text>
            <Text style={{ fontWeight: "bold" }}>Estatus actual:</Text>
            {" "}{statusTranslations[movement.currentStatus]}
        </Text>
        <Text>
            <Text style={{ fontWeight: "bold" }}>Lat:</Text>
            {" "}{movement.lat}
        </Text>
        <Text>
            <Text style={{ fontWeight: "bold" }}>Lng:</Text>
            {" "}{movement.lng}
        </Text>
    </Card>
  )
}

