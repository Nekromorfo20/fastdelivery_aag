import { Movement } from "../../../domain/entities/movement"
import { List, Text, Layout } from "@ui-kitten/components"
import { MovementCard } from "./MovimentCard"

interface Props {
    movements : Movement[]
}

export const MovementList = ({ movements } : Props) => {

  return (
    <List
        style={{ marginTop: 10 }}
        data={movements}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
            <MovementCard
                movement={item}
            />
        )}
    />
  )
}

