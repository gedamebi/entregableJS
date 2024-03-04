
let alumnos
let alumnosLS = localStorage.getItem("alumnos")
if (alumnosLS){
    alumnos = JSON.parse(alumnosLS)
} else {
    alumnos = []
}

let cursos
let cursosLS = localStorage.getItem("cursos")
if (cursosLS){
    cursos = JSON.parse(cursosLS)
} else {
    cursos = []
}

class Alumno{
    constructor(id, nombre, edad, ci){
        this.id = id
        this.nombre = nombre
        this.edad = edad
        this.ci = ci
    }
}

class Curso{
    constructor(id, nombre, horas){
        this.id = id
        this.nombre = nombre
        this.horas = horas
    }
}


/* 
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++                                ++++++++++++++
++++++++++++++  METODOS PARA TRATAR ALUMNOS   ++++++++++++++  
++++++++++++++                                ++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

function findAlumnogetCI(ci){
    const alumno = alumnos.find(alumno => alumno.ci === ci)
    return JSON.stringify(alumno)
}

function agregarAlumno(){
    let nombre = document.getElementById("nombre").value
    let edad = parseInt(document.getElementById("edad").value)
    let ci = document.getElementById("ci").value

    if (nombre != "" && edad != "" && ci != ""){
        // Verifico que el alumno no este ingresado con CI repetida
        if (findAlumnogetCI(ci) == undefined){
            // En esta caso no existe entonces seguimos obteniendo el ID que le vamos a asociar.
            let id = 1
            if (alumnos.length > 0){
                // En caso que el array no este vacio obtenemos el ultimo ID ingresado y le sumamos 1
                id = alumnos[alumnos.length -1].id + 1
            }
            let alumno = new Alumno(id, nombre, edad, ci)
            alumnos.push(alumno)
            localStorage.setItem("alumnos", JSON.stringify(alumnos))
            window.location.href = 'alumnos.html';
        } else {
            const span_mensaje = document.getElementById('mensaje')
            // Escribimos contenido en el span utilizando innerText
            span_mensaje.innerText = 'Alumno ya esta ingresado'
        }
    }
}

function eliminarAlumno(id){
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar el alumno con ID: " + id + " ?");

    if (confirmacion) {
        // Utiliza el método filter() para crear un nuevo array sin el alumno que tiene el ID que pasamos por parametro
        alumnos = alumnos.filter(function(alumno) {
            return alumno.id !== id;
        });
        localStorage.setItem("alumnos", JSON.stringify(alumnos))
        let filaEliminarEnTabla = document.getElementById("fila-alumno-" + id);
        filaEliminarEnTabla.remove();

    }
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
                                <a href='#' onclick="eliminarAlumno(${alumno.id})"><img src='../../img/eliminar.png' alt='editar' width='20px' title='Eliminar Alumno'/></a>
                            </div>`;
        tabla.appendChild(fila)
    });
}


function cargarFormularioEdicionAlumno(){
    // Obtener la cadena de consulta de la URL
    let queryString = window.location.search
    // Eliminar el "?" del principio de la cadena de consulta
    queryString = queryString.substring(1)
    // Dividir la cadena de consulta en pares clave=valor
    let pares = queryString.split("&")
    // Crear un objeto para almacenar las variables
    let variables = {}
    // Iterar sobre cada par clave=valor y almacenarlo en el objeto
    for (let i = 0; i < pares.length; i++) {
        let par = pares[i].split("=")
        let clave = decodeURIComponent(par[0]) // Decodificar la clave
        let valor = decodeURIComponent(par[1]) // Decodificar el valor
        variables[clave] = valor
    }

    let idAlumno = variables.id

    let alumnoEncontrado = alumnos.find(function(alumno) {
        return alumno.id == idAlumno
    });

    let id = document.getElementById("id")
    id.value = alumnoEncontrado.id

    let nombre = document.getElementById("nombre")
    nombre.value = alumnoEncontrado.nombre

    let edad = document.getElementById("edad")
    edad.value = alumnoEncontrado.edad

    let ci = document.getElementById("ci")
    ci.value = alumnoEncontrado.ci
}

function editarAlumno(){
    let id = document.getElementById("id").value
    let nombre = document.getElementById("nombre").value
    let edad = parseInt(document.getElementById("edad").value)

    if (nombre != "" && edad != ""){
        // Busca el índice del alumno con el ID especificado
        let indice = alumnos.findIndex(function(alumno) {
            return alumno.id == id;
        });

        if (indice !== -1) {
            alumnos[indice].nombre = nombre
            alumnos[indice].edad = edad
        }

        localStorage.setItem("alumnos", JSON.stringify(alumnos))

        window.location.href = 'alumnos.html';
    }
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




/* 
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++                                ++++++++++++++
++++++++++++++  METODOS PARA TRATAR CURSOS    ++++++++++++++  
++++++++++++++                                ++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/


function agregarCurso(){
    let nombre = document.getElementById("nombre").value
    let horas = parseInt(document.getElementById("horas").value)

    if (nombre != "" && horas != ""){

        let id = 1
        if (cursos.length > 0){
            // En caso que el array no este vacio obtenemos el ultimo ID ingresado y le sumamos 1
            id = cursos[cursos.length -1].id + 1
        }

        let curso = new Curso(id, nombre, horas)
        cursos.push(curso)
        localStorage.setItem("cursos", JSON.stringify(cursos))
        window.location.href = 'cursos.html';
    }
}

function eliminarCurso(id){
    const confirmacion = confirm("¿Estás seguro de que deseas eliminar el curso con ID: " + id + " ?");

    if (confirmacion) {
        // Utiliza el método filter() para crear un nuevo array sin el curso que tiene el ID que pasamos por parametro
        cursos = cursos.filter(function(curso) {
            return curso.id !== id;
        });
        localStorage.setItem("cursos", JSON.stringify(cursos))
        let filaEliminarEnTabla = document.getElementById("fila-curso-" + id);
        filaEliminarEnTabla.remove();

    }
}

function cargarCursos(){
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

    cursos.forEach(curso => {
        const fila = document.createElement("div")
        // Le agrego la clase grid-row al div creado
        fila.classList.add('grid-row');
        fila.id = `fila-curso-${curso.id}`
        fila.innerHTML =    `<div class="grid-cell">${curso.id}</div>
                            <div class="grid-cell">${curso.nombre}</div>
                            <div class="grid-cell">${curso.horas}</div>
                            <div class="grid-cell" id="colum-accion">
                                <a href='editar_curso.html?id=${curso.id}'><img src='../../img/editar.png' alt='editar' width='20px' title='Editar Alumno'/></a>
                                <a href='#' onclick="eliminarCurso(${curso.id})"><img src='../../img/eliminar.png' alt='editar' width='20px' title='Eliminar Alumno'/></a>
                            </div>`;
        tabla.appendChild(fila)
    });
}


function cargarFormularioEdicionCursos(){
    // Obtener la cadena de consulta de la URL
    let queryString = window.location.search
    // Eliminar el "?" del principio de la cadena de consulta
    queryString = queryString.substring(1)
    // Dividir la cadena de consulta en pares clave=valor
    let pares = queryString.split("&")
    // Crear un objeto para almacenar las variables
    let variables = {}
    // Iterar sobre cada par clave=valor y almacenarlo en el objeto
    for (let i = 0; i < pares.length; i++) {
        let par = pares[i].split("=")
        let clave = decodeURIComponent(par[0]) // Decodificar la clave
        let valor = decodeURIComponent(par[1]) // Decodificar el valor
        variables[clave] = valor
    }

    let idCurso = variables.id

    let cursoEncontrado = cursos.find(function(curso) {
        return curso.id == idCurso
    });

    let id = document.getElementById("id")
    id.value = cursoEncontrado.id

    let nombre = document.getElementById("nombre")
    nombre.value = cursoEncontrado.nombre

    let horas = document.getElementById("horas")
    horas.value = cursoEncontrado.horas
}

function editarCurso(){
    let id = document.getElementById("id").value
    let nombre = document.getElementById("nombre").value
    let horas = parseInt(document.getElementById("horas").value)

    if (nombre != "" && horas != ""){
        // Busca el índice del curso con el ID especificado
        let indice = cursos.findIndex(function(curso) {
            return curso.id == id;
        });

        if (indice !== -1) {
            cursos[indice].nombre = nombre
            cursos[indice].horas = horas
        }

        localStorage.setItem("cursos", JSON.stringify(cursos))

        window.location.href = 'cursos.html';
    }
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
                cargarCursos()
                break
            case "nombre":
                // Ordenar el array por el atributo 'nombre' utilizando una función de comparación
                cursos.sort(function(a, b) {
                    return a.nombre.localeCompare(b.nombre)
                });
                cargarCursos()
                break    
            case "horas":
                // Ordenar el array por el atributo 'edad' utilizando una función de comparación
                cursos.sort(function(a, b) {
                    return a.horas - b.horas;
                });
                cargarCursos()
                break
        }       
    });
}
