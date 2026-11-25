/*
 * app.js - JavaScript que construye la interfaz
 *
 * Los NOMBRES de las funciones y sus parámetros no se cambian: el
 * verificador las llama así. Lo que hay dentro lo escribes tú.
 *
 * Las funciones de los issues #3 y #4 (crearCard, generarHTML, filtrar,
 * buscar, ordenar, aplicarFiltros) NO tocan el DOM: reciben datos y
 * devuelven datos o texto. Solo actualizarVista() e iniciar() usan document.
 *
 * Consulta:
 *   https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals
 *   https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
 *   https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 *   https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 *   https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
 *   https://es.javascript.info/array-methods
 */

// Estado de la interfaz: lo que la persona eligió en los controles.
const estado = {
  categoria: 'todas',
  texto: '',
  orden: 'nombre-asc'
};

/* ---------------------------------------------------------------
 * Issue #3 - Datos a tarjetas
 * --------------------------------------------------------------- */

function crearCard(item) {
  const valor = item[configuracion.campoOrden];
  const etiqueta = configuracion.etiquetaValor || configuracion.campoOrden;

  return `
    <div class="col">
      <article class="card rounded-0 border-0 h-100">
        <img src="${item.imagen}" class="card-img-top rounded-0" alt="Clase de ${item.nombre}">
        <div class="card-body d-flex flex-column">
          <span class="badge badge-categoria align-self-start mb-2">${item.categoria}</span>
          <h3 class="card-title h5">${item.nombre}</h3>
          <p class="card-text">${item.descripcion}</p>
          <p class="valor-clase mb-2">${etiqueta}: ${valor}</p>
          <p class="card-text small mb-1">Instructor: ${item.instructor}</p>
          <p class="card-text small mb-0">Nivel: ${item.nivel}</p>
        </div>
      </article>
    </div>
  `;
}

function generarHTML(lista) {
  if (!Array.isArray(lista) || lista.length === 0) {
    return `<p class="col-12">No hay resultados para la búsqueda o categoría seleccionada.</p>`;
  }
  return lista.map(crearCard).join("");
}

/* ---------------------------------------------------------------
 * Issue #4 - Filtrar, buscar y ordenar
 * Ninguna de estas funciones modifica la lista que recibe.
 * --------------------------------------------------------------- */

// TODO: devuelve solo los elementos de esa categoría.
// Si categoria es 'todas', devuelve todos.
function filtrarPorCategoria(lista, categoria) {

}

// TODO: devuelve los elementos cuyo nombre o descripcion contienen el
// texto, sin importar mayúsculas ni espacios al inicio o al final.
// Si el texto está vacío, devuelve todos.
function buscarPorTexto(lista, texto) {

}

// TODO: devuelve una COPIA ordenada según el criterio:
//   'nombre-asc'  A a Z por nombre (localeCompare)
//   'valor-asc'   de menor a mayor según item[configuracion.campoOrden]
//   'valor-desc'  de mayor a menor
function ordenarItems(lista, criterio) {

}

// TODO: aplica las tres funciones anteriores en cadena según el estado
// ({ categoria, texto, orden }) y devuelve la lista resultante.
function aplicarFiltros(lista, estadoActual) {

}

/* ---------------------------------------------------------------
 * Issue #4 - Eventos (estas sí usan el DOM)
 * --------------------------------------------------------------- */

// TODO: calcula la lista con aplicarFiltros(items, estado), pinta el
// resultado en #catalogo con innerHTML y actualiza #contador
// (por ejemplo "Mostrando 5 de 12 resultados").
function actualizarVista() {

}

// TODO: conecta los eventos y pinta por primera vez.
//   click  en cada botón con data-categoria: actualiza estado.categoria
//          y aria-pressed ("true" en el elegido, "false" en los demás)
//   input  en #buscador: actualiza estado.texto
//   change en #orden: actualiza estado.orden
// Después de cada cambio llama a actualizarVista().
function iniciar() {

}

// No cambies estas líneas: así el archivo también carga en el verificador,
// donde no existe document.
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', iniciar);
}
