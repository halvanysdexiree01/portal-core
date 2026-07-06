// ---------------------------------------------------------------------
// Elementos del formulario
// ---------------------------------------------------------------------

const formLogin =
    document.getElementById("formLogin");

const inputCorreo =
    document.getElementById("correo");

const inputClave =
    document.getElementById("clave");

const mensajeError =
    document.getElementById("mensajeError");

const btnLogin =
    document.getElementById("btnLogin");

// ---------------------------------------------------------------------
// Al cargar la página
// ---------------------------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    iniciarLogin
);

// ---------------------------------------------------------------------
// Inicializa el módulo
// ---------------------------------------------------------------------

function iniciarLogin() {

    // Si ya existe una sesión activa se envía directamente al sistema
    if (
        localStorage.getItem("sesionActiva") === "true"
    ) {

        window.location.href =
            "clientes.html";

        return;

    }

    // Registrar el evento del formulario
    formLogin.addEventListener(
        "submit",
        iniciarSesion
    );

}

// ---------------------------------------------------------------------
// Iniciar sesión
// ---------------------------------------------------------------------

async function iniciarSesion(evento) {

    // Evita que el formulario recargue la página
    evento.preventDefault();

    ocultarError();

    const correo =
        inputCorreo.value.trim();

    const clave =
        inputClave.value.trim();

    // Validación básica
    if (
        correo === "" ||
        clave === ""
    ) {

        mostrarError(
            "Debe completar todos los campos."
        );

        return;

    }

    try {

        // Deshabilitar botón mientras responde el servidor
        btnLogin.disabled = true;
        btnLogin.textContent =
            "Validando...";

        // Consultar al backend
        const respuesta =
            await apiValidarLogin(
                correo,
                clave
            );

        if (respuesta.success) {

            // Guardar sesión
            localStorage.setItem(
                "sesionActiva",
                "true"
            );

            localStorage.setItem(
                "correoAdministrador",
                correo
            );

            // Ir a Clientes
            window.location.href =
                "clientes.html";

            return;

        }

        mostrarError(
            respuesta.error ||
            "Correo o contraseña incorrectos."
        );

    }
    catch (error) {

        console.error(error);

        mostrarError(
            "No fue posible conectar con el servidor."
        );

    }
    finally {

        btnLogin.disabled = false;

        btnLogin.textContent =
            "Iniciar Sesión";

    }

}

// ---------------------------------------------------------------------
// Mostrar mensaje de error
// ---------------------------------------------------------------------

function mostrarError(mensaje) {

    mensajeError.textContent =
        mensaje;

    mensajeError.classList.remove(
        "oculto"
    );

}

// ---------------------------------------------------------------------
// Ocultar mensaje de error
// ---------------------------------------------------------------------

function ocultarError() {

    mensajeError.classList.add(
        "oculto"
    );

}