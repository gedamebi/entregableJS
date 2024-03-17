

function eliminarAlumno(id){
    Swal.fire({
        icon: "question",
        title: "¿Estás seguro de que deseas eliminar el alumno con ID: " + id + " ?",
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
            // Utiliza el método filter() para crear un nuevo array sin el alumno que tiene el ID que pasamos por parametro
            alumnos = alumnos.filter(function(alumno) {
                return alumno.id !== id;
            });

            localStorage.setItem("alumnos", JSON.stringify(alumnos))
            let filaEliminarEnTabla = document.getElementById("fila-alumno-" + id);
            filaEliminarEnTabla.remove();

            Toastify({
                text: "Alumno " + id + " eliminado correctamente",
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



function cargarAlumnos(){
    // Obtengo la tabla para agregar contenido
    let tabla = document.getElementById('tablaAlumnos')

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
                            <div class="grid-cell">Edad</div>
                            <div class="grid-cell">C.I</div>
                            <div class="grid-cell">Accion</div>`;
    tabla.appendChild(filaHeader)

    alumnos.forEach(alumno => {
        const fila = document.createElement("div")
        // Le agrego la clase grid-row al div creado
        fila.classList.add('grid-row');
        fila.id = `fila-alumno-${alumno.id}`
        fila.innerHTML =    `<div class="grid-cell">${alumno.id}</div>
                            <div class="grid-cell">${alumno.nombre}</div>
                            <div class="grid-cell">${alumno.edad}</div>
                            <div class="grid-cell">${alumno.ci}</div>
                            <div class="grid-cell" id="colum-accion">
                                <a href='editar_alumno.html?id=${alumno.id}'><img src='../../img/editar.png' alt='editar' width='20px' title='Editar Alumno'/></a>
                                <a href='#' class="linkDelUser" id="del_usuario-${alumno.id}"><img src='../../img/eliminar.png' alt='editar' width='20px' title='Eliminar Alumno'/></a>
                            </div>`;
        tabla.appendChild(fila)
    });


    // Obtener todos los elementos a con la clase 'linkDelUser'
    let enlaces = document.querySelectorAll('.linkDelUser');

    // Iterar sobre cada enlace y añadir un evento de clic
    enlaces.forEach(function(enlace) {
        enlace.addEventListener('click', function(event) {
            // Prevenir el comportamiento predeterminado del enlace (navegación a otra página)
            event.preventDefault();

            // Obtener el ID del enlace clickeado
            let idEnlaceClickeado = enlace.id;

            // Dividir la cadena usando el - como delimitador
            let partes = idEnlaceClickeado.split('-');

            // Llamo a la funcion eliminar alumno y le paso el ID
            eliminarAlumno(parseInt(partes[1]));
        });
    });
}

function cargoEventoChangeParaSelectAlumnos (){
    // Obtener una referencia al elemento <select> por su ID
    let select = document.getElementById("ordenarPor_Alumnos");
    // Agregar un event listener para capturar el cambio de valor
    select.addEventListener("change", function() {
        // Obtener el valor seleccionado
        let valorSeleccionado = select.value;
        // Hacer algo con el valor seleccionado
        switch (valorSeleccionado){
            case "id":
                // Ordenar el array por el atributo 'id' utilizando una función de comparación
                alumnos.sort(function(a, b) {
                    return a.id - b.id;
                });
                cargarAlumnos()
                break
            case "nombre":
                // Ordenar el array por el atributo 'nombre' utilizando una función de comparación
                alumnos.sort(function(a, b) {
                    return a.nombre.localeCompare(b.nombre)
                });
                cargarAlumnos()
                break    
            case "edad":
                // Ordenar el array por el atributo 'edad' utilizando una función de comparación
                alumnos.sort(function(a, b) {
                    return a.edad - b.edad;
                });
                cargarAlumnos()
                break
            case "ci":
                // Ordenar el array por el atributo 'ci' utilizando una función de comparación
                alumnos.sort(function(a, b) {
                    return a.ci.localeCompare(b.ci)
                });
                cargarAlumnos()
                break
        }       
    });
}

cargarAlumnos()
cargoEventoChangeParaSelectAlumnos()

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