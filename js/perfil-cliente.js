verificarSesion();

// =====================================
// ELEMENTOS DEL HTML
// =====================================

const nombreCliente =
  document.getElementById(
    "nombreCliente"
  );

const kitCliente =
  document.getElementById(
    "kitCliente"
  );

const telefonoCliente =
  document.getElementById(
    "telefonoCliente"
  );

const correoCliente =
  document.getElementById(
    "correoCliente"
  );

const planCliente =
  document.getElementById(
    "planCliente"
  );

const precioCliente =
  document.getElementById(
    "precioCliente"
  );

const cantidadCliente =
  document.getElementById(
    "cantidadCliente"
  );

const btnGenerarFactura =
  document.getElementById(
    "btnGenerarFactura"
  );

const btnVerRecibos =
  document.getElementById(
    "btnVerRecibos"
  );


// =====================================
// CLIENTE ACTUAL
// =====================================

let clienteActual = null;


// =====================================
// INICIAR PÁGINA
// =====================================

document.addEventListener(
  "DOMContentLoaded",
  inicializarPerfilCliente
);


// =====================================
// INICIALIZAR PERFIL
// =====================================

function inicializarPerfilCliente() {

  cargarPerfilCliente();

  configurarEventos();

}


// =====================================
// CONFIGURAR EVENTOS
// =====================================

function configurarEventos() {

  // ==========================
  // NUEVO RECIBO
  // ==========================

  if (btnGenerarFactura) {

    btnGenerarFactura.addEventListener(
      "click",
      generarFactura
    );

  }

  // ==========================
  // VER RECIBOS
  // ==========================

  if (btnVerRecibos) {

    btnVerRecibos.addEventListener(
      "click",
      verRecibosCliente
    );

  }

}


// =====================================
// CARGAR PERFIL DEL CLIENTE
// =====================================

async function cargarPerfilCliente() {

  try {

    // Obtener parámetros de la URL

    const parametros =
      new URLSearchParams(
        window.location.search
      );

    // Obtener KIT enviado desde Clientes

    const kit =
      parametros.get(
        "kit"
      );

    // Validar parámetro

    if (!kit) {

      alert(
        "No se recibió el KIT del cliente."
      );

      return;

    }

    // Consultar backend

    const respuesta =
      await apiObtenerClientePorKit(
        kit
      );

    // Validar respuesta

    if (!respuesta.success) {

      alert(
        respuesta.error ||
        "No se pudo obtener el cliente."
      );

      return;

    }

    // Guardar cliente cargado

    clienteActual =
      respuesta.cliente;

    // Mostrar información

    mostrarDatosCliente();

  }
  catch (error) {

    console.error(
      "Error al cargar perfil:",
      error
    );

    alert(
      "Error al cargar el perfil del cliente."
    );

  }

}


// =====================================
// MOSTRAR DATOS DEL CLIENTE
// =====================================

function mostrarDatosCliente() {

  if (!clienteActual) {

    return;

  }

  nombreCliente.textContent =
    clienteActual.nombre || "";

  kitCliente.textContent =
    clienteActual.kit || "";

  telefonoCliente.textContent =
    clienteActual.telefono || "";

  correoCliente.textContent =
    clienteActual.correo || "";

  planCliente.textContent =
    clienteActual.plan || "";

  precioCliente.textContent =
    clienteActual.precioUSD || 0;

  cantidadCliente.textContent =
    clienteActual.cantidad || 1;

}


// =====================================
// NUEVO RECIBO
// =====================================

function generarFactura() {

  if (!clienteActual) {

    alert(
      "No se pudo obtener la información del cliente."
    );

    return;

  }

  window.location.href =
    `nueva-factura.html?kit=${encodeURIComponent(
      clienteActual.kit
    )}`;

}


// =====================================
// VER RECIBOS
// =====================================

function verRecibosCliente() {

  if (!clienteActual) {

    alert(
      "No se pudo obtener la información del cliente."
    );

    return;

  }

  window.location.href =
    `facturas-cliente.html?kit=${encodeURIComponent(
      clienteActual.kit
    )}`;

}