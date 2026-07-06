verificarSesion();

// =====================================
// VARIABLES GLOBALES
// =====================================

let clientes = [];

const inputKitOriginal =
    document.getElementById("kitOriginal");

const inputNombre =
    document.getElementById("nombre");

const inputCuenta =
    document.getElementById("cuentaStarlink");

const inputTelefono =
    document.getElementById("telefono");

const inputCorreo =
    document.getElementById("correo");

const inputPlan =
    document.getElementById("plan");

const inputDescripcion =
    document.getElementById("descripcion");

const inputPrecioUSDCliente =
    document.getElementById("precioUSDCliente");

const inputCantidadCliente =
    document.getElementById("cantidadCliente");

const inputBusqueda =
    document.getElementById("inputBusqueda");

const tablaClientes =
    document.getElementById("tablaClientes");

const btnGuardar =
    document.getElementById("btnGuardar");

const btnCancelar =
    document.getElementById("btnCancelar");

const btnNuevoCliente =
    document.getElementById("btnNuevoCliente");

const formularioCliente =
    document.getElementById("formularioCliente");


// =====================================
// INICIO
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        eventos();

        if (formularioCliente) {

            formularioCliente.style.display =
                "none";

        }

        cargarClientes();

    }
);


// =====================================
// EVENTOS
// =====================================

function eventos() {

    btnGuardar.addEventListener(
        "click",
        guardarCliente
    );

    btnCancelar.addEventListener(
        "click",
        cancelarFormulario
    );

    inputBusqueda.addEventListener(
        "input",
        buscarCliente
    );

    if (btnNuevoCliente) {

        btnNuevoCliente.addEventListener(
            "click",
            abrirFormularioNuevoCliente
        );

    }

}


// =====================================
// ABRIR FORMULARIO NUEVO CLIENTE
// =====================================

