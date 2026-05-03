import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack'
import { LoadingScreen } from '../screens/loading/LoadingScreen'
import { LoginScreen } from '../screens/auth/LoginScreen'
import { RegisterScreen } from '../screens/auth/RegisterScreen'
import { HomeScreen } from '../screens/home/HomeScreen'
import { OrderScreen } from '../screens/order/OrderScreen'
import { UpdateOrderScreen } from "../screens/order/UpdateOrderScreen";

export type RootStackParams = {
    LoadingScreen : undefined
    LoginScreen : undefined
    RegisterScreen : undefined
    HomeScreen : undefined
    OrderScreen : { orderId : number }
    UpdateOrderScreen: {
        orderId: number;
        initialStatus: string;
    };
}

const Stack = createStackNavigator<RootStackParams>()

// Aplicar efecto fade al acceder a una Screen
const fadeAnimation : StackCardStyleInterpolator = ({ current }) => {
    return {
        cardStyle: {
            opacity: current.progress
        }
    }
}

export const StackNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName='LoadingScreen'
    screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ cardStyleInterpolator: fadeAnimation}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ cardStyleInterpolator: fadeAnimation}} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ cardStyleInterpolator: fadeAnimation}} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ cardStyleInterpolator: fadeAnimation}} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="UpdateOrderScreen" component={UpdateOrderScreen} />
    </Stack.Navigator>
  )
}