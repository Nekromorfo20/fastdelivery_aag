import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
} from "react-native-permissions";

type PermissionStatus =
  | "unavailable"
  | "denied"
  | "blocked"
  | "granted";

interface LocationContextProps {
  permissionStatus: PermissionStatus;
  requestLocationPermission: () => Promise<boolean>;
  hasLocationPermission: boolean;
}

export const LocationContext =
  createContext<LocationContextProps>({
    permissionStatus: "denied",
    requestLocationPermission: async () => false,
    hasLocationPermission: false,
  });

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>("denied");

  const permission =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const checkPermission = useCallback(async () => {
    const result = await check(permission);

    switch (result) {
      case RESULTS.GRANTED:
        setPermissionStatus("granted");
        break;
      case RESULTS.BLOCKED:
        setPermissionStatus("blocked");
        break;
      case RESULTS.UNAVAILABLE:
        setPermissionStatus("unavailable");
        break;
      default:
        setPermissionStatus("denied");
        break;
    }
  }, [permission]);

  const requestLocationPermission = useCallback(async () => {
    const result = await request(permission);

    const granted = result === RESULTS.GRANTED;

    setPermissionStatus(granted ? "granted" : "denied");

    return granted;
  }, [permission]);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  const value = useMemo(
    () => ({
      permissionStatus,
      requestLocationPermission,
      hasLocationPermission:
        permissionStatus === "granted",
    }),
    [permissionStatus, requestLocationPermission]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};