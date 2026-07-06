verificarSesion();

// =====================================
// ELEMENTOS DEL CLIENTE
// =====================================

const inputNombreCliente =
  document.getElementById(
    "nombreCliente"
  );

const inputKitCliente =
  document.getElementById(
    "kitCliente"
  );

const inputTelefonoCliente =
  document.getElementById(
    "telefonoCliente"
  );

const inputCorreoCliente =
  document.getElementById(
    "correoCliente"
  );

const inputPlanCliente =
  document.getElementById(
    "planCliente"
  );


// =====================================
// ELEMENTOS DEL FORMULARIO
// =====================================

const inputDescripcion =
  document.getElementById(
    "descripcion"
  );

const inputPrecioUSD =
  document.getElementById(
    "precioUSD"
  );

const inputCantidad =
  document.getElementById(
    "cantidad"
  );

const inputFecha =
  document.getElementById(
    "fecha"
  );

const inputTasa =
  document.getElementById(
    "tasa"
  );

const inputTotalUSD =
  document.getElementById(
    "totalUSD"
  );

const inputTotalBs =
  document.getElementById(
    "totalBs"
  );


// =====================================
// BOTONES
// =====================================

const btnVolverPerfil =
  document.getElementById(
    "btnVolverPerfil"
  );

const btnRegistrarFactura =
  document.getElementById(
    "btnRegistrarFactura"
  );

const btnVerRecibo =
  document.getElementById(
    "btnVerRecibo"
  );


// =====================================
// ID DE FACTURA
// =====================================

let idFacturaActual =
  "";


// =====================================
// CLIENTE ACTUAL
// =====================================

let clienteActual =
  null;


// =====================================
// VALORES INICIALES
// =====================================

inputTotalUSD.value =
  "0.00";

inputTotalBs.value =
  "0.00";


// =====================================
// FECHA ACTUAL
// =====================================

