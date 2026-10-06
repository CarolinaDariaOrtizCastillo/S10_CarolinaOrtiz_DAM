import { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppButton } from "../components/app-button";
import { AppInput } from "../components/app-input";
import {
  opcionesHabitacion,
  validarApellido,
  validarCorreo,
  validarFecha,
  validarHabitacion,
  validarMotivo,
  validarNombre,
} from "../utils/validators";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [habitacion, setHabitacion] = useState<string | null>(null);
  const [fecha, setFecha] = useState("");
  const [motivo, setMotivo] = useState("");

  const [error, setError] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const nombreValido = validarNombre(nombre);
  const apellidoValido = validarApellido(apellido);
  const correoValido = validarCorreo(correo);
  const habitacionValida = validarHabitacion(habitacion);
  const fechaValida = validarFecha(fecha);
  const motivoValido = validarMotivo(motivo);

  const camposValidos = [
    nombreValido,
    apellidoValido,
    correoValido,
    habitacionValida,
    fechaValida,
    motivoValido,
  ].filter(Boolean).length;

  const validarFormulario = () => {
    setError("");
    setRegistrado(false);

    if (!nombreValido) {
      setError("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (!apellidoValido) {
      setError("El apellido debe tener al menos 2 caracteres.");
      return;
    }

    if (!correoValido) {
      setError("El correo debe contener @.");
      return;
    }

    if (!habitacionValida) {
      setError("Debes elegir al menos una habitación.");
      return;
    }

    if (!fechaValida) {
      setError(
        "La fecha debe incluir día, mes y año (dd/mm/yyyy) y no puede ser anterior a hoy.",
      );
      return;
    }

    if (!motivoValido) {
      setError("El motivo debe tener más de 10 caracteres.");
      return;
    }

    setRegistrado(true);
  };

  const habitacionSeleccionada = opcionesHabitacion.find(
    (opcion) => opcion.id === habitacion,
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>AGENDA TU RESERVA</Text>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Información de la reserva</Text>
          <Text style={styles.sectionDescription}>
            Completa todos los campos para confirmar tu reserva.
          </Text>

          <AppInput
            label="Nombre"
            placeholder="Escribe tu nombre"
            value={nombre}
            autoCapitalize="words"
            onChangeText={(value) => {
              setNombre(value);
              setError("");
              setRegistrado(false);
            }}
          />

          {nombre.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                nombreValido ? styles.validText : styles.invalidText,
              ]}
            >
              {nombreValido ? "✓ Nombre válido" : "○ Mínimo 2 caracteres"}
            </Text>
          )}

          <AppInput
            label="Apellido"
            placeholder="Escribe tu apellido"
            value={apellido}
            autoCapitalize="words"
            onChangeText={(value) => {
              setApellido(value);
              setError("");
              setRegistrado(false);
            }}
          />

          {apellido.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                apellidoValido ? styles.validText : styles.invalidText,
              ]}
            >
              {apellidoValido ? "✓ Apellido válido" : "○ Mínimo 2 caracteres"}
            </Text>
          )}

          <AppInput
            label="Correo"
            placeholder="ejemplo@correo.com"
            value={correo}
            autoCapitalize="none"
            onChangeText={(value) => {
              setCorreo(value);
              setError("");
              setRegistrado(false);
            }}
            keyboardType="email-address"
          />

          {correo.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                correoValido ? styles.validText : styles.invalidText,
              ]}
            >
              {correoValido ? "✓ Correo válido" : "○ Debe incluir @"}
            </Text>
          )}

          <Text style={styles.label}>Habitación</Text>
          <View style={styles.roomList}>
            {opcionesHabitacion.map((item) => {
              const selected = item.id === habitacion;

              return (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    setHabitacion(item.id);
                    setError("");
                    setRegistrado(false);
                  }}
                  style={[
                    styles.roomOption,
                    selected && styles.roomOptionSelected,
                  ]}
                >
                  <View style={styles.roomInfo}>
                    <Text style={styles.roomName}>{item.nombre}</Text>
                    <Text style={styles.roomPrice}>{item.precio} soles</Text>
                  </View>

                  <View
                    style={[
                      styles.radioCircle,
                      selected && styles.radioCircleSelected,
                    ]}
                  >
                    {selected && <Text style={styles.radioDot}>●</Text>}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {habitacionSeleccionada && (
            <Text style={[styles.fieldStatus, styles.validText]}>
              ✓ Habitación seleccionada: {habitacionSeleccionada.nombre}
            </Text>
          )}

          <AppInput
            label="Fecha"
            placeholder="dd/mm/yyyy"
            value={fecha}
            onChangeText={(value) => {
              setFecha(value);
              setError("");
              setRegistrado(false);
            }}
            keyboardType="numbers-and-punctuation"
          />

          {fecha.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                fechaValida ? styles.validText : styles.invalidText,
              ]}
            >
              {fechaValida ? "✓ Fecha válida" : "○ Usa día, mes y año"}
            </Text>
          )}

          <AppInput
            label="Motivo"
            placeholder="Escribe el motivo de tu reserva"
            value={motivo}
            onChangeText={(value) => {
              setMotivo(value);
              setError("");
              setRegistrado(false);
            }}
            multiline
            autoCapitalize="sentences"
          />

          {motivo.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                motivoValido ? styles.validText : styles.invalidText,
              ]}
            >
              {motivoValido
                ? "✓ Motivo válido"
                : "○ Debe tener más de 10 caracteres"}
            </Text>
          )}

          {error !== "" && (
            <View style={styles.errorBox}>
              <View style={styles.errorIcon}>
                <Text style={styles.errorIconText}>!</Text>
              </View>

              <View style={styles.messageContainer}>
                <Text style={styles.errorTitle}>No se pudo guardar</Text>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </View>
          )}

          {registrado && (
            <View style={styles.successBox}>
              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>✓</Text>
              </View>

              <View style={styles.messageContainer}>
                <Text style={styles.successTitle}>¡Reserva agendada!</Text>
                <Text style={styles.successMessage}>
                  {nombre} {apellido} reservó {habitacionSeleccionada?.nombre}{" "}
                  para el {fecha}.
                </Text>
              </View>
            </View>
          )}

          <AppButton title="Guardar reserva" onPress={validarFormulario} />
        </View>

        <View style={styles.validationSection}>
          <View style={styles.validationHeader}>
            <View>
              <Text style={styles.validationTitle}>Validaciones</Text>
              <Text style={styles.validationSubtitle}>
                Reglas aplicadas al formulario
              </Text>
            </View>

            <View style={styles.counter}>
              <Text style={styles.counterText}>{camposValidos}/6</Text>
            </View>
          </View>

          <ValidationRow
            title="Nombre"
            description="No puede estar vacío ni tener menos de 2 caracteres."
            valid={nombreValido}
          />

          <ValidationRow
            title="Apellido"
            description="No puede estar vacío ni tener menos de 2 caracteres."
            valid={apellidoValido}
          />

          <ValidationRow
            title="Correo"
            description="Debe contener @ y un valor válido."
            valid={correoValido}
          />

          <ValidationRow
            title="Habitación"
            description="Debe seleccionar al menos una opción."
            valid={habitacionValida}
          />

          <ValidationRow
            title="Fecha"
            description="Debe incluir día, mes y año y no puede ser pasada."
            valid={fechaValida}
          />

          <ValidationRow
            title="Motivo"
            description="Debe tener más de 10 caracteres."
            valid={motivoValido}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type ValidationRowProps = {
  title: string;
  description: string;
  valid: boolean;
};

