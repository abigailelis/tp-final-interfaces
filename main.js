document.addEventListener('DOMContentLoaded', function() { 
    cargarContenido('inicio.html');
});

let inicio = document.getElementById('href-inicio');
let contacto = document.getElementById('href-contacto');
let servicios = document.getElementById('href-servicios');
let nosotros = document.getElementById('href-nosotros');
let login = document.getElementById('href-login');
let publicar = document.getElementById('href-publicar');
let donar = document.getElementById('btn-donar');
let contenido_dinamico = document.getElementById('contenido-dinamico');

inicio.addEventListener('click', function (event) {
    event.preventDefault();
    contenido_dinamico.classList.remove('bg-img');
    cargarContenido('inicio.html');
})

contacto.addEventListener('click', function (event) {
    event.preventDefault();
    contenido_dinamico.classList.add('bg-img');
    cargarContenido('contacto.html');
})

servicios.addEventListener('click', function (event) {
    event.preventDefault();
    contenido_dinamico.classList.remove('bg-img');
    cargarContenido('servicios.html');
})

nosotros.addEventListener('click', function (event) {
    event.preventDefault();
    contenido_dinamico.classList.remove('bg-img');
    cargarContenido('nosotros.html');
})

login.addEventListener('click', function (event) {
    event.preventDefault();
    contenido_dinamico.classList.add('bg-img');
    cargarContenido('login.html');
})

publicar.addEventListener('click', function (event) {
    event.preventDefault();
    contenido_dinamico.classList.add('bg-img');
    cargarContenidoBtn('administracion.html', 'btn-cargar-imagen');
})

donar.addEventListener('click', function (event) {
    event.preventDefault();
    contenido_dinamico.classList.remove('bg-img');
    cargarContenido('donacion.html');
})

function cargarContenido(html) {
    fetch(html)
        .then(response => response.text())
        .then(data => {
            contenido_dinamico.innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

function cargarContenidoBtn(html, btn) {
    fetch(html)
        .then(response => response.text())
        .then(data => {
            contenido_dinamico.innerHTML = data;
            let btnCargarImg = document.getElementById(btn);

            btnCargarImg.addEventListener('click', function () {
                document.getElementById('imagen-publicacion').click();
            });
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

