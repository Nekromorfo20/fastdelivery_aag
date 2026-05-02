import { Input, Layout, Text, Button } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNagivator"

interface RegisterScreenProps extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { height } = useWindowDimensions()

  return (
    <Layout
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ marginHorizontal: 40 }}
      >
        <Layout
          style={{ paddingTop: height * 0.30 }}
        >
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>

        <Layout
          style={{ marginTop: 20 }}
        >
          <Input
            placeholder="Nombre completo"
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Corre electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
          />
        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button
            onPress={() => console.log('Hola')}
            // accessoryRight={<MyIcon name="arrow-forward-outline" white />}
          >Crear</Button>
        </Layout>

        <Layout style={{ height: 50 }} />

        <Layout
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
        >
          <Text>¿Ya tienes una cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.goBack()}
          >{' '}Ingresar{' '}</Text>
        </Layout>

      </ScrollView>
    </Layout>
  )
}
