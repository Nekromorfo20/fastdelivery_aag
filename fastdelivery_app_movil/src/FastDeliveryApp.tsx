import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from "react-native";
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StackNavigator } from './presentation/navigation/StackNagivator';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { LocationProvider } from "./presentation/providers/LocationProvider";

const queryClient = new QueryClient()

export const FastDeliveryApp = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? eva.dark : eva.light;
  const backgroundColor = (colorScheme === 'dark') ? theme['color-primary-800'] : theme['color-primary-100'];

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva} theme={theme}
      >
        <NavigationContainer
          theme={{
          fonts: theme['text-basic-color'],
          dark: colorScheme === 'dark',
          colors: {
              primary: theme['color-primary-500'],
              background: backgroundColor,
              card: theme['color-basic-100'],
              text: theme['text-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-primary-500']
            }
          }}
        >
          <AuthProvider>
            <LocationProvider>
              <StackNavigator />
            </LocationProvider>
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  )
}

