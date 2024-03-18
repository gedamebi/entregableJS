


function eliminarCurso(id){
    Swal.fire({
        icon: "question",
        title: "¿Estás seguro de que deseas eliminar el curso con ID: " + id + " ?",
        showClass: {
            popup: `
                animate__animated
                animate__backInDown
                animate__faster
            `
            },
            hideClass: {
            popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
            `
        },
        showDenyButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`
    }).then((result) => {
        if (result.isConfirmed) {
            // Utiliza el método filter() para crear un nuevo array sin el curso que tiene el ID que pasamos por parametro
            cursos = cursos.filter(function(curso) {
                return curso.id !== id;
            });
            localStorage.setItem("cursos", JSON.stringify(cursos))
            let filaEliminarEnTabla = document.getElementById("fila-curso-" + id);
            filaEliminarEnTabla.remove();

            Toastify({
                text: "Curso " + id + " eliminado correctamente",
                duration: 2000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: false,
                gravity: "top", 
                position: "left", 
                stopOnFocus: false,
                style: {
                background: "linear-gradient(to right, #535A04, #B3B4A7)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        }
    });
}

async function cargarCursos(){
    await cargarCursosDB()
    
    cargoTablaDOM()
    cargoEventoChangeParaSelectCursos()
}


function cargoTablaDOM(){
    // Obtengo la tabla para agregar contenido
    let tabla = document.getElementById('tablaCursos')

    // Elimino todo el contenido del div.
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
    }

    const filaHeader = document.createElement("div")
    // Le agrego la clase grid-row al div creado
    filaHeader.classList.add('grid-row');
    filaHeader.classList.add('header');
    filaHeader.innerHTML =    `<div class="grid-cell">ID</div>
                            <div class="grid-cell">Nombre</div>
                            <div class="grid-cell">Horas</div>
                            <div class="grid-cell">Accion</div>`;
    tabla.appendChild(filaHeader)

    cursosJson.forEach(curso => {
        const fila = document.createElement("div")
        // Le agrego la clase grid-row al div creado
        fila.classList.add('grid-row');
        fila.id = `fila-curso-${curso.id}`
        fila.innerHTML =    `<div class="grid-cell datosFijos">${curso.id}</div>
                            <div class="grid-cell datosFijos">${curso.nombre}</div>
                            <div class="grid-cell datosFijos">${curso.horas}</div>
                            <div class="grid-cell datosFijos" id="colum-accion"></div>`;
        tabla.appendChild(fila)
    });

    cursos.forEach(curso => {
        const fila = document.createElement("div")
        // Le agrego la clase grid-row al div creado
        fila.classList.add('grid-row');
        fila.id = `fila-curso-${curso.id}`
        fila.innerHTML =    `<div class="grid-cell">${curso.id}</div>
                            <div class="grid-cell">${curso.nombre}</div>
                            <div class="grid-cell">${curso.horas}</div>
                            <div class="grid-cell" id="colum-accion">
                                <a href='editar_curso.html?id=${curso.id}'><img src='../../assets/img/editar.png' alt='editar' width='20px' title='Editar Alumno'/></a>
                                <a href='#' class="linkDelCurso" id="del_curso-${curso.id}"><img src='../../assets/img/eliminar.png' alt='editar' width='20px' title='Eliminar Alumno'/></a>
                            </div>`;
        tabla.appendChild(fila)
    });


    // Obtener todos los elementos a con la clase 'linkDelCurso'
    let enlaces = document.querySelectorAll('.linkDelCurso');

    // Iterar sobre cada enlace y añadir un evento de clic
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function(event) {
            // Prevenir el comportamiento predeterminado del enlace (navegación a otra página)
            event.preventDefault();

            // Obtener el ID del enlace clickeado
            let idEnlaceClickeado = enlace.id;

            // Dividir la cadena usando el - como delimitador
            let partes = idEnlaceClickeado.split('-');

            // Llamo a la funcion eliminar curso y le paso el ID
            eliminarCurso(parseInt(partes[1]));
        });
    });
}


function cargoEventoChangeParaSelectCursos (){
    // Obtener una referencia al elemento <select> por su ID
    let select = document.getElementById("ordenarPor_Cursos");
    // Agregar un event listener para capturar el cambio de valor
    select.addEventListener("change", function() {
        // Obtener el valor seleccionado
        let valorSeleccionado = select.value;
        // Hacer algo con el valor seleccionado
        switch (valorSeleccionado){
            case "id":
                // Ordenar el array por el atributo 'id' utilizando una función de comparación
                cursos.sort(function(a, b) {
                    return a.id - b.id;
                });
                cargoTablaDOM()
                break
            case "nombre":
                // Ordenar el array por el atributo 'nombre' utilizando una función de comparación
                cursos.sort(function(a, b) {
                    return a.nombre.localeCompare(b.nombre)
                });
                cargoTablaDOM()
                break    
            case "horas":
                // Ordenar el array por el atributo 'edad' utilizando una función de comparación
                cursos.sort(function(a, b) {
                    return a.horas - b.horas;
                });
                cargoTablaDOM()
                break
        }       
    });
}


cargarCursos()

let mensajeLS = localStorage.getItem("mensaje")
if (mensajeLS){
    Toastify({
        text: mensajeLS,
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top", 
        position: "left", 
        stopOnFocus: false,
        style: {
          background: "linear-gradient(to right, #535A04, #B3B4A7)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
    // Eliminar mensaje del localStorage
    localStorage.removeItem('mensaje');
}