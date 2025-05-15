const CLAVE_STORAGE = "personas";

export function obtenerPersonas() {
  const datos = localStorage.getItem(CLAVE_STORAGE);
  return datos ? JSON.parse(datos) : [];
}

export function guardarPersona(persona) {
  const personas = obtenerPersonas();
  const id = personas.length > 0 ? personas[personas.length - 1].id + 1 : 1;
  const nuevaPersona = { ...persona, id };
  personas.push(nuevaPersona);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(personas));
}

export function eliminarPersonaPorID(id) {
  const personas = obtenerPersonas().filter(p => p.id !== id);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(personas));
}

export function actualizarPersona(personaActualizada) {
  const personas = obtenerPersonas().map(p =>
    p.id === personaActualizada.id ? personaActualizada : p
  );
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(personas));
}
