

document.addEventListener('DOMContentLoaded', function() { 
    cargarContenido('inicio.html');
});

let inicio = document.getElementById('href-inicio');
let contacto = document.getElementById('href-contacto');
let servicios = document.getElementById('href-servicios');
let nosotros = document.getElementById('href-nosotros');
let login = document.getElementById('href-login');
let publicar = document.getElementById('href-publicar');
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

inicio.addEventListener('click', function (event) {
    event.preventDefault();
    cargarContenido('inicio.html');
})

contacto.addEventListener('click', function (event) {
    event.preventDefault();
    cargarContenido('contacto.html');
})

servicios.addEventListener('click', function (event) {
    event.preventDefault();
    cargarContenido('servicios.html');
})

nosotros.addEventListener('click', function (event) {
    event.preventDefault();
    cargarContenido('nosotros.html');
})

login.addEventListener('click', function (event) {
    event.preventDefault();
    cargarContenido('login.html');
})

publicar.addEventListener('click', function (event) {
    event.preventDefault();
    cargarContenidoBtn('administracion.html', 'btn-cargar-imagen');
})

function cargarContenido(html) {
    fetch(html)
        .then(response => response.text())
        .then(data => {
            document.getElementById('contenido-dinamico').innerHTML = data;
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

function cargarContenidoBtn(html, btn) {
    fetch(html)
        .then(response => response.text())
        .then(data => {
            document.getElementById('contenido-dinamico').innerHTML = data;
            let btnCargarImg = document.getElementById(btn);

            btnCargarImg.addEventListener('click', function () {
                document.getElementById('imagen-publicacion').click();
            });
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
}

