document.addEventListener('DOMContentLoaded', function (event) {
    manejarClick(event, 'inicio.html', false);
});

let contenido_dinamico = document.getElementById('contenido-dinamico');
let esta_logueado = false;
let link_publicar = document.getElementById('link-publicar');

/*-- Cambia el color del link del nav correspondiente a la pagina abierta --*/

let links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.nav-link').forEach(link =>
            link.classList.remove('active'));
        this.classList.add('active');
    });
});

window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const navbar = document.getElementById('navbar');
    const headerHeight = header.offsetHeight;
    if (window.scrollY > headerHeight) {
        navbar.classList.add('navbar-fixed');
        document.body.style.paddingTop = navbar.offsetHeight + 'px';
    } else {
        navbar.classList.remove('navbar-fixed');
        document.body.style.paddingTop = '0';
    }
});

const botones = [
    { id: 'href-inicio', url: 'inicio.html', agregarClase: false },
    { id: 'href-contacto', url: 'contacto.html', agregarClase: true },
    { id: 'href-servicios', url: 'servicios.html', agregarClase: false },
    { id: 'href-nosotros', url: 'nosotros.html', agregarClase: false },
    { id: 'href-login', url: 'login.html', agregarClase: true },
    { id: 'href-publicar', url: 'administracion.html', agregarClase: true },
    { id: 'href-hogar', url: 'hogar.html', agregarClase: false },
    { id: 'href-centro', url: 'centroDia.html', agregarClase: false },
    { id: 'href-taller', url: 'taller.html', agregarClase: false },
    { id: 'btn-donar', url: 'donacion.html', agregarClase: false }
];

botones.forEach(boton => {
    document.getElementById(boton.id).addEventListener('click', function (event) {
        manejarClick(event, boton.url, boton.agregarClase);
    });
});

/* -- Resalta el link del nav de la pagina actual y llama a la funcion cargarContenido -- */
function manejarClick(event, url, agregarClase) {
    event.preventDefault();
    if (agregarClase)
        contenido_dinamico.classList.add('bg-img');
    else
        contenido_dinamico.classList.remove('bg-img');
    cargarContenido(url);
}

/* -- función que cambia las páginas dinamicamente -- */

function cargarContenido(html) {

    if (esta_logueado)
        link_publicar.classList.remove('oculto');
    else
        link_publicar.classList.add('oculto');

    const funciones = {
        'inicio.html': cargarInicio,
        'nosotros.html': cargarNosotros,
        'contacto.html': cargarContacto,
        'servicios.html': cargarServicios,
        'login.html': cargarLogin,
        'administracion.html': cargarAdministracion
    };

    fetch(html)
        .then(response => response.text())
        .then(data => {
            contenido_dinamico.innerHTML = data;
            (funciones[html] || cargarInfoServicios)();
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

function cargarInfoServicios() {

}

/* -- Escucha los botones de la pagina de inicio -- */

function cargarInicio() {
    const botones = [
        { id: 'btn-ver-servicios', url: 'servicios.html', agregarClase: false },
        { id: 'btn-ver-contacto', url: 'contacto.html', agregarClase: true },
        { id: 'btn-ver-nosotros', url: 'nosotros.html', agregarClase: false }
    ];

    botones.forEach(boton => {
        document.getElementById(boton.id).addEventListener('click', function (event) {
            manejarClick(event, boton.url, boton.agregarClase);
        });
    });
}


/*-- Muestra los parrafos ocultos al clickear en el boton correspondiente de la pagina de nosotros -- */

function cargarNosotros() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function () {
            const parrafoOculto = this.previousElementSibling;
            parrafoOculto.classList.toggle('hidden');

            if (parrafoOculto.classList.contains('hidden'))
                this.textContent = 'Ver más';
            else
                this.textContent = 'Cerrar';
        });
    });
}

/*-- Escucha los botones de la pagina de servicios -- */
function cargarServicios() {
    const botones = [
        { id: 'btn-ver-hogar', url: 'hogar.html' },
        { id: 'btn-ver-centro-dia', url: 'centroDia.html' },
        { id: 'btn-ver-taller', url: 'taller.html' }
    ];

    botones.forEach(boton => {
        document.getElementById(boton.id).addEventListener('click', function (event) {
            event.preventDefault();
            cargarContenido(boton.url);
        });
    });
}


/*-- Carga la pagina de publicar, solo se puede acceder estando logueado como administración --*/