function abrirFormularioNuevoCliente() {

    limpiarFormulario();

    if (formularioCliente) {

        formularioCliente.style.display =
            "block";

        formularioCliente.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// =====================================
// CERRAR FORMULARIO
// =====================================

function cerrarFormulario() {

    if (formularioCliente) {

        formularioCliente.style.display =
            "none";

    }

}


// =====================================
// CANCELAR
// =====================================

function cancelarFormulario() {

    limpiarFormulario();

    cerrarFormulario();

}


// =====================================
// CARGAR CLIENTES
// =====================================

async function cargarClientes() {

    try {

        clientes =
            await apiObtenerClientes();

        if (!Array.isArray(clientes)) {

            clientes = [];

        }

        renderizarTabla(
            clientes
        );

    }
    catch (error) {

        console.error(error);

        alert(
            "No fue posible cargar los clientes."
        );

    }

}


// =====================================
// GUARDAR CLIENTE
// =====================================

async function guardarCliente() {

    if (!validarFormulario()) {
        return;
    }

    const cliente = {

        kit:
            inputCuenta.value.trim(),

        nombre:
            inputNombre.value.trim(),

        telefono:
            inputTelefono.value.trim(),

        correo:
            inputCorreo.value.trim(),

        plan:
            inputPlan.value.trim(),

        descripcion:
            inputDescripcion.value.trim(),

        precioUSD:
            Number(
                inputPrecioUSDCliente.value
            ) || 0,

        cantidad:
            Number(
                inputCantidadCliente.value
            ) || 1

    };

    try {

        if (
            inputKitOriginal.value === ""
        ) {

            await apiCrearCliente(
                cliente
            );

            alert(
                "Cliente registrado correctamente."
            );

        }
        else {

            await apiActualizarCliente(

                inputKitOriginal.value,

                cliente

            );

            alert(
                "Cliente actualizado correctamente."
            );

        }

        await cargarClientes();

        limpiarFormulario();

        cerrarFormulario();

    }
    catch (error) {

        console.error(error);

        alert(
            error.message
        );

    }

}


// =====================================
// VALIDAR FORMULARIO
// =====================================

function validarFormulario() {

    if (
        inputNombre.value.trim() === ""
    ) {

        alert(
            "El nombre es obligatorio."
        );

        return false;

    }

    if (
        inputCuenta.value.trim() === ""
    ) {

        alert(
            "La cuenta Starlink es obligatoria."
        );

        return false;

    }

    return true;

}


// =====================================
// RENDERIZAR TABLA
// =====================================

function renderizarTabla(lista) {

    tablaClientes.innerHTML = "";

    lista.forEach(cliente => {

        tablaClientes.innerHTML += `

            <tr>

                <td>${cliente.nombre || ""}</td>

                <td>${cliente.kit || ""}</td>

                <td>${cliente.telefono || ""}</td>

                <td>${cliente.correo || ""}</td>

                <td>

                    <button
                        class="btn-perfil"
                        onclick="verPerfilCliente('${cliente.kit}')">

                        Ver Perfil

                    </button>

                    <button
                        class="btn-editar"
                        onclick="editarCliente('${cliente.kit}')">

                        Editar

                    </button>

                    <button
                        class="btn-eliminar"
                        onclick="eliminarCliente('${cliente.kit}')">

                        Eliminar

                    </button>

                </td>

            </tr>

        `;

    });

}


// =====================================
// VER PERFIL DEL CLIENTE
// =====================================

function verPerfilCliente(kit) {

    window.location.href =
        `perfil-cliente.html?kit=${encodeURIComponent(kit)}`;

}


// =====================================
// BUSCAR CLIENTE
// =====================================

function buscarCliente() {

    const texto =
        inputBusqueda.value
            .toLowerCase()
            .trim();

    const filtrados =
        clientes.filter(cliente =>

            (cliente.nombre || "")
                .toLowerCase()
                .includes(texto)

            ||

            (cliente.kit || "")
                .toLowerCase()
                .includes(texto)

        );

    renderizarTabla(
        filtrados
    );

}


// =====================================
// EDITAR CLIENTE
// =====================================

function editarCliente(kit) {

    const cliente =
        clientes.find(
            c => c.kit === kit
        );

    if (!cliente) {
        return;
    }

    if (formularioCliente) {

        formularioCliente.style.display =
            "block";

        formularioCliente.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

    inputKitOriginal.value =
        cliente.kit;

    inputNombre.value =
        cliente.nombre;

    inputCuenta.value =
        cliente.kit;

    inputTelefono.value =
        cliente.telefono;

    inputCorreo.value =
        cliente.correo;

    inputPlan.value =
        cliente.plan || "";

    inputDescripcion.value =
        cliente.descripcion || "";

    inputPrecioUSDCliente.value =
        cliente.precioUSD || "";

    inputCantidadCliente.value =
        cliente.cantidad || 1;

    btnGuardar.textContent =
        "Actualizar Cliente";

}


// =====================================
// ELIMINAR CLIENTE
// =====================================

async function eliminarCliente(kit) {

    const confirmar =
        confirm(
            "¿Desea eliminar este cliente?"
        );

    if (!confirmar) {
        return;
    }

    try {

        await apiEliminarCliente(
            kit
        );

        alert(
            "Cliente eliminado correctamente."
        );

        await cargarClientes();

    }
    catch (error) {

        console.error(error);

        alert(
            error.message
        );

    }

}


// =====================================
// LIMPIAR FORMULARIO
// =====================================

function limpiarFormulario() {

    inputKitOriginal.value =
        "";

    inputNombre.value =
        "";

    inputCuenta.value =
        "";

    inputTelefono.value =
        "";

    inputCorreo.value =
        "";

    inputPlan.value =
        "";

    inputDescripcion.value =
        "";

    inputPrecioUSDCliente.value =
        "";

    inputCantidadCliente.value =
        1;

    btnGuardar.textContent =
        "Guardar Cliente";

}