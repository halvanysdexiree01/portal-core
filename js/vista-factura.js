verificarSesion();

/* =====================================
   VARIABLES GLOBALES
===================================== */

// Aquí se almacena la factura traída desde Google Sheets
let reciboActual = null;

// Control del zoom del documento
let nivelZoom = 1;

/* =====================================
   INICIO DE LA PÁGINA
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    iniciarVistaRecibo
);

/* =====================================
   INICIALIZAR VISTA
===================================== */

async function iniciarVistaRecibo() {

    // Configuro botones y eventos UI
    configurarEventos();

    // Carga información de pagos desde configuración
    await cargarInformacionPagos();

    // Cargo la factura desde la URL
    await cargarReciboPorId();
}

/* =====================================
   CONFIGURACIÓN DE EVENTOS
===================================== */

function configurarEventos() {

    document.getElementById("btnVolver")
        .addEventListener("click", volverPerfil);


    document.getElementById("btnZoomMas")
        .addEventListener("click", aumentarZoom);

    document.getElementById("btnZoomMenos")
        .addEventListener("click", disminuirZoom);

    document.getElementById("btnPdf")
        .addEventListener("click", prepararPdf);

    document.getElementById("btnPng")
    .addEventListener("click", prepararPng);
}

/* =====================================
   OBTENER ID FACTURA DESDE URL
===================================== */

function obtenerIdFactura() {

    const params = new URLSearchParams(
        window.location.search
    );

    return params.get("idFactura");
}

/* =====================================
   CARGAR RECIBO DESDE BACKEND
===================================== */

async function cargarReciboPorId() {

    try {

        const idFactura = obtenerIdFactura();

        if (!idFactura) {
            mostrarErrorRecibo();
            return;
        }

        const respuesta =
            await apiObtenerFacturaPorId(
                idFactura
            );

        if (!respuesta.success) {
            mostrarErrorRecibo();
            return;
        }

        // Guarda factura actual
        reciboActual = respuesta.factura;

        // Pinta datos en pantalla
        cargarRecibo();

        // Activa botones de descarga
document.getElementById("btnPdf").disabled = false;
document.getElementById("btnPng").disabled = false;

    } catch (error) {

        console.error("Error cargando recibo:", error);

        mostrarErrorRecibo();
    }
}

/* =====================================
   RENDER GENERAL
===================================== */

function cargarRecibo() {

    cargarEncabezado();
    cargarCliente();
    cargarServicio();
    cargarTotales();
}

/* =====================================
   ENCABEZADO
===================================== */

function cargarEncabezado() {

    document.getElementById("fechaRecibo")
        .textContent = reciboActual.fecha || "";

    document.getElementById("idFactura")
        .textContent = reciboActual.id_factura || "";
}

/* =====================================
   CLIENTE
===================================== */

function cargarCliente() {

    document.getElementById("nombreCliente")
        .textContent = reciboActual.nombre_cliente || "";

    document.getElementById("kitCliente")
        .textContent = reciboActual.kit || "";

    document.getElementById("telefonoCliente")
        .textContent = reciboActual.telefono || "";

    document.getElementById("correoCliente")
        .textContent = reciboActual.correo || "";

    document.getElementById("planCliente")
        .textContent = reciboActual.plan || "";
}

/* =====================================
   SERVICIO
===================================== */

function cargarServicio() {

    document.getElementById("descripcionServicio")
        .textContent = reciboActual.descripcion || "";

    document.getElementById("precioUSD")
        .textContent =
        "$ " + Number(reciboActual.precio_usd || 0)
            .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

    document.getElementById("cantidadServicio")
        .textContent = reciboActual.cantidad || 0;

    document.getElementById("totalUSD")
        .textContent =
        "$ " + Number(reciboActual.monto_usd || 0)
            .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
}

/* =====================================
   TOTALES
===================================== */

function cargarTotales() {

    document.getElementById("resumenUSD")
        .textContent =
        "$ " + Number(reciboActual.monto_usd || 0)
            .toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

    document.getElementById("totalBs")
        .textContent =
        "Bs " + Number(reciboActual.monto_bs || 0)
            .toLocaleString("es-VE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

    document.getElementById("tasaDia")
        .textContent =
        Number(reciboActual.tasa_dia || 0)
            .toLocaleString("es-VE", {
               minimumFractionDigits: 2,
              maximumFractionDigits: 2
           }) + " Bs/USD";
}

/* =====================================
   INFORMACIÓN DE PAGO
===================================== */

async function cargarInformacionPagos() {

    const contenedor =
        document.getElementById("informacionPagos");

    contenedor.innerHTML = "Cargando información de pago...";

    try {

        const config =
            await obtenerConfiguracionAPI();

        contenedor.innerHTML =
    (config.informacionPagos || "")
        .replace(/\n/g, "<br>");

    } catch (error) {

        console.error(error);

        contenedor.innerHTML =
            "No se pudo cargar la información de pago.";
    }
}

/* =====================================
   VOLVER
===================================== */

function volverPerfil() {

    if (!reciboActual) {
        window.location.href = "clientes.html";
        return;
    }

    window.location.href =
        `perfil-cliente.html?kit=${reciboActual.kit}`;
}

/* =====================================
   GUARDAR
===================================== */

function prepararGuardar() {

    console.log("Preparado para guardar recibo");

    alert(
        `Recibo ${reciboActual?.id_factura || ""} listo para registro final.`
    );
}

/* =====================================
   PDF
===================================== */

function prepararPdf() {

    if (typeof descargarReciboPDF !== "function") {

        alert(
            "No se pudo cargar el módulo de exportación PDF."
        );

        return;
    }

    descargarReciboPDF();
}

/* =====================================
   PNG
===================================== */

function prepararPng() {

    // Verifico que exista el módulo PNG
    if (typeof descargarReciboPNG !== "function") {

        alert(
            "No se pudo cargar el módulo de exportación PNG."
        );

        return;
    }

    // Ejecuta la descarga
    descargarReciboPNG();
}

/* =====================================
   ZOOM +
===================================== */

function aumentarZoom() {

    nivelZoom += 0.1;
    aplicarZoom();
}

/* =====================================
   ZOOM -
===================================== */

function disminuirZoom() {

    if (nivelZoom <= 0.5) return;

    nivelZoom -= 0.1;
    aplicarZoom();
}

/* =====================================
   APLICAR ZOOM
===================================== */

function aplicarZoom() {

    const contenedor =
        document.getElementById("contenedorZoom");

    contenedor.style.transform =
        `scale(${nivelZoom})`;
}

/* =====================================
   ERROR
===================================== */

function mostrarErrorRecibo() {

    document.querySelector(".recibo-container")
        .innerHTML = `
        <div style="text-align:center;padding:40px;">
            <h2>No se encontró el recibo</h2>
            <p>Verifique el ID de la factura.</p>
        </div>
    `;
}