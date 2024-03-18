

function findAlumnogetCI(ci){
    
    const alumno = alumnos.find(alumno => alumno.ci == ci)
    return JSON.stringify(alumno)
}

async function agregarAlumno(){

    await cargarAlumnosDB()

    let nombre = document.getElementById("nombre").value
    let edad = parseInt(document.getElementById("edad").value)
    let ci = document.getElementById("ci").value

    let form = document.getElementById("formAgregarAlumno")
    
    if (nombre != "" && !isNaN(edad) && ci != ""){
        // Verifico que el alumno no este ingresado con CI repetida
        if (findAlumnogetCI(ci) == undefined){
            // En esta caso no existe entonces seguimos obteniendo el ID que le vamos a asociar.
            let id = 5
            if (alumnos.length > 0){
                // En caso que el array no este vacio obtenemos el ultimo ID ingresado y le sumamos 1
                id = alumnos[alumnos.length -1].id + 1
            }
            let alumno = new Alumno(id, nombre, edad, ci)
            alumnos.push(alumno)
            localStorage.setItem("alumnos", JSON.stringify(alumnos))

            localStorage.setItem("mensaje", "Se ingreso correctamente a " + nombre)

            window.location.href = 'alumnos.html';
        } else {
            const span_mensaje = document.getElementById('mensaje')
            // Escribimos contenido en el span utilizando innerText
            span_mensaje.innerText = 'Alumno ya esta ingresado'
        }
    } else {
        // Si no es válido, mostrar mensajes de validación
        form.classList.add('was-validated');
    }
}

// Obtener una referencia al elemento <button> por su ID
let btnAgregarAlumno = document.getElementById("btnGuardar");
// Agregar un event listener para capturar el evento click
btnAgregarAlumno.addEventListener('click', agregarAlumno);
