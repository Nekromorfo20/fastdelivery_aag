import { useNavigation } from "@react-navigation/native"
import { Divider, Layout, TopNavigation, TopNavigationAction, Text } from "@ui-kitten/components"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAuthStore } from "../store/auth/useAuthStore"

interface MainLayoutProps {
    title : string
    subtitle? : string
    rigthAction?: () => void
    rigthActionIcon?: string
    children? : React.ReactNode
}

export const MainLayout = ({ title, subtitle, rigthAction, rigthActionIcon, children } : MainLayoutProps) => {
    const { top } = useSafeAreaInsets()
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

    const RenderRightAction = () => {
        // if (rigthAction === undefined || rigthActionIcon === undefined ) return null
        return (
            <TopNavigationAction
                onPress={logout}
                icon={() => renderArrow("🚪")} 
            />
        )
    }

    return (
    <Layout
        style={{ paddingTop: top }}
    >
      <TopNavigation
        title={title}
        subtitle={subtitle}
        alignment="center"
        accessoryLeft={canGoBack() ? renderBackAction : undefined}
        accessoryRight={() => <RenderRightAction />}
      />
      <Divider />

      <Layout style={{ height: '100%' }} >
        {children}
      </Layout>
    </Layout>
  )
}
