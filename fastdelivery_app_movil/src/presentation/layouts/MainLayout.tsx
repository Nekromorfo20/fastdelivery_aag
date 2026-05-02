import { useNavigation } from "@react-navigation/native";
import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Text,
} from "@ui-kitten/components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "../store/auth/useAuthStore";

interface MainLayoutProps {
  title: string;
  subtitle?: string;
  rightAction?: () => void;
  rigthActionIcon?: string;
  children?: React.ReactNode;
}

export const MainLayout = ({
  title,
  subtitle,
  rightAction,
  rigthActionIcon,
  children,
}: MainLayoutProps) => {
  const { top } = useSafeAreaInsets();
  const { canGoBack, goBack } = useNavigation();
  const { logout } = useAuthStore();

  const renderArrow = (symbol: string) => (
    <Text category="h6">{symbol}</Text>
  );

  const renderBackAction = () => (
    <TopNavigationAction
      onPress={goBack}
      icon={() => renderArrow("⬅️")}
    />
  );

  const renderRightAction = () => (
    <TopNavigationAction
      onPress={rightAction ?? logout}
      icon={() => renderArrow(rigthActionIcon ?? "🚪")}
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
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
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