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

function filtrarPorCategoria(lista, categoria) {
  if (!categoria || categoria === "todas") {
    return [...lista];
  }
  return lista.filter((item) => item.categoria === categoria);
}

function buscarPorTexto(lista, texto) {
  const termino = (texto || "").trim().toLowerCase();
  if (!termino) {
    return [...lista];
  }
  return lista.filter((item) => {
    const nombre = (item.nombre || "").toLowerCase();
    const descripcion = (item.descripcion || "").toLowerCase();
    return nombre.includes(termino) || descripcion.includes(termino);
  });
}

function ordenarItems(lista, criterio) {
  const copia = [...lista];
  const campo = configuracion.campoOrden;

  if (criterio === "nombre-asc") {
    return copia.sort((a, b) => a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" }));
  }
  if (criterio === "valor-asc") {
    return copia.sort((a, b) => Number(a[campo]) - Number(b[campo]));
  }
  if (criterio === "valor-desc") {
    return copia.sort((a, b) => Number(b[campo]) - Number(a[campo]));
  }
  return copia;
}

function aplicarFiltros(lista, estadoActual) {
  const porCategoria = filtrarPorCategoria(lista, estadoActual.categoria);
  const porTexto = buscarPorTexto(porCategoria, estadoActual.texto);
  return ordenarItems(porTexto, estadoActual.orden);
}

function actualizarVista() {
  const contenedor = document.getElementById("catalogo");
  const contador = document.getElementById("contador");
  const filtrados = aplicarFiltros(items, estado);

  if (contenedor) {
    contenedor.innerHTML = generarHTML(filtrados);
  }
  if (contador) {
    contador.textContent = `Mostrando ${filtrados.length} de ${items.length}`;
  }
}

function iniciar() {
  const botonesFiltro = document.querySelectorAll("[data-categoria]");
  const inputBuscador = document.getElementById("buscador");
  const selectOrden = document.getElementById("orden");

  botonesFiltro.forEach((boton) => {
    boton.addEventListener("click", () => {
      estado.categoria = boton.dataset.categoria;
      botonesFiltro.forEach((btn) => {
        const seleccionado = btn === boton;
        btn.setAttribute("aria-pressed", seleccionado ? "true" : "false");
        btn.classList.toggle("active", seleccionado);
      });
      actualizarVista();
    });
  });

  if (inputBuscador) {
    inputBuscador.addEventListener("input", (evento) => {
      estado.texto = evento.target.value;
      actualizarVista();
    });
  }

  if (selectOrden) {
    selectOrden.addEventListener("change", (evento) => {
      estado.orden = evento.target.value;
      actualizarVista();
    });
  }

  actualizarVista();
}

document.addEventListener("DOMContentLoaded", iniciar);