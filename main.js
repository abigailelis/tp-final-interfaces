let inicio = document.getElementById('href-inicio');
let contacto = document.getElementById('href-contacto');
let login = document.getElementById('href-login');
let publicar = document.getElementById('href-publicar');

login.addEventListener('click', function (event) {
    event.preventDefault();
    cargarContenido('login.html');
})

contacto.addEventListener('click', function (event) {
    event.preventDefault();
    cargarContenido('contacto.html');
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

