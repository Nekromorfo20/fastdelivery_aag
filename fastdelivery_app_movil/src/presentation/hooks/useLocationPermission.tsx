import { useContext } from "react";
import { LocationContext } from "../providers/LocationProvider";

export const useLocationPermission = () => {
  return useContext(LocationContext);
};