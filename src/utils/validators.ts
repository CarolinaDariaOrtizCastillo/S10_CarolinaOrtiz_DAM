export type HabitacionOption = {
  id: string;
  nombre: string;
  precio: number;
};

export const opcionesHabitacion: HabitacionOption[] = [
  { id: "estandar", nombre: "Estándar", precio: 250 },
  { id: "deluxe", nombre: "Deluxe / Superior", precio: 280 },
  { id: "junior", nombre: "Junior Suite", precio: 300 },
  { id: "suite", nombre: "Suite", precio: 400 },
  { id: "presidencial", nombre: "Suite Presidencial", precio: 600 },
];

export function validarNombre(nombre: string) {
  return nombre.trim().length >= 2;
}

export function validarApellido(apellido: string) {
  return apellido.trim().length >= 2;
}

export function validarCorreo(correo: string) {
  const valor = correo.trim();
  return valor.includes("@") && valor.length > 1;
}

export function validarHabitacion(habitacion: string | null) {
  return Boolean(habitacion && habitacion.trim().length > 0);
}

export function validarFecha(fecha: string) {
  const valor = fecha.trim();

  if (!/^\d{2}[/-]\d{2}[/-]\d{4}$/.test(valor)) {
    return false;
  }

  const [dia, mes, anio] = valor.replace(/-/g, "/").split("/").map(Number);
  const fechaValida = new Date(anio, mes - 1, dia);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const fechaIngresada = new Date(anio, mes - 1, dia);
  fechaIngresada.setHours(0, 0, 0, 0);

  const esFechaValida =
    fechaValida.getFullYear() === anio &&
    fechaValida.getMonth() === mes - 1 &&
    fechaValida.getDate() === dia;

  return esFechaValida && fechaIngresada >= hoy;
}

export function validarMotivo(motivo: string) {
  return motivo.trim().length > 10;
}
