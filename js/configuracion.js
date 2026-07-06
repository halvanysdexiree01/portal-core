verificarSesion();


/*
|--------------------------------------------------------------------------
| Referencias de los elementos HTML
|--------------------------------------------------------------------------
*/

const inputTasaDia =
    document.getElementById("tasaDia");

const textareaInformacionPagos =
    document.getElementById("informacionPagos");

const btnGuardarConfiguracion =
    document.getElementById(
        "btnGuardarConfiguracion"
    );

const btnVolverClientes =
    document.getElementById(
        "btnVolverClientes"
    );

const btnCerrarSesion =
    document.getElementById(
        "btnCerrarSesion"
    );


/*
|--------------------------------------------------------------------------
| Botón Volver
|--------------------------------------------------------------------------
*/

if (btnVolverClientes) {

    btnVolverClientes.addEventListener(
        "click",
        () => {

            window.history.back();

        }
    );

}


/*
|--------------------------------------------------------------------------
| Botón Cerrar Sesión
|--------------------------------------------------------------------------
*/

if (btnCerrarSesion) {

    btnCerrarSesion.addEventListener(
        "click",
        cerrarSesion
    );

}


/*
|--------------------------------------------------------------------------
| Obtener configuración del formulario
|--------------------------------------------------------------------------
*/

function obtenerConfiguracion() {

    return {

        tasaDia:
            inputTasaDia.value.trim(),

        informacionPagos:
            textareaInformacionPagos
                .value
                .trim()

    };

}


/*
|--------------------------------------------------------------------------
| Validar información
|--------------------------------------------------------------------------
*/

function validarConfiguracion() {

    const configuracion =
        obtenerConfiguracion();

    if (configuracion.tasaDia === "") {

        alert(
            "Debe ingresar la tasa del día."
        );

        inputTasaDia.focus();

        return false;

    }

    if (
        configuracion.informacionPagos === ""
    ) {

        alert(
            "Debe ingresar la información de pagos."
        );

        textareaInformacionPagos.focus();

        return false;

    }

    return true;

}


/*
|--------------------------------------------------------------------------
| Cargar configuración desde Google Sheets
|--------------------------------------------------------------------------
*/

async function cargarConfiguracion() {

    try {

        const configuracion =
            await obtenerConfiguracionAPI();

        if (
            configuracion.error
        ) {

            alert(
                configuracion.error
            );

            return;

        }

        inputTasaDia.value =
            configuracion.tasaDia || "";

        textareaInformacionPagos.value =
            configuracion.informacionPagos || "";

    }
    catch (error) {

        console.error(
            "Error cargando configuración:",
            error
        );

        alert(
            "No se pudo cargar la configuración."
        );

    }

}


/*
|--------------------------------------------------------------------------
| Guardar configuración
|--------------------------------------------------------------------------
*/

async function guardarConfiguracionSistema() {

    if (!validarConfiguracion()) {
        return;
    }

    try {

        const configuracion =
            obtenerConfiguracion();

        const respuesta =
            await guardarConfiguracionAPI(
                configuracion
            );

        if (respuesta.error) {

            alert(
                respuesta.error
            );

            return;

        }

        alert(
            "La configuración se guardó correctamente."
        );

    }
    catch (error) {

        console.error(
            "Error guardando configuración:",
            error
        );

        alert(
            "No se pudo guardar la configuración."
        );

    }

}


/*
|--------------------------------------------------------------------------
| EVENTOS
|--------------------------------------------------------------------------
*/

if (btnGuardarConfiguracion) {

    btnGuardarConfiguracion.addEventListener(
        "click",
        guardarConfiguracionSistema
    );

}

window.addEventListener(
    "DOMContentLoaded",
    cargarConfiguracion
);