import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Layout } from "@ui-kitten/components";

interface Props {
  onPress: () => void;
  icon?: string;
  bottom?: number;
  right?: number;
  disabled?: boolean;
  style?: ViewStyle;
}

export const FloatingActionButton = ({
  onPress,
  icon = "✏️",
  bottom = 80,
  right = 24,
  disabled = false,
  style,
}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      hitSlop={12}
      android_ripple={{
        borderless: false,
        radius: 30,
      }}
      style={({ pressed }) => [
        styles.container,
        {
          bottom,
          right,
          opacity: disabled ? 0.5 : pressed ? 0.9 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        style,
      ]}
    >
      <Layout style={styles.button}>
        <Text style={styles.icon}>{icon}</Text>
      </Layout>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 30,
    elevation: 8,
  },
  button: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    backgroundColor: "blue",
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  icon: {
    fontSize: 22,
  },
});