import React from "react";
import Ionicons from "@react-native-vector-icons/ionicons"
import {
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface Props {
  onPress: () => void;
  bottom?: number;
  right?: number;
  disabled?: boolean;
  style?: ViewStyle;
}

export const FloatingActionButton = ({
  onPress,
  
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
        borderless: true,
        radius: 32,
      }}
      style={({ pressed }) => [
        styles.container,
        {
          bottom,
          right,
          opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
        style,
      ]}
    >
      <View style={styles.button}>
        <Ionicons
          name="create-outline"
          size={24}
          color="white"
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 30,
    elevation: 8,
    borderRadius: 29,
    overflow: "hidden",
  },

  button: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3366FF",

    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
});