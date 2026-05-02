import React from "react";
import {
  Button,
  Card,
  IndexPath,
  Input,
  Layout,
  Modal,
  Select,
  SelectItem,
  Text,
} from "@ui-kitten/components";
import { Formik } from "formik";
import { statusTranslations } from "../../../locales/es";

const statusOptions = [
  "pending",
  "onTheWay",
  "received",
  "canceled"
];

interface Props {
  visible: boolean;
  initialStatus: string;
  onClose: () => void;
  onSubmit: (values: {
    currentStatus: string;
    comments: string;
  }) => void;
  isLoading?: boolean;
}

export const UpdateOrderModal = ({
  visible,
  initialStatus,
  onClose,
  onSubmit,
  isLoading = false,
}: Props) => {
  return (
    <Modal
      visible={visible}
      backdropStyle={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onBackdropPress={onClose}
    >
      <Card disabled>
        <Text category="h6" style={{ marginBottom: 16 }}>
          Actualizar pedido
        </Text>

        <Formik
          enableReinitialize
          initialValues={{
            currentStatus: initialStatus,
            comments: "",
          }}
          onSubmit={onSubmit}
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
                  (status) => status === values.currentStatus
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
                      statusOptions[(index as IndexPath).row];
                    setFieldValue("currentStatus", selected);
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
                    style={{
                        marginTop: -4,
                        marginBottom: 12,
                    }}
                >Se tomarán las coordenadas de tu localización al cambiar el estatus del pedido.
                </Text>

                <Input
                  label="Comentarios"
                  multiline
                  textStyle={{ minHeight: 80 }}
                  value={values.comments}
                  onChangeText={handleChange("comments")}
                  style={{ marginBottom: 16 }}
                />

                <Layout
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    gap: 8,
                  }}
                >
                  <Button
                    appearance="ghost"
                    onPress={onClose}
                  >
                    Cancelar
                  </Button>

                  <Button
                    disabled={isLoading}
                    onPress={() => handleSubmit()}
                  >
                    Guardar
                  </Button>
                </Layout>
              </>
            );
          }}
        </Formik>
      </Card>
    </Modal>
  );
};