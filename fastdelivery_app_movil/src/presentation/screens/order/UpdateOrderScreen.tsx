import React, {useEffect,
  useState,} from "react";
import {
  Button,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { Formik } from "formik";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNagivator";
import { MainLayout } from "../../layouts/MainLayout";
import { statusTranslations } from "../../../locales/es";
import { useLocationPermission } from "../../hooks/useLocationPermission";
import { useCurrentLocation } from "../../hooks/useCurrentLocation";
import { updateOrder } from "../../../actions/orders/orders"
import { Map } from "../../components/maps/Map";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";

const statusOptions = [
  "pending",
  "onTheWay",
  "received",
  "canceled",
];

interface Props extends StackScreenProps<RootStackParams, "UpdateOrderScreen"> {}

export const UpdateOrderScreen = ({ route, navigation} : Props) => {
  const { orderId, initialStatus } = route.params;

  const {
    permissionStatus,
    requestLocationPermission,
    hasLocationPermission,
  } = useLocationPermission();

  const { getCurrentLocation } = useCurrentLocation();

  const [coords, setCoords] = useState<{lat: number, lng: number } | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState(false);

  useEffect(() => {
    const loadLocation = async () => {
      if (!hasLocationPermission) {
        setCoords(null);
        setIsLoadingMap(false);
        return;
    }

    setIsLoadingMap(true);

    try {
      const current =
        await getCurrentLocation();

      setCoords(current);
      } catch (error) {
        setCoords(null);
      } finally {
        setIsLoadingMap(false);
      }
    };

    loadLocation();
  }, [hasLocationPermission, getCurrentLocation]);

  const queryClient = useQueryClient();

    const mutation = useMutation({
    mutationFn: async (payload: {
        orderId: number;
        status: string;
        comments: string;
        lat: number;
        lng: number;
    }) => {
        return updateOrder(payload.orderId, {
          status: payload.status,
          comments: payload.comments,
          lat: payload.lat,
          lng: payload.lng,
        });
    },

    onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["order", orderId],
        });

        navigation.goBack();
      },
    });

  return (
    <MainLayout title="Actualizar pedido">
      <Layout style={{ flex: 1, padding: 16 }}>
        <Formik
          initialValues={{
            currentStatus: initialStatus,
            comments: "",
          }}
          onSubmit={async (values) => {
            const currentCoords =
              hasLocationPermission ? coords : null;

            await mutation.mutateAsync({
                orderId,
                status: values.currentStatus,
                comments: values.comments,
                lat: currentCoords?.lat ?? 0,
                lng: currentCoords?.lng ?? 0,
            });
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => {
            const selectedRow = Math.max(0, statusOptions.findIndex(
                (status) =>
                  status === values.currentStatus
              )
            );

            const selectedIndex = React.useMemo(
              () => new IndexPath(selectedRow),
              [selectedRow]
            );

            return (
              <>
                <Select
                  label="Estatus"
                  selectedIndex={selectedIndex}
                  value={
                    statusTranslations[
                      values.currentStatus as keyof typeof statusTranslations
                    ]
                  }
                  onSelect={(index) => {
                  const selected =
                    statusOptions[
                      (index as IndexPath).row
                    ];

                  if (selected !== values.currentStatus) {
                    setFieldValue(
                      "currentStatus",
                      selected
                    );
                  }
                }}
                  style={{ marginBottom: 12 }}
                >
                  {statusOptions.map((status) => (
                    <SelectItem
                      key={status}
                      title={
                        statusTranslations[
                          status as keyof typeof statusTranslations
                        ]
                      }
                    />
                  ))}
                </Select>

                <Text
                  appearance="hint"
                  category="c1"
                  style={{ marginBottom: 12 }}
                >
                  * Se tomarán las coordenadas de tu
                  localización al cambiar el estatus
                  del pedido.
                </Text>

                <Text
                  appearance="hint"
                  category="c1"
                  style={{ marginBottom: 12 }}
                >
                  Ubicación: {permissionStatus}
                </Text>

                {!hasLocationPermission && (
                  <Button
                    appearance="outline"
                    style={{ marginBottom: 12 }}
                    onPress={requestLocationPermission}
                  >
                    Solicitar permisos
                  </Button>
                )}

                {hasLocationPermission && (
                  <>
                    {isLoadingMap ? (
                      <Layout
                        style={{
                          height: 220,
                          marginBottom: 16,
                        }}
                      >
                        <FullScreenLoader />
                      </Layout>
                    ) : (
                      coords && (
                        <Map
                          latitude={coords.lat}
                          longitude={coords.lng}
                        />
                      )
                    )}
                  </>
                )}

                <Input
                  label="Comentarios"
                  multiline
                  textStyle={{ minHeight: 80 }}
                  value={values.comments}
                  onChangeText={handleChange("comments")}
                  style={{ marginBottom: 16 }}
                />

                <Button
                disabled={
                  mutation.isPending ||
                  isLoadingMap ||
                  (hasLocationPermission && !coords) ||
                  values.currentStatus === initialStatus
                }
                onPress={handleSubmit}
              >
                {mutation.isPending ? "Guardando..." : "Guardar"}
              </Button>
              </>
            );
          }}
        </Formik>
      </Layout>
    </MainLayout>
  );
};