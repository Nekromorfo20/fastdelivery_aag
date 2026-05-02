import { Input, Layout, Text, Button } from "@ui-kitten/components"
import { Alert, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNagivator"
import { useState } from "react"
import { useAuthStore } from "../../store/auth/useAuthStore"

interface LoginScreenProps extends StackScreenProps<RootStackParams, 'LoginScreen'>{}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { height } = useWindowDimensions();
  const { login } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);

    if (wasSuccessful) return;

    Alert.alert('Error', 'Usuario o contraseña incorrecto');
  }  

  return (
    <Layout
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ marginHorizontal: 40 }}
      >
        <Layout
          style={{ paddingTop: height * 0.35 }}
        >
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>

        <Layout
          style={{ marginTop: 20 }}
        >
          <Input
            placeholder="Corre electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
            value={form.email}
            onChangeText={email => setForm({ ...form, email })}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
            value={form.password}
            onChangeText={password => setForm({ ...form, password })}
          />
        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button
            onPress={onLogin}
            disabled={isPosting}
          >Ingresar</Button>

        </Layout>

        <Layout style={{ height: 50 }} />

        <Layout
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center'
          }}
        >
          <Text>¿No tienes cuenta?</Text>
          <Text
            status="primary"
            category="s1"
            onPress={() => navigation.navigate('RegisterScreen')}
          >{' '}Crea una{' '}</Text>
        </Layout>

      </ScrollView>
    </Layout>
  )
}