function cargarAdministracion() {
    document.getElementById('btn-cargar-imagen').addEventListener('click', function () {
        document.getElementById('imagen-publicacion').click();
        document.getElementById('imagen-publicacion').addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('info-imagen-publicacion').innerHTML = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });


    /* Carga el modal de confirmación  */
    document.getElementById('form_publicacion').addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('entre aca');
        $('#myModal').modal('show');
        $('#myModal').on('shown.bs.modal', function () {
            $('#msj').trigger('focus');
            console.log('o aca');
        });
    });
}

/* -- Carga la pagina de contacto y su formulario con control de errores -- */

function cargarContacto() {
    const errorEmail = document.getElementById('errorEmail');
    controlarEmail('e-mail-contacto', errorEmail);
    document.getElementById('formulario_contacto').addEventListener('submit', function (event) {
        event.preventDefault();
        errorEmail.classList.add('oculto');
        alert('Formulario enviado correctamente');
    });
}

/* -- Carga la pagina de login con el control de email en tiempo real y contraseña valida -- */

function cargarLogin() {
    actualizarEstadoSesion();
    const form = document.getElementById('form-login');
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    const errorEmail = document.getElementById('errorEmail');
    const password_reset = document.getElementById('link-olvido-password');

    controlarEmail('email', errorEmail);

    form.addEventListener('submit', manejarSubmit);
    btnCerrarSesion.addEventListener('click', manejarCerrarSesion);
    password_reset.addEventListener('click', resetPasword);
}

/*-- Chequea los valores ingreados en el formulario de login  -- */

const email = 'administracion@gmail.com';
const password = '123';

function manejarSubmit(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    if (email === emailInput && password === passwordInput) {
        esta_logueado = true;
        actualizarEstadoSesion();
    } else {
        document.getElementById('msj_error').classList.remove('oculto');
    }
}

/* -- Desabilita la pagina visible solo para el adiministrador -- */

function manejarCerrarSesion(event) {
    event.preventDefault();
    esta_logueado = false;
    actualizarEstadoSesion();
}

/* -- Muestra un mensaje al clickear en olvido su contraseña -- */

function resetPasword() {
    ocultarElementos(document.getElementById('form-login'));
    let msj = document.getElementById('msj_sesion');
    mostrarElementos(msj)
    msj.innerHTML = 'Se ha enviado un correo de restauración de contraseña a su casilla.'
}

/* -- Muestra y oculta elementos y los actualiza segun sesión inicida -- */

function actualizarEstadoSesion() {
    const titulo = document.getElementById('titulo-login');
    const errorEmail = document.getElementById('errorEmail');
    const msjError = document.getElementById('msj_error');
    const msjExito = document.getElementById('msj_sesion');
    const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
    const form = document.getElementById('form-login');
    const imagenLogin = document.getElementById('logo-sesion');


    if (esta_logueado) {
        titulo.innerHTML = 'Cerrar sesión';
        ocultarElementos(errorEmail, msjError, form);
        mostrarElementos(msjExito, link_publicar, btnCerrarSesion);
        imagenLogin.src = 'images/logout.png';
    } else {
        titulo.innerHTML = 'Iniciar sesión';
        ocultarElementos(msjExito, link_publicar, btnCerrarSesion);
        mostrarElementos(form);
        imagenLogin.src = 'images/login.png';
    }
}

function mostrarElementos(...elementos) {
    elementos.forEach(elemento => elemento.classList.remove('oculto'));
}

function ocultarElementos(...elementos) {
    elementos.forEach(elemento => elemento.classList.add('oculto'));
}

/*-- Controla email valido en tiempo real --*/

function controlarEmail(email, errorEmail) {
    const emailInput = document.getElementById(email);
    errorEmail.classList.add('ocuto');
    emailInput.addEventListener('input', function () {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (emailPattern.test(emailInput.value))
            errorEmail.classList.add('ocuto');
        else
            errorEmail.classList.remove('oculto');
    });
}

/*-- Función del carrusel --*/

let index = 0;
function moveSlide(direction) {
    const slides = document.querySelectorAll(".carrusel img");
    index += direction;

    // Asegura que el índice esté dentro del rango de las imágenes
    if (index >= slides.length) {
        index = 0;
    } else if (index < 0) {
        index = slides.length - 1;
    }

    // Mueve el carrusel a la imagen correspondiente
    const offset = -index * 100; // Cada imagen ocupa el 100% del ancho
    document.querySelector(".carrusel").style.transform = `translateX(${offset}%)`;
}

/* -- Función que despliega la galeria de fotos -- */

function openGallery() {
    const galleryContainer = document.getElementById('gallery');
    const btnGallery = document.getElementById('btnVerGallery');

    if (!galleryContainer || !btnGallery) {
        console.error('No se encontraron los elementos especificados.');
        return;
    }

    galleryContainer.classList.toggle('oculto');
}

