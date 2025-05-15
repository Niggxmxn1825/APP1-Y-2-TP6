import {
  obtenerPersonas,
  guardarPersona,
  eliminarPersonaPorID,
  actualizarPersona
} from './CapadeDatos.js';

let idEditando = null;

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("edad").value = "";
  document.querySelector("button").textContent = "Agregar";
  idEditando = null;
}

window.agregarPersona = function () {
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const edad = document.getElementById('edad').value.trim();

  if (!nombre || !apellido || !edad) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (!/^\d+$/.test(edad)) {
    alert("La edad debe ser un número.");
    return;
  }

  if (idEditando) {
    actualizarPersona({ id: idEditando, nombre, apellido, edad });
  } else {
    guardarPersona({ nombre, apellido, edad });
  }

  limpiarFormulario();
  mostrarPersonas();
};

window.eliminarPersona = function (id) {
  if (confirm("¿Seguro que deseas eliminar esta persona?")) {
    eliminarPersonaPorID(id);
    mostrarPersonas();
    limpiarFormulario();
  }
};

window.editarPersona = function (id) {
  const persona = obtenerPersonas().find(p => p.id === id);
  if (!persona) return;

  document.getElementById("nombre").value = persona.nombre;
  document.getElementById("apellido").value = persona.apellido;
  document.getElementById("edad").value = persona.edad;

  idEditando = persona.id;
  document.querySelector("button").textContent = "Actualizar";
};

window.mostrarPersonas = function () {
  const personas = obtenerPersonas();
  const tbody = document.getElementById("tablaPersonas");
  tbody.innerHTML = "";

  for (const persona of personas) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${escapeHTML(persona.nombre)}</td>
      <td>${escapeHTML(persona.apellido)}</td>
      <td>${escapeHTML(persona.edad)}</td>
      <td>
        <button onclick="editarPersona(${persona.id})">Editar</button>
        <button onclick="eliminarPersona(${persona.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  }
};

mostrarPersonas();
