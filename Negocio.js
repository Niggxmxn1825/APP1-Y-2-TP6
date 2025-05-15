import {
  obtenerProductos,
  guardarProducto,
  eliminarProductoPorID,
  actualizarProducto
} from './Datos.js';

let productoEditandoID = null;

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("nombre").disabled = false;
  document.querySelector("button").textContent = "Agregar";
  productoEditandoID = null;
}

window.agregarProducto = function () {
  const nombre = document.getElementById('nombre').value.trim();
  const descripcion = document.getElementById('descripcion').value.trim();
  const precio = document.getElementById('precio').value.trim();

  if (!nombre || !descripcion || !precio) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  if (isNaN(precio) || parseFloat(precio) < 0) {
    alert("El precio debe ser un número positivo.");
    return;
  }

  const productos = obtenerProductos();

  if (productoEditandoID !== null) {
    if (
      productos.some(p => p.nombre === nombre && p.id !== productoEditandoID)
    ) {
      alert("Ya existe otro producto con ese nombre.");
      return;
    }

    actualizarProducto({
      id: productoEditandoID,
      nombre,
      descripcion,
      precio: parseFloat(precio)
    });
  } else {
    if (productos.some(p => p.nombre === nombre)) {
      alert("Ya existe un producto con ese nombre.");
      return;
    }

    guardarProducto({ nombre, descripcion, precio: parseFloat(precio) });
  }

  limpiarFormulario();
  mostrarProductos();
}

window.eliminarProducto = function (id) {
  if (confirm("¿Seguro que deseas eliminar este producto?")) {
    eliminarProductoPorID(id);
    mostrarProductos();
    limpiarFormulario();
  }
}

window.editarProducto = function (id) {
  const producto = obtenerProductos().find(p => p.id === id);
  if (!producto) return;

  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("descripcion").value = producto.descripcion;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("nombre").disabled = true;

  productoEditandoID = id;
  document.querySelector("button").textContent = "Actualizar";
}

window.mostrarProductos = function () {
  const productos = obtenerProductos();
  const tbody = document.getElementById("tablaProductos");
  tbody.innerHTML = "";

  for (const producto of productos) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${escapeHTML(producto.nombre)}</td>
      <td>${escapeHTML(producto.descripcion)}</td>
      <td>$${escapeHTML(producto.precio.toString())}</td>
      <td>
        <button onclick="editarProducto(${producto.id})">Editar</button>
        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  }
}

mostrarProductos();
