document.addEventListener('DOMContentLoaded', function (event) {
    manejarClick(event, 'inicio.html', false);
});

let inicio = document.getElementById('href-inicio');
let contacto = document.getElementById('href-contacto');
let servicios = document.getElementById('href-servicios');
let nosotros = document.getElementById('href-nosotros');
let login = document.getElementById('href-login');
let publicar = document.getElementById('href-publicar');
let donar = document.getElementById('btn-donar');
let contenido_dinamico = document.getElementById('contenido-dinamico');

/*-- Cambia el color del link del nav correspondiente a la pagina abierta --*/

let links = document.querySelectorAll('.nav-link');
links.forEach(link => {
    link.addEventListener('click', function () {
        document.querySelectorAll('.nav-link').forEach(link =>
            link.classList.remove('active'));
        this.classList.add('active');
    });
});

/*-- función que maneja los eventos de escucha de los links y botones principales --*/

function manejarClick(event, url, agregarClase) {
    event.preventDefault();
    if (agregarClase)
        contenido_dinamico.classList.add('bg-img');
    else
        contenido_dinamico.classList.remove('bg-img');
    cargarContenido(url);
}

inicio.addEventListener('click', function (event) {
    manejarClick(event, 'inicio.html', false);
})

contacto.addEventListener('click', function (event) {
    manejarClick(event, 'contacto.html', true);
})

servicios.addEventListener('click', function (event) {
    manejarClick(event, 'servicios.html', false);
})

nosotros.addEventListener('click', function (event) {
    manejarClick(event, 'nosotros.html', false);
})

login.addEventListener('click', function (event) {
    manejarClick(event, 'login.html', true);
})

publicar.addEventListener('click', function (event) {
    manejarClick(event, 'administracion.html', true);
})

donar.addEventListener('click', function (event) {
    manejarClick(event, 'donacion.html', false);
})

/* -- función que cambia las páginas dinamicamente -- */

function cargarContenido(html) {
    fetch(html)
        .then(response => response.text())
        .then(data => {
            contenido_dinamico.innerHTML = data;
            switch (html) {
                case 'inicio.html': cargarInicio();
                    break;
                case 'nosotros.html': cargarNosotros();
                    break;
                case 'contacto.html': cargarContacto();
                    break;
                case 'servicios.html': cargarServicios();
                    break;
                case 'donacion.html': cargarDonaciones();
                    break;
                case 'login.html': cargarLogin();
                    break;
                case 'administracion.html': cargarAdministracion();
                    break;
                default: cargarInicio();
            }
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

function cargarInicio(){

}

/* Carga la pagina de publicar, solo se puede acceder estando logueado como administración */

function cargarAdministracion() {
    document.getElementById('btn-cargar-imagen').addEventListener('click', function () {
        document.getElementById('imagen-publicacion').click();
        document.getElementById('imagen-publicacion').addEventListener('change', function(event) { 
            const file = event.target.files[0]; 
            if (file) { 
                const reader = new FileReader(); 
                reader.onload = function(e) { 
                    document.getElementById('info-imagen-publicacion').innerHTML = e.target.result;
                }; 
                reader.readAsDataURL(file); 
            } 
        });
    });
}

/* Carga la pagina de contacto y su formulario con control de errores */

function cargarContacto() {
    const errorEmail = document.getElementById('errorEmail');
    controlarEmail('e-mail-contacto', errorEmail);
    document.getElementById('formulario_contacto').addEventListener('submit', function (event) {
        event.preventDefault();
        errorEmail.classList.add('oculto');
        alert('Formulario enviado correctamente');
    });
}

/* Carga la pagina de login con el control de email en tiempo real y contraseña valida */

function cargarLogin(){
    let email = 'administracion@gmail.com';
    let password = '123456789';
    let titulo = document.getElementById('titulo-login');
    let btn_cerrar_sesion = document.getElementById('btn-cerrar-sesion');
    let form = document.getElementById('form-login');
    let link_publicar = document.getElementById('link-publicar');

    const errorEmail = document.getElementById('errorEmail');
    const msj_error = document.getElementById('msj_error');
    const msj_exito = document.getElementById('msj_sesion_iniciada');
    
    controlarEmail('email', errorEmail);

    form.addEventListener('submit', function(event){
        event.preventDefault();
        let email_input = document.getElementById('email').value;
        let password_input = document.getElementById('password').value;
        if(email == email_input && password == password_input){
            titulo.innerHTML = 'Cerrar sesión';
            errorEmail.classList.add('oculto');
            msj_error.classList.add('oculto');
            msj_exito.classList.remove('oculto');
            activarOcultarfunciones(btn_cerrar_sesion, form, link_publicar);
        }
        else{
            msj_error.classList.remove('oculto');
        }
    })

    btn_cerrar_sesion.addEventListener('click', function(event){
        event.preventDefault();
        titulo.innerHTML = 'Iniciar sesión';
        msj_exito.classList.add('oculto');
        activarOcultarfunciones(btn_cerrar_sesion, form, link_publicar);
    })
}


/* Activa u oculta funciones, segun usuario común o logueado */
function activarOcultarfunciones(btn_cerrar_sesion, form, link_publicar){
    btn_cerrar_sesion.classList.toggle('oculto');
    form.classList.toggle('oculto');
    link_publicar.classList.toggle('oculto');
}

/* Controla email valido en tiempo real */

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




/* Función del carrusel */
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