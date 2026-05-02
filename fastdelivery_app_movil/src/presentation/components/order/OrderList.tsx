import { useState } from "react"
import { Order } from "../../../domain/entities/order"
import { List, Text, Layout } from "@ui-kitten/components"
import { OrderCard } from "./OrderCard"
import { RefreshControl } from "react-native"
import { useQueryClient } from "@tanstack/react-query"

interface Props {
    orders : Order[]
}

export const OrderList = ({ orders } : Props) => {
    const [isRefreshin, setIsRefreshing] = useState(false)
    const queryClient = useQueryClient()

    const onPullToRefresh = async () =>{
        setIsRefreshing(true)
        await new Promise(resolve => {
            setTimeout(() => {
                resolve('')
            }, 200)
        })
        queryClient.invalidateQueries({ queryKey: ["orders", "0"] })
        setIsRefreshing(false)
    } 

  return (
    <List
        data={orders}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
            <OrderCard order={item}/>
        )}
        ListFooterComponent={() => <Layout style={{ height: 150 }}/>}
        refreshControl={
            <RefreshControl
                refreshing={isRefreshin}
                onRefresh={onPullToRefresh}
            />
        }
    />
  )
}

