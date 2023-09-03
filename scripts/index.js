document.addEventListener('DOMContentLoaded', function () {
    let seconds = 0;
    let counterInterval;
    let isRunning = false; // Variable para controlar si el contador está en funcionamiento

    const counterElem = document.getElementById('counter'); // Elemento usado como counter

    //Funcion encargada de refrescar el contador
    function refreshCounter() {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secondsLeft = seconds % 60;

        counterElem.textContent = `${agregarCeros(hours)}:${agregarCeros(minutes)}:${agregarCeros(secondsLeft)}`;
    }

    // Función para agregar ceros a la izquierda si es necesario.
    function agregarCeros(valor) {
        return valor < 10 ? `0${valor}` : valor;
    }

    // Función para iniciar el contador.
    function iniciarContador() {
        if (!isRunning) {
            isRunning = true;
            counterInterval = setInterval(function () {
                seconds++;
                refreshCounter();
            }, 1000); // 1000 ms = 1 segundo
        }
    }

    // Función para pausar el contador.
    function pausarContador() {
        if (isRunning) {
            isRunning = false;
            clearInterval(counterInterval);
        }
    }

    // Función para reiniciar el contador.
    function reiniciarContador() {
        isRunning = false;
        seconds = 0;
        refreshCounter();
        clearInterval(counterInterval);
    }

    function guardarTiempoActual(){
         // Compruebo si está ejecutándose, lo paro
    if (isRunning) {
        pausarContador();
    }

    // Se obtiene el tiempo actual
    const tiempoActual = counterElem.textContent;

    // Se crea un elemento de lista (li)
    const listItem = document.createElement('li');

    // Se crea el tiempo actual
    const tiempoSaveElem = document.createElement('span');
    tiempoSaveElem.textContent = tiempoActual;

    // Se crea un botón de eliminación
    const botonEliminar = document.createElement('button');
    botonEliminar.innerHTML = '<i class="fas fa-trash"></i>';
    botonEliminar.style.backgroundColor = '#CADA2A';
    botonEliminar.style.color = 'black';
    botonEliminar.addEventListener('click', function () {
        // Elimina el elemento del historial cuando se hace clic en el botón de eliminar
        listItem.remove();
    });

    // Se adjuntan los elementos al elemento de lista (li)
    listItem.appendChild(tiempoSaveElem);
    listItem.appendChild(botonEliminar);

    // Se obtiene el elemento de la lista del historial
    const historialLista = document.querySelector('.history-list');

    // Se agrega el elemento de lista al historial
    historialLista.appendChild(listItem);
    }

    // Agregar eventos a los botones de inicio, pausa y reinicio.
    document.querySelector('.begin').addEventListener('click', iniciarContador);
    document.querySelector('.pause').addEventListener('click', pausarContador);
    document.querySelector('.reset').addEventListener('click', reiniciarContador);
    document.querySelector('.save').addEventListener('click', guardarTiempoActual);
});