function colocarFechaActual() {

  const hoy =
    new Date();

  const dia =
    String(
      hoy.getDate()
    ).padStart(
      2,
      "0"
    );

  const mes =
    String(
      hoy.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const anio =
    hoy.getFullYear();

  inputFecha.value =
    `${dia}/${mes}/${anio}`;

}


// =====================================
// CARGAR TASA
// =====================================

async function cargarTasa() {

  try {

    const configuracion =
      await obtenerConfiguracionAPI();

    inputTasa.value =
      Number(
        configuracion.tasaDia
      ) || 0;

  }
  catch (error) {

    console.error(
      error
    );

    alert(
      "Error al cargar la tasa."
    );

  }

}


// =====================================
// CARGAR CLIENTE
// =====================================

async function cargarCliente() {

  try {

    const parametros =
      new URLSearchParams(
        window.location.search
      );

    const kit =
      parametros.get(
        "kit"
      );

    if (!kit) {

      alert(
        "No se recibió el KIT del cliente."
      );

      return;

    }

    const respuesta =
      await apiObtenerClientePorKit(
        kit
      );

    if (
      !respuesta.success
    ) {

      alert(
        respuesta.error
      );

      return;

    }

    clienteActual =
      respuesta.cliente;

    inputNombreCliente.value =
      clienteActual.nombre || "";

    inputKitCliente.value =
      clienteActual.kit || "";

    inputTelefonoCliente.value =
      clienteActual.telefono || "";

    inputCorreoCliente.value =
      clienteActual.correo || "";

    inputPlanCliente.value =
      clienteActual.plan || "";

    inputDescripcion.value =
      clienteActual.descripcion || "";

    inputPrecioUSD.value =
      clienteActual.precioUSD || 0;

    inputCantidad.value =
      clienteActual.cantidad || 1;

  }
  catch (error) {

    console.error(
      error
    );

    alert(
      "Error al cargar el cliente."
    );

  }

}


// =====================================
// CALCULAR TOTALES
// =====================================

function calcularTotales() {

  const precioUSD =
    Number(
      inputPrecioUSD.value
    ) || 0;

  const cantidad =
    Number(
      inputCantidad.value
    ) || 0;

  const tasa =
    Number(
      inputTasa.value
    ) || 0;

  const totalUSD =
    precioUSD *
    cantidad;

  const totalBs =
    totalUSD *
    tasa;

  inputTotalUSD.value =
    totalUSD.toFixed(
      2
    );

  inputTotalBs.value =
    totalBs.toLocaleString(
      "es-VE",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );

}


// =====================================
// CAMBIO PRECIO
// =====================================

inputPrecioUSD.addEventListener(
  "input",
  () => {

    if (
      Number(
        inputPrecioUSD.value
      ) < 0
    ) {

      inputPrecioUSD.value =
        0;

    }

    calcularTotales();

  }
);


// =====================================
// CAMBIO CANTIDAD
// =====================================

inputCantidad.addEventListener(
  "input",
  () => {

    if (
      Number(
        inputCantidad.value
      ) < 1
    ) {

      inputCantidad.value =
        1;

    }

    calcularTotales();

  }
);


// =====================================
// VOLVER AL PERFIL
// =====================================

btnVolverPerfil
  .addEventListener(
    "click",
    () => {

      window.location.href =
        `perfil-cliente.html?kit=${encodeURIComponent(
          inputKitCliente.value
        )}`;

    }
  );


// =====================================
// REGISTRAR RECIBO
// =====================================

btnRegistrarFactura
  .addEventListener(
    "click",
    async () => {

      try {

        if (
          !inputDescripcion.value.trim()
        ) {

          alert(
            "Debe ingresar una descripción."
          );

          return;

        }

        const confirmar =
          confirm(
            "¿Desea registrar este recibo?\n\nUna vez registrado no podrá eliminarse."
          );

        if (!confirmar) {

          return;

        }

        const factura = {

          fecha:
            inputFecha.value,

          kit:
            inputKitCliente.value,

          nombre_cliente:
            inputNombreCliente.value,

          telefono:
            inputTelefonoCliente.value,

          correo:
            inputCorreoCliente.value,

          plan:
            inputPlanCliente.value,

          descripcion:
            inputDescripcion.value.trim(),

          precio_usd:
            Number(
              inputPrecioUSD.value
            ) || 0,

          cantidad:
            Number(
              inputCantidad.value
            ) || 1,

          monto_usd:
            Number(
              inputTotalUSD.value
            ) || 0,

          tasa_dia:
            Number(
              inputTasa.value
            ) || 0,

          monto_bs:
            Number(
              inputTotalBs.value
                .replaceAll(".", "")
                .replace(",", ".")
            ) || 0,

          estado:
            "Pendiente"

        };

        const respuesta =
          await apiCrearFactura(
            factura
          );

        if (
          !respuesta.success
        ) {

          alert(
            respuesta.error ||
            "No se pudo registrar el recibo."
          );

          return;

        }

        idFacturaActual =
          respuesta.idFactura;

        alert(
          `Recibo registrado correctamente.\n\nID: ${idFacturaActual}`
        );

        btnRegistrarFactura.disabled =
          true;

        btnVerRecibo.style.display =
          "inline-block";

      }
      catch (error) {

        console.error(
          error
        );

        alert(
          "Error al registrar el recibo."
        );

      }

    }
  );


// =====================================
// SIGUIENTE
// =====================================

btnVerRecibo
  .addEventListener(
    "click",
    () => {

      if (
        !idFacturaActual
      ) {

        alert(
          "Primero debe registrar el recibo."
        );

        return;

      }

      window.location.href =
    `vista-factura.html?idFactura=${encodeURIComponent(
     idFacturaActual
     )}`;

    }
  );


// =====================================
// INICIAR
// =====================================

async function iniciarNuevaFactura() {

  colocarFechaActual();

  await cargarTasa();

  await cargarCliente();

  calcularTotales();

}

iniciarNuevaFactura();