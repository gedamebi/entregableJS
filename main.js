
/* Declaracion de array de alumnos*/
const alumnos = [
    { id: 1,  nombre: 'German Medina', edad: 32, ci: 123456 },
    { id: 2,  nombre: 'Ignacio Birriel', edad: 21, ci: 111222 }
]

/* Declaracion de array de cursos*/
const cursos = [
    { id: 1,  nombre: 'Desarrollo Web', duracionEnSemanas: 4 },
    { id: 2,  nombre: 'Java script', duracionEnSemanas: 4 }
]

/* Funcion para manejo de alumnos */
function listarAlumnos(){
    let mensaje = "Alumnos ingresados \n\n"
    if (alumnos.length < 1){
        mensaje += "No hay alumnos ingresados"
    } else {
        for (let i = 0; i < alumnos.length; i++) {
            mensaje += alumnos[i].id + " - " + alumnos[i].nombre + " " + " - " + alumnos[i].edad + " - " + alumnos[i].ci + "\n"
        }
    }
    alert(mensaje)
    console.table(alumnos)
    
}

function buscarAlumnoPorCI(ci){
    for (const alumno of alumnos){
        if (alumno.ci == ci) {
            return alumno
        }
    }
    // No se encontro alumno, entonces se devuelve null
    return null;
}

function agregarAlumno(){
    let nombre = prompt("Igrese el nombre")
    let edad = parseInt(prompt("Ingrese su edad"))
    let ci = parseInt(prompt("Ingrese su cedula de identidad"))

    if (nombre != "" && edad > 0 && ci > 0){
        if (buscarAlumnoPorCI(ci) == null){

            // Genero id mayor al ultimo ingresado, si no hay elemento parto de ID 1
            let id = 1;
            if (alumnos.length > 0){
                id = alumnos[alumnos.length - 1].id + 1
            }

            var nuevoAlumno = { id: id, nombre: nombre, edad: edad, ci: ci }
            alumnos.push(nuevoAlumno)
        } else {
            alert("Alumno ya se encuentra ingresado")
            console.log("Alumno ya se encuentra ingresado")
        }
    } else {
        alert("Debes ingresar todos los campos, error al ingresar alumno")
        console.log("Debes ingresar todos los campos, error al ingresar alumno")
    }
}

function eliminarAlumno() {
    let ci = parseInt(prompt("Ingrese su cedula de identidad"))
    let alumno = buscarAlumnoPorCI(ci);
    if (alumno != null){
        let confirmacion = confirm("Seguro quieres eliminiar al alumno " + alumno.nombre + " de CI: " + alumno.ci + " ?")
        if (confirmacion){
            // Elimino indice del array que contenga el valor de atributo CI que quiero eliminiar
            // Capturo el indice y luego lo paso por la funcion splice para eliminarlo
            let index = alumnos.findIndex(function(objeto) {
                return objeto.ci === ci
            });
            
            if (index !== -1) {
                alumnos.splice(index, 1)
                console.log("Alumno eliminado")
            }
        }
    } else {
        alert("No se encontro alumno")
        console.log("No se encontro alumno")
    }
}


/* Funcion para lista cursos */
function listarCursos(){
    let mensaje = "Cursos ingresados \n\n"
    if (cursos.length < 1){
        mensaje += "No hay cursos ingresados"
    } else {
        for (let i = 0; i < cursos.length; i++) {
            mensaje += cursos[i].id + " - " + cursos[i].nombre + " " + cursos[i].duracionEnSemanas + " semanas" + "\n"
        }
    } 
    alert(mensaje)
    console.table(cursos)
}

function buscarCursoPorID(id){
    for (const curso of cursos){
        if (curso.id == id) {
            return curso
        }
    }
    // No se encontro curso, entonces se devuelve null
    return null;
}

function agregarCurso(){
    let nombre = prompt("Igrese el nombre del curso")
    let duracionEnSemanas = parseInt(prompt("Ingrese cantidad de semanas"))

    if (nombre != "" && duracionEnSemanas > 0){

        // Genero id mayor al ultimo ingresado, si no hay elemento parto de ID 1
        let id = 1;
        if (cursos.length > 0){
            id = cursos[cursos.length - 1].id + 1
        }

        var nuevoCurso = { id: id, nombre: nombre, duracionEnSemanas: duracionEnSemanas }
        cursos.push(nuevoCurso)
    } else {
        alert("Debes ingresar todos los campos, error al ingresar curso")
        console.log("Debes ingresar todos los campos, error al ingresar curso")
    }
}

function eliminarCurso() {
    let id = parseInt(prompt("Ingrese ID del curso"))
    let curso = buscarCursoPorID(id);
    if (curso != null){
        let confirmacion = confirm("Seguro quieres eliminiar el curso de " + curso.nombre + " de ID: " + curso.id + " ?")
        if (confirmacion){

            // Elimino indice del array que contenga el valor de atributo ID que quiero eliminiar
            // Capturo el indice y luego lo paso por la funcion splice para eliminarlo
            let index = cursos.findIndex(function(objeto) {
                return objeto.id === id;
            });
            
            if (index !== -1) {
                cursos.splice(index, 1)
                console.log("Curso eliminado")
            }
        }
    } else {
        alert("No se encontro curso")
        console.log("No se encontro curso")
    }
}



let menu = "Seleccione una opcion \n\n"
menu += "1- Listar Alumnos\n"
menu += "2- Ingresar Alumno\n"
menu += "3- Eliminar Alumno\n"
menu += "4- Listar Cursos\n"
menu += "5- Ingresar Curso\n"
menu += "6- Eliminar Curso\n"
menu += "7- Salir"

alert("Bienvenido a sistema de gestion de alumnos y cursos")
console.log("Bienvenido a sistema de gestion de alumnos y cursos")

let salir = false

while(salir == false){
    
    let opcionMenu = parseInt(prompt(menu))
    

    switch(opcionMenu){

        case 1:
            listarAlumnos()
            break

        case 2:
            agregarAlumno()
            break

        case 3:
            eliminarAlumno()
            break

        case 4:
            listarCursos()
            break

        case 5:
            agregarCurso()
            break

        case 6:
            eliminarCurso()
            break

        case 7:
            salir = true
            break

        default:
            alert("Opcion incorrecta")
            console.log("Opcion incorrecta")
            break

    }
}

alert("Cerrando aplicacion, vuelva a cargar para volver")
console.log("Cierro aplicacion")
