const resultado = document.querySelector("#resultado");
const formulario = document.querySelector('#formulario');
const guardadas = document.querySelector('#guardadas')

document.addEventListener("DOMContentLoaded", () => {
    formulario.addEventListener('submit', validarFormulario);

    //Mostrar las noticias que previamente fueron guardadas en localStorage
    mostrarGuardadas();
})


function validarFormulario(e) {
    e.preventDefault();

    const noticia = document.querySelector('#noticia').value;

    if (noticia === '') {
        imprimirAlerta('Ingrese al menos una palabra*')
    } else {
        buscarNoticias();
    }
}

function imprimirAlerta(mensaje) {
    const alerta = document.querySelector('.text-red-500');
    if (!alerta) {
        const alerta = document.createElement('DIV');

        alerta.classList.add('text-red-500', 'text-xs', 'font-bold', 'text-center');
        alerta.textContent = mensaje;

        formulario.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function buscarNoticias() {
    const noticia = document.querySelector('#noticia').value;

    const key = '362ea19e6500f38533c41e2f34a7bcc4';
    const url = `https://gnews.io/api/v4/search?q=${noticia}&lang=en&country=us&max=10&apikey=${key}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarNoticias(resultado.articles)
        })

}

function mostrarNoticias(articulos) {
    //iterar en cada noticia
    articulos.forEach(articulo => {
        const { title, description, image, url, publishedAt } = articulo;

        const divNoticia = document.createElement('DIV');
        divNoticia.classList.add('flex', 'flex-col', 'md:flex-row', 'gap-2', 'border-b', 'bg-gray-300', 'items-center', 'p-2');
        divNoticia.id = publishedAt;

        const img = document.createElement('IMG');
        img.classList.add('h-44', 'w-40', 'rounded-2xl')
        img.src = image;
        img.alt = 'Imagen de la noticia'

        //Cuerpo
        const divCuerpo = document.createElement('DIV');
        divCuerpo.classList.add('flex', 'flex-col', 'gap-2');

        const divTitulo = document.createElement('DIV');
        divTitulo.classList.add('flex', 'justify-around', 'align-top');

        const heading = document.createElement('H3');
        heading.textContent = title;

        const btnGuardar = document.createElement('BUTTON');
        btnGuardar.type = 'button';
        const icono = document.createElement('I');

        icono.classList.add('fa-regular', 'fa-heart', 'font-bold');
        btnGuardar.onclick = function () {
            guardarNoticia({
                id: publishedAt,
                titulo: title,
                url
            });
        }

        const descripcion = document.createElement('P');
        descripcion.textContent = description;

        const btnVer = document.createElement('A');
        btnVer.classList.add('btn')
        btnVer.textContent = 'Ver más';
        btnVer.href = url;

        //Agregar al html
        resultado.appendChild(divNoticia);

        //Agregar al divCuerpo
        divCuerpo.appendChild(divTitulo);
        divCuerpo.appendChild(descripcion);
        divCuerpo.appendChild(btnVer);

        //Agregar al divTitulo
        divTitulo.appendChild(heading);
        divTitulo.appendChild(btnGuardar);
        btnGuardar.appendChild(icono);

        //Agregar al divNoticia
        divNoticia.appendChild(img);
        divNoticia.appendChild(divCuerpo);
    });
}

function guardarNoticia(articulo) {
    const favorita = JSON.parse(localStorage.getItem('id')) ?? [];
    localStorage.setItem('id', JSON.stringify([...favorita, articulo]));
}

function mostrarGuardadas(){
    const favoritas = JSON.parse(localStorage.getItem('id')) ?? [];

    favoritas.map((item)=>{
        //Inyectar en el html
        const divGuardada = document.createElement('DIV');
        divGuardada.classList.add('flex', 'justify-between', 'py-2');

        const tituloGuardada = document.createElement('A');
        tituloGuardada.classList.add('text-sm', 'hover:underline');
        tituloGuardada.textContent = item.titulo;
        tituloGuardada.href = item.url;

        const btnEliminar = document.createElement('BUTTON');
        btnEliminar.type = 'button';
        const icono = document.createElement('I');
        icono.classList.add('fa-solid', 'fa-xmark', 'font-bold');
        btnEliminar.onclick = function () {
            elimiarNoticia(item.id);
        }

        //Agregar al div guardada
        guardadas.appendChild(divGuardada);

        divGuardada.appendChild(tituloGuardada);
        divGuardada.appendChild(btnEliminar);
        btnEliminar.appendChild(icono);
    })
    
}
