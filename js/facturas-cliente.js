verificarSesion();

// =====================================
// VARIABLES GLOBALES
// =====================================

let kitCliente = "";


// =====================================
// ELEMENTOS DEL DOM
// =====================================

const spanKit =
  document.getElementById(
    "kitCliente"
  );

const tbodyRecibos =
  document.getElementById(
    "tbodyRecibos"
  );

const mensajeCarga =
  document.getElementById(
    "mensajeCarga"
  );

const sinRecibos =
  document.getElementById(
    "sinRecibos"
  );

const contenedorTabla =
  document.getElementById(
    "contenedorTabla"
  );

const btnVolver =
  document.getElementById(
    "btnVolver"
  );


// =====================================
// INICIALIZAR
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  iniciarPantalla
);


// =====================================
// INICIAR PANTALLA
// =====================================

async function iniciarPantalla() {

  try {

    // ==========================
    // OBTENER KIT DESDE URL
    // ==========================

    const parametros =
      new URLSearchParams(
        window.location.search
      );

    kitCliente =
      parametros.get("kit");

    if (!kitCliente) {

      throw new Error(
        "No se recibió el KIT del cliente."
      );

    }

    // Mostrar KIT
    spanKit.textContent =
      kitCliente;

    // Configurar botón volver
    configurarBotonVolver();

    // Cargar historial
    await cargarRecibos();

  }

  catch (error) {

    console.error(error);

    mensajeCarga.innerHTML =
      `<p>${error.message}</p>`;

  }

}


// =====================================
// BOTÓN VOLVER
// =====================================

function configurarBotonVolver() {

  btnVolver.addEventListener(
    "click",
    () => {

      window.location.href =
        `perfil-cliente.html?kit=${encodeURIComponent(
          kitCliente
        )}`;

    }
  );

}


// =====================================
// CARGAR RECIBOS
// =====================================

async function cargarRecibos() {

  try {

    mensajeCarga.classList.remove(
      "oculto"
    );

    const respuesta =
      await apiObtenerFacturasPorKit(
        kitCliente
      );

    const facturas =
      respuesta.facturas || [];

    mensajeCarga.classList.add(
      "oculto"
    );

    // ==========================
    // SIN RECIBOS
    // ==========================

    if (
      facturas.length === 0
    ) {

      contenedorTabla.classList.add(
        "oculto"
      );

      sinRecibos.classList.remove(
        "oculto"
      );

      return;

    }

    // ==========================
    // MOSTRAR TABLA
    // ==========================

    renderizarTabla(
      facturas
    );

  }

  catch (error) {

    console.error(error);

    mensajeCarga.innerHTML =
      `<p>Error: ${error.message}</p>`;

  }

}


// =====================================
// RENDERIZAR TABLA
// =====================================

function renderizarTabla(
  facturas
) {

  tbodyRecibos.innerHTML = "";

  facturas.forEach(
    (factura) => {

      const fila =
        document.createElement(
          "tr"
        );

      fila.innerHTML = `

        <td class="col-recibo">
          ${factura.id_factura || ""}
        </td>

        <td>
          ${factura.fecha || ""}
        </td>

        <td>
          ${factura.descripcion || ""}
        </td>

        <td class="col-monto">
          $${Number(
            factura.monto_usd || 0
          ).toFixed(2)}
        </td>

        <td>

          <select
            class="select-estado"
            data-id="${factura.id_factura}">

            <option
              value="Pendiente"
              ${factura.estado === "Pendiente"
                ? "selected"
                : ""}>

              Pendiente

            </option>

            <option
              value="Pagada"
              ${factura.estado === "Pagada"
                ? "selected"
                : ""}>

              Pagada

            </option>

            <option
              value="Cancelada"
              ${factura.estado === "Cancelada"
                ? "selected"
                : ""}>

              Cancelada

            </option>

          </select>

        </td>

        <td>

          <button
            class="btn-ver"
            data-id="${factura.id_factura}">

            Ver Recibo

          </button>

        </td>

      `;

      tbodyRecibos.appendChild(
        fila
      );

    }
  );

  configurarBotonesVer();

  configurarEstados();

}


// =====================================
// BOTONES VER RECIBO
// =====================================

function configurarBotonesVer() {

  const botones =
    document.querySelectorAll(
      ".btn-ver"
    );

  botones.forEach(
    (boton) => {

      boton.addEventListener(
        "click",
        () => {

          const idFactura =
            boton.dataset.id;

          window.location.href =
            `vista-factura.html?idFactura=${encodeURIComponent(
              idFactura
            )}`;

        }
      );

    }
  );

}


// =====================================
// CAMBIAR ESTADO
// =====================================

function configurarEstados() {

  const selects =
    document.querySelectorAll(
      ".select-estado"
    );

  selects.forEach(
    (select) => {

      actualizarColorEstado(
        select
      );

      select.addEventListener(
        "change",
        async () => {

          const idFactura =
            select.dataset.id;

          const nuevoEstado =
            select.value;

          try {

            select.disabled = true;

            await apiActualizarEstadoFactura(
              idFactura,
              nuevoEstado
            );

            actualizarColorEstado(
              select
            );

          }

          catch (error) {

            alert(
              "No se pudo actualizar el estado."
            );

            console.error(
              error
            );

          }

          finally {

            select.disabled = false;

          }

        }
      );

    }
  );

}


// =====================================
// COLOR SEGÚN ESTADO
// =====================================

function actualizarColorEstado(
  select
) {

  select.classList.remove(
    "estado-pendiente",
    "estado-pagada",
    "estado-cancelada"
  );

  switch (
    select.value
  ) {

    case "Pendiente":

      select.classList.add(
        "estado-pendiente"
      );

      break;

    case "Pagada":

      select.classList.add(
        "estado-pagada"
      );

      break;

    case "Cancelada":

      select.classList.add(
        "estado-cancelada"
      );

      break;

  }

}