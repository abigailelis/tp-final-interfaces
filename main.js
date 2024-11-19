

document.addEventListener('DOMContentLoaded', function () {
    cargarContenido('inicio.html');
});

let inicio = document.getElementById('href-inicio');
let contacto = document.getElementById('href-contacto');
let servicios = document.getElementById('href-servicios');
let nosotros = document.getElementById('href-nosotros');
let login = document.getElementById('href-login');
let publicar = document.getElementById('href-publicar');
let index = 0;
let donar = document.getElementById('btn-donar');
let contenido_dinamico = document.getElementById('contenido-dinamico');

/*-- Cambia el color del link del nav correspondiente a la pagina abierta --*/
let links = document.querySelectorAll('.nav-link');
links.forEach(link => { 
    link.addEventListener('click', function() { 
        document.querySelectorAll('.nav-link').forEach(link => 
            link.classList.remove('active')); 
            this.classList.add('active');     
    }); 
});


inicio.addEventListener('click', function (event) {
    event.preventDefault();
    contenido_dinamico.classList.remove('bg-img');
    cargarContenido('inicio.html');
})

contacto.addEventListener('click', function (event) {
    event.preventDefault();
    contenido_dinamico.classList.add('bg-img');
    fetch('contacto.html')
        .then(response => response.text())
        .then(data => {
            contenido_dinamico.innerHTML = data;
            const emailInput = document.getElementById('e-mail-contacto'); 
            const errorEmail = document.getElementById('errorEmail'); 
            emailInput.addEventListener('input', function() { 
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
                if (emailPattern.test(emailInput.value))
                    errorEmail.style.display = 'none'; 
                else 
                    errorEmail.style.display = 'inline'; 
            });
            document.getElementById('formulario_contacto').addEventListener('submit', function (event) {
                event.preventDefault();
                    errorEmail.style.display = 'none';
                    alert('Formulario enviado correctamente');
            });
        })
        .catch(error => console.error('Error al cargar el contenido:', error));
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