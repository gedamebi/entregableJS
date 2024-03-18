

async function cargarFormularioEdicionCursos(){
    await cargarCursosDB()
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

    let btnEditar = document.getElementById("btnEditar")
    btnEditar.onclick=(event)=>{
        editarCurso()
    }
}

function editarCurso(){
    let id = document.getElementById("id").value
    let nombre = document.getElementById("nombre").value
    let horas = parseInt(document.getElementById("horas").value)

    let form = document.getElementById("formEditarCurso")

    if (nombre != "" && !isNaN(horas)){
        // Busca el índice del curso con el ID especificado
        let indice = cursos.findIndex(function(curso) {
            return curso.id == id;
        });

        if (indice !== -1) {
            cursos[indice].nombre = nombre
            cursos[indice].horas = horas
        }

        localStorage.setItem("cursos", JSON.stringify(cursos))
        localStorage.setItem("mensaje", "Curso " + id + " modificado correctamente")

        window.location.href = 'cursos.html';
    } else {
        // Si no es válido, mostrar mensajes de validación
        form.classList.add('was-validated');
    }
}

cargarFormularioEdicionCursos();