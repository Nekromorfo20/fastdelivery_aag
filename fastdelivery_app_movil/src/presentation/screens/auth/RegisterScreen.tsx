import { Input, Layout, Text, Button } from "@ui-kitten/components"
import Ionicons from "@react-native-vector-icons/ionicons"
import { Alert, Image, useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNagivator"
import { useAuthStore } from "../../store/auth/useAuthStore"
import { useState } from "react"

interface RegisterScreenProps extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { height, width } = useWindowDimensions();
  const { signin } = useAuthStore();

  const logoSize = Math.min(width * 0.38, 192);

  const [isPosting, setIsPosting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const onSigin = async () => {
    if (form.name.length === 0 ||
        form.email.length === 0 ||
        form.password.length === 0 ||
        form.passwordConfirmation.length === 0) {
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await signin(form.name, form.email, form.password, form.passwordConfirmation);
    setIsPosting(false);

    if (wasSuccessful) return;

    Alert.alert('Error', 'Usuario o contraseñas incorrectas');
  }

  return (
    <Layout
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ marginHorizontal: 40 }}
      >
        <Layout
          style={{
            paddingTop: height * 0.18,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/iconLogin.png")}
            style={{
              width: logoSize,
              height: logoSize,
              marginBottom: 20,
            }}
            resizeMode="contain"
          />

          <Text category="h1" style={{ textAlign: "center" }}>
            Registrate
          </Text>

          <Text
            category="p2"
            style={{
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Agrege los datos para registrarse e ingresar
          </Text>
        </Layout>

        <Layout
          style={{ marginTop: 20 }}
        >
          <Input
            placeholder="Nombre completo"
            style={{ marginBottom: 10 }}
            value={form.name}
            onChangeText={name => setForm({ ...form, name })}
            accessoryLeft={() => (<Ionicons name="person-outline" size={20} color={"gray"} />)}
          />
          <Input
            placeholder="Corre electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
            value={form.email}
            onChangeText={email => setForm({ ...form, email })}
            accessoryLeft={() => (<Ionicons name="mail-outline" size={20} color={"gray"} />)}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
            value={form.password}
            onChangeText={password => setForm({ ...form, password })}
            accessoryLeft={() => (<Ionicons name="lock-closed-outline" size={20} color={"gray"} />)}
          />
          <Input
            placeholder="Repetir contraseña"
            secureTextEntry
            autoCapitalize="none"
            style={{ marginBottom: 10 }}
            value={form.passwordConfirmation}
            onChangeText={passwordConfirmation => setForm({ ...form, passwordConfirmation })}
            accessoryLeft={() => (<Ionicons name="lock-closed-outline" size={20} color={"gray"} />)}
          />
        </Layout>
        

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button
            onPress={onSigin}
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
