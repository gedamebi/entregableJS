
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

    let btnEditar = document.getElementById("btnEditar")
    btnEditar.onclick=(event)=>{
        editarAlumno()
    }
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

        localStorage.setItem("mensaje", "Alumno " + id + " modificado correctamente")
        window.location.href = 'alumnos.html';
    }
}



cargarFormularioEdicionAlumno();