import { useCallback } from "react";
import Geolocation from "@react-native-community/geolocation";

interface Coordinates {
  lat: number;
  lng: number;
}

export const useCurrentLocation = () => {
  const getCurrentLocation = useCallback(() => {
    return new Promise<Coordinates>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000,
        }
      );
    });
  }, []);

  return {
    getCurrentLocation,
  };
};