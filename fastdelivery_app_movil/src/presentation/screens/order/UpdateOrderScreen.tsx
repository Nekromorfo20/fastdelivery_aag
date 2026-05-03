import React from "react";
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

const statusOptions = [
  "pending",
  "onTheWay",
  "received",
  "canceled",
];

interface Props
  extends StackScreenProps<
    RootStackParams,
    "UpdateOrderScreen"
  > {}

export const UpdateOrderScreen = ({
  route,
  navigation,
}: Props) => {
  const { orderId, initialStatus } = route.params;

  const {
    permissionStatus,
    requestLocationPermission,
    hasLocationPermission,
  } = useLocationPermission();

  const { getCurrentLocation } = useCurrentLocation();

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
            const coords =
              hasLocationPermission
                ? await getCurrentLocation()
                : null;

            await mutation.mutateAsync({
                orderId,
                status: values.currentStatus,
                comments: values.comments,
                lat: coords?.lat ?? 0,
                lng: coords?.lng ?? 0,
            });

            navigation.goBack();
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => {
            const selectedIndex = new IndexPath(
              Math.max(
                0,
                statusOptions.findIndex(
                  (status) =>
                    status === values.currentStatus
                )
              )
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

                    setFieldValue(
                      "currentStatus",
                      selected
                    );
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
                  Se tomarán las coordenadas de tu
                  localización al cambiar el estatus
                  del pedido.
                </Text>

                <Text
                  appearance="hint"
                  category="c1"
                  style={{ marginBottom: 12 }}
                >
                  Permiso actual: {permissionStatus}
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

                <Input
                  label="Comentarios"
                  multiline
                  textStyle={{ minHeight: 80 }}
                  value={values.comments}
                  onChangeText={handleChange("comments")}
                  style={{ marginBottom: 16 }}
                />

                <Button
                    disabled={mutation.isPending}
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