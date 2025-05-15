const CLAVE_STORAGE = "productos";

// Obtener todos los productos
export function obtenerProductos() {
  const datos = localStorage.getItem(CLAVE_STORAGE);
  return datos ? JSON.parse(datos) : [];
}

// Guardar un nuevo producto
export function guardarProducto(producto) {
  const productos = obtenerProductos();
  const id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
  const nuevoProducto = { ...producto, id };
  productos.push(nuevoProducto);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos));
}

// Eliminar producto por ID
export function eliminarProductoPorID(id) {
  const productos = obtenerProductos().filter(p => p.id !== id);
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos));
}

// Actualizar producto por ID
export function actualizarProducto(productoActualizado) {
  const productos = obtenerProductos().map(p =>
    p.id === productoActualizado.id ? productoActualizado : p
  );
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(productos));
}
