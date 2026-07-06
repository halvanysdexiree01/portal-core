// =====================================
// DESCARGAR RECIBO COMO PNG
// =====================================

async function descargarReciboPNG() {

    try {

        // ==========================
        // BUSCAR CONTENEDOR RECIBO
        // ==========================

        const recibo = document.querySelector(".recibo-container");

        if (!recibo) {

            alert("No se encontró el contenedor del recibo.");

            return;
        }


        // ==========================
        // OBTENER ID FACTURA ACTUAL
        // ==========================

        const params =
            new URLSearchParams(window.location.search);

        const idFactura =
            params.get("idFactura") || "RECIBO";


        // ==========================
        // GENERAR IMAGEN
        // ==========================

        const canvas =
            await html2canvas(recibo, {

                scale: 2,

                useCORS: true,

                backgroundColor: "#ffffff"

            });


        // ==========================
        // CONVERTIR A PNG
        // ==========================

        const imagenPNG =
            canvas.toDataURL("image/png");


        // ==========================
        // CREAR DESCARGA
        // ==========================

        const enlace =
            document.createElement("a");

        enlace.href =
            imagenPNG;

        enlace.download =
            `RECIBO-${idFactura}.png`;


        // ==========================
        // EJECUTAR DESCARGA
        // ==========================

        document.body.appendChild(enlace);

        enlace.click();

        document.body.removeChild(enlace);

    }

    catch (error) {

        console.error(
            "Error al generar PNG:",
            error
        );

        alert(
            "No fue posible generar el archivo PNG."
        );
    }
}