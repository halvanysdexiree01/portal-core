// =====================================
// VERIFICAR SESIÓN ACTIVA
// =====================================

function verificarSesion() {

    // Si no existe sesión activa, redirige al login
    if (
        localStorage.getItem("sesionActiva") !== "true"
    ) {

        window.location.href =
            "/frontend/pages/login.html";

    }

}


// =====================================
// CERRAR SESIÓN
// =====================================

function cerrarSesion() {

    const confirmar =
        confirm(
            "¿Estás seguro que deseas cerrar sesión?"
        );

    if (!confirmar) {
        return;
    }

    // Elimina datos de sesión
    localStorage.removeItem(
        "sesionActiva"
    );

    localStorage.removeItem(
        "correoAdministrador"
    );

    // Redirige al login
    window.location.href =
            "/frontend/pages/login.html";

}


// =====================================
// OBTENER USUARIO ACTUAL
// =====================================

function obtenerSesion() {

    return {
        sesionActiva:
            localStorage.getItem("sesionActiva"),
        correo:
            localStorage.getItem("correoAdministrador")
    };

}