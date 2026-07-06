/* =====================================
   FUNCIÓN PÚBLICA
===================================== */

async function descargarReciboPDF() {

    try {

        // ==========================
        // VALIDAR FACTURA ACTUAL
        // ==========================

        if (typeof reciboActual === "undefined" || !reciboActual) {

        alert("No existe un recibo cargado.");

        return;
        }

        // ==========================
        // CONTENEDOR DEL RECIBO
        // ==========================

        const reciboContainer =
            document.querySelector(".recibo-container");

        if (!reciboContainer) {

            alert("No fue posible localizar el recibo.");

            return;
        }

        // ==========================
        // CAPTURAR RECIBO
        // ==========================

        const canvas = await html2canvas(
            reciboContainer,
            {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff"
            }
        );

        // ==========================
        // CONVERTIR A IMAGEN
        // ==========================

        const imagenRecibo =
            canvas.toDataURL("image/png");

        // ==========================
        // CREAR PDF
        // ==========================

        const pdf =
            new jspdf.jsPDF(
                "p",
                "mm",
                "a4"
            );

        // ==========================
        // MEDIDAS PDF
        // ==========================

        const anchoPagina =
            pdf.internal.pageSize.getWidth();

        const altoPagina =
            pdf.internal.pageSize.getHeight();

        // Márgenes

        const margen = 10;

        const anchoUtil =
            anchoPagina - (margen * 2);

        const proporcion =
            canvas.height / canvas.width;

        const altoImagen =
            anchoUtil * proporcion;

        // ==========================
        // ESCALAR SI ES NECESARIO
        // ==========================

        let anchoFinal = anchoUtil;
        let altoFinal = altoImagen;

        if (altoFinal > (altoPagina - (margen * 2))) {

            altoFinal =
                altoPagina - (margen * 2);

            anchoFinal =
                altoFinal / proporcion;
        }

        // ==========================
        // CENTRAR CONTENIDO
        // ==========================

        const posicionX =
            (anchoPagina - anchoFinal) / 2;

        const posicionY =
            (altoPagina - altoFinal) / 2;

        // ==========================
        // INSERTAR IMAGEN
        // ==========================

        pdf.addImage(
            imagenRecibo,
            "PNG",
            posicionX,
            posicionY,
            anchoFinal,
            altoFinal
        );

        // ==========================
        // NOMBRE DEL ARCHIVO
        // ==========================

        const idFactura =
             reciboActual.id_factura ||
            "RECIBO";

        const nombreArchivo =
            `RECIBO-${idFactura}.pdf`;

        // ==========================
        // DESCARGAR PDF
        // ==========================

        pdf.save(nombreArchivo);

    }
    catch (error) {

        console.error(
            "Error generando PDF:",
            error
        );

        alert(
            "Ocurrió un error al generar el PDF."
        );
    }
}