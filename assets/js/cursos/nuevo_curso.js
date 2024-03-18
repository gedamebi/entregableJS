

async function agregarCurso(){

    await cargarCursosDB()

    let nombre = document.getElementById("nombre").value
    let horas = parseInt(document.getElementById("horas").value)

    let form = document.getElementById("formAgregarCurso")

    if (nombre != "" && !isNaN(horas)){

        let id = 5
        if (cursos.length > 0){
            // En caso que el array no este vacio obtenemos el ultimo ID ingresado y le sumamos 1
            id = cursos[cursos.length -1].id + 1
        }

        let curso = new Curso(id, nombre, horas)
        cursos.push(curso)
        localStorage.setItem("cursos", JSON.stringify(cursos))
        localStorage.setItem("mensaje", "Se ingreso correctamente el curso " + nombre)
        window.location.href = 'cursos.html';
    } else {
        // Si no es válido, mostrar mensajes de validación
        form.classList.add('was-validated');
    }
}

// Obtener una referencia al elemento <button> por su ID
let btnAgregarCurso = document.getElementById("btnGuardar");
// Agregar un event listener para capturar el evento click
btnAgregarCurso.addEventListener('click', agregarCurso);