

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
        localStorage.setItem("mensaje", "Se ingreso correctamente el curso " + nombre)
        window.location.href = 'cursos.html';
    }
}

// Obtener una referencia al elemento <button> por su ID
let btnAgregarCurso = document.getElementById("btnGuardar");
// Agregar un event listener para capturar el evento click
btnAgregarCurso.addEventListener('click', agregarCurso);