// =====================================
// URL DE LA WEB APP
// =====================================

const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbx7r0o74wgFEqe8TUpjGAfpyMxmk-flniI6FTdbu4GBHKpb9AdTr-Ljjq-hd8APzs8HWg/exec";


// =====================================
// OBTENER CLIENTES
// =====================================

async function apiObtenerClientes() {

  const respuesta =
    await fetch(
      `${WEB_APP_URL}?accion=obtenerClientes`
    );

  const datos =
    await respuesta.json();

  if (datos.error) {
    throw new Error(
      datos.error
    );
  }

  return datos;

}


// =====================================
// CREAR CLIENTE
// =====================================

async function apiCrearCliente(
  cliente
) {

  const respuesta =
    await fetch(
      WEB_APP_URL,
      {
        method: "POST",

        body: JSON.stringify({

          accion:
            "crearCliente",

          cliente

        })
      }
    );

  const datos =
    await respuesta.json();

  if (datos.error) {
    throw new Error(
      datos.error
    );
  }

  return datos;

}


// =====================================
// ACTUALIZAR CLIENTE
// =====================================

async function apiActualizarCliente(
  kitOriginal,
  cliente
) {

  const respuesta =
    await fetch(
      WEB_APP_URL,
      {
        method: "POST",

        body: JSON.stringify({

          accion:
            "actualizarCliente",

          kitOriginal,

          cliente

        })
      }
    );

  const datos =
    await respuesta.json();

  if (datos.error) {
    throw new Error(
      datos.error
    );
  }

  return datos;

}


// =====================================
// ELIMINAR CLIENTE
// =====================================

async function apiEliminarCliente(
  kit
) {

  const respuesta =
    await fetch(
      WEB_APP_URL,
      {
        method: "POST",

        body: JSON.stringify({

          accion:
            "eliminarCliente",

          kit

        })
      }
    );

  const datos =
    await respuesta.json();

  if (datos.error) {
    throw new Error(
      datos.error
    );
  }

  return datos;

}


// =====================================
// OBTENER CONFIGURACIÓN
// =====================================

async function obtenerConfiguracionAPI() {

  const respuesta =
    await fetch(
      `${WEB_APP_URL}?accion=obtenerConfiguracion`
    );

  const datos =
    await respuesta.json();

  if (datos.error) {
    throw new Error(
      datos.error
    );
  }

  return datos;

}


// =====================================
// GUARDAR CONFIGURACIÓN
// =====================================

async function guardarConfiguracionAPI(
  configuracion
) {

  const respuesta =
    await fetch(
      WEB_APP_URL,
      {
        method: "POST",

        body: JSON.stringify({

          accion:
            "guardarConfiguracion",

          configuracion

        })
      }
    );

  const datos =
    await respuesta.json();

  if (datos.error) {
    throw new Error(
      datos.error
    );
  }

  return datos;

}


// =====================================
// OBTENER CLIENTE POR KIT
// =====================================

async function apiObtenerClientePorKit(
  kit
) {

  const respuesta =
    await fetch(
      `${WEB_APP_URL}?accion=obtenerClientePorKit&kit=${encodeURIComponent(
        kit
      )}`
    );

  const datos =
    await respuesta.json();

  if (datos.error) {
    throw new Error(
      datos.error
    );
  }

  return datos;

}


// =====================================
// CREAR FACTURA
// =====================================

async function apiCrearFactura(
  factura
) {

  const respuesta =
    await fetch(
      WEB_APP_URL,
      {
        method: "POST",

        body: JSON.stringify({

          accion:
            "crearFactura",

          factura

        })
      }
    );

  const datos =
    await respuesta.json();

  if (datos.error) {
    throw new Error(
      datos.error
    );
  }

  return datos;

}


// =====================================
// OBTENER FACTURA POR ID
// =====================================

async function apiObtenerFacturaPorId(
  idFactura
) {

  const respuesta =
    await fetch(
      `${WEB_APP_URL}?accion=obtenerFacturaPorId&id=${encodeURIComponent(
        idFactura
      )}`
    );

  const datos =
    await respuesta.json();

  if (datos.error) {
    throw new Error(
      datos.error
    );
  }

  return datos;

}


// =====================================
// OBTENER FACTURAS POR KIT
// =====================================

async function apiObtenerFacturasPorKit(
  kit
) {

  const respuesta =
    await fetch(
      `${WEB_APP_URL}?accion=obtenerFacturasPorKit&kit=${encodeURIComponent(
        kit
      )}`
    );

  const datos =
    await respuesta.json();

  if (datos.error) {

    throw new Error(
      datos.error
    );

  }

  return datos;

}


// =====================================
// ACTUALIZAR ESTADO FACTURA
// =====================================

async function apiActualizarEstadoFactura(
  idFactura,
  estado
) {

  const respuesta =
    await fetch(
      WEB_APP_URL,
      {
        method: "POST",

        body: JSON.stringify({

          accion:
            "actualizarEstadoFactura",

          idFactura,

          estado

        })
      }
    );

  const datos =
    await respuesta.json();

  if (datos.error) {

    throw new Error(
      datos.error
    );

  }

  return datos;

}

// =====================================
// VALIDAR LOGIN
// =====================================

async function apiValidarLogin(
  correo,
  clave
) {

  const respuesta =
    await fetch(
      WEB_APP_URL,
      {
        method: "POST",

        body: JSON.stringify({

          accion:
            "validarLogin",

          correo,

          clave

        })
      }
    );

  const datos =
    await respuesta.json();

  if (datos.error) {

    throw new Error(
      datos.error
    );

  }

  return datos;

}