import React from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
} from "react-native-maps";
import { StyleSheet } from "react-native";
import { Layout } from "@ui-kitten/components";

interface Props {
  latitude: number;
  longitude: number;
}

export const Map = ({
  latitude,
  longitude,
}: Props) => {
  return (
    <Layout style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  map: {
    flex: 1,
  },
});