const resultado = document.querySelector("#resultado");
const formulario = document.querySelector('#formulario')

document.addEventListener("DOMContentLoaded", () =>{
    formulario.addEventListener('submit', validarFormulario);
})


function validarFormulario(e){
    e.preventDefault();

    const noticia = document.querySelector('#noticia').value;

    if(noticia ===''){
        imprimirAlerta('Ingrese al menos una palabra*')
    } else{
        console.log('buscando')
    }
}

function imprimirAlerta(mensaje){
    const alerta = document.querySelector('.text-red-500');
    if(!alerta){
        const alerta = document.createElement('DIV');
        
        alerta.classList.add('text-red-500', 'text-xs', 'font-bold', 'text-center');
        alerta.textContent = mensaje;
        
        formulario.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

