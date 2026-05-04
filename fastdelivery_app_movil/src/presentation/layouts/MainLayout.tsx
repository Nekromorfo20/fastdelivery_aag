import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import Ionicons from "@react-native-vector-icons/ionicons"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../store/auth/useAuthStore";

interface MainLayoutProps {
  title: string;
  subtitle?: string;
  rightAction?: () => void;
  children?: React.ReactNode;
}

export const MainLayout = ({
  title,
  subtitle,
  rightAction,
  children,
}: MainLayoutProps) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();
  const { logout } = useAuthStore();

  const route = useRoute();

  const shouldShowBack =
    canGoBack() &&
    route.name !== "HomeScreen";

  const renderBackAction = () => (
    <TopNavigationAction
      onPress={goBack}
      icon={() => (<Ionicons name="arrow-back-outline" size={25} color={"gray"} />)}
    />
  );

  const renderRightAction = () => (
    <TopNavigationAction
      onPress={rightAction ?? logout}
      icon={() => (<Ionicons name="log-out-outline" size={25} color={"gray"} />)}
    />
  );

  return (
    <Layout
      style={{
        flex: 1,
        paddingTop: top,
      }}
    >
      <TopNavigation
        title={title}
        subtitle={subtitle}
        alignment="center"
        accessoryLeft={
          shouldShowBack
            ? renderBackAction
            : undefined
        }
        accessoryRight={renderRightAction}
      />

      <Divider />

      <Layout
        style={{
          flex: 1,
        }}
      >
        {children}
      </Layout>
    </Layout>
  );
};