function ValidationRow({ title, description, valid }: ValidationRowProps) {
  return (
    <View style={styles.validationRow}>
      <View
        style={[
          styles.validationCircle,
          valid ? styles.validationCircleValid : styles.validationCirclePending,
        ]}
      >
        <Text
          style={[
            styles.validationIcon,
            valid ? styles.validationIconValid : styles.validationIconPending,
          ]}
        >
          {valid ? "✓" : "○"}
        </Text>
      </View>

      <View style={styles.validationInfo}>
        <Text style={styles.validationRowTitle}>{title}</Text>
        <Text style={styles.validationRowDescription}>{description}</Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          valid ? styles.statusBadgeValid : styles.statusBadgePending,
        ]}
      >
        <Text
          style={[
            styles.statusBadgeText,
            valid ? styles.statusBadgeTextValid : styles.statusBadgeTextPending,
          ]}
        >
          {valid ? "OK" : "Pendiente"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F6F4",
  },

  scroll: {
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 36,
  },

  title: {
    fontSize: 42,
    fontWeight: "800",
    lineHeight: 46,
    color: "#1E3A3A",
    marginBottom: 20,
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#B7E6E1",
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E3A3A",
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 13,
    color: "#359FA0",
    marginBottom: 18,
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E3A3A",
    marginBottom: 8,
  },

  fieldStatus: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: -6,
    marginBottom: 14,
  },

  validText: {
    color: "#359FA0",
  },

  invalidText: {
    color: "#FF8C52",
  },

  roomList: {
    gap: 10,
    marginBottom: 12,
  },

  roomOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF0C5",
    borderWidth: 1,
    borderColor: "#8AD6D1",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  roomOptionSelected: {
    borderColor: "#FF8C52",
    backgroundColor: "#FFFFFF",
  },

  roomInfo: {
    flex: 1,
  },

  roomName: {
    color: "#1E3A3A",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },

  roomPrice: {
    color: "#359FA0",
    fontSize: 13,
    fontWeight: "600",
  },

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#359FA0",
    alignItems: "center",
    justifyContent: "center",
  },

  radioCircleSelected: {
    borderColor: "#FF8C52",
    backgroundColor: "#FF8C52",
  },

  radioDot: {
    color: "#FFFFFF",
    fontSize: 9,
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF0C5",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FF8C52",
    padding: 12,
    marginTop: 6,
    marginBottom: 18,
  },

  errorIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF8C52",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  errorIconText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  messageContainer: {
    flex: 1,
  },

  errorTitle: {
    color: "#D35400",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 2,
  },

  errorMessage: {
    color: "#FF8C52",
    fontSize: 12,
    lineHeight: 18,
  },

  successBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#8AD6D1",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#359FA0",
    padding: 12,
    marginTop: 6,
    marginBottom: 18,
  },

  successIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#359FA0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  successIconText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  successTitle: {
    color: "#0F4C4E",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 2,
  },

  successMessage: {
    color: "#1E3A3A",
    fontSize: 12,
    lineHeight: 18,
  },

  validationSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#B7E6E1",
  },

  validationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  validationTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1E3A3A",
    marginBottom: 4,
  },

  validationSubtitle: {
    fontSize: 12,
    color: "#359FA0",
  },

  counter: {
    minWidth: 52,
    height: 42,
    backgroundColor: "#FFF0C5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },

  counterText: {
    color: "#FF8C52",
    fontSize: 14,
    fontWeight: "800",
  },

  validationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#FFF0C5",
  },

  validationCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  validationCircleValid: {
    backgroundColor: "#8AD6D1",
  },

  validationCirclePending: {
    backgroundColor: "#FFF0C5",
  },

  validationIcon: {
    fontSize: 16,
    fontWeight: "800",
  },

  validationIconValid: {
    color: "#359FA0",
  },

  validationIconPending: {
    color: "#FF8C52",
  },

  validationInfo: {
    flex: 1,
  },

  validationRowTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1E3A3A",
    marginBottom: 2,
  },

  validationRowDescription: {
    fontSize: 11,
    color: "#359FA0",
    lineHeight: 16,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },

  statusBadgeValid: {
    backgroundColor: "#8AD6D1",
  },

  statusBadgePending: {
    backgroundColor: "#FFF0C5",
  },

  statusBadgeText: {
    fontSize: 9,
    fontWeight: "800",
  },

  statusBadgeTextValid: {
    color: "#0F4C4E",
  },

  statusBadgeTextPending: {
    color: "#FF8C52",
  },
});
