

let alumnos
let alumnosJson
let alumnosLS = localStorage.getItem("alumnos")

async function cargarAlumnosDB(){
    /* 
        Cargo el contenido del json en una array donde lo muestro fijo en las primeras filas de la tabla del DOM
        Este contenido es fijo, es decir no podemos alterarlo desde el front por eso se quitan los elementos de eliminacion y edicion
        No se podran ordenar estos elementos en la tabla mostrandolo siempre al principio en el orden que esta en el Json
        Estos datos quedan diferenciados en la tabla con un background-color diferente el resto de las filas
    */
    await fetch("../../db/dataAlumnos.json")
        .then(response => response.json())
        .then(data => {
            if(data.length > 0){
                alumnosJson = data
            } else {
                alumnosJson = []
            }
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error a cargar base de datos!"
            });
        });

    /* 
        Cargo el array de alumnos cargados en el storage
        Estos si podran ser modificados por medio de la columna Accion de la tabla y tambien se podra agregar nuevos alumnos
    */
    if (alumnosLS){
        alumnos = JSON.parse(alumnosLS)
    } else {
        alumnos = []
    }
}

class Alumno{
    constructor(id, nombre, edad, ci){
        this.id = id
        this.nombre = nombre
        this.edad = edad
        this.ci = ci
    }
}



let cursos
let cursosJson
let cursosLS = localStorage.getItem("cursos")

async function cargarCursosDB(){
    /* 
        Cargo el contenido del json en una array donde lo muestro fijo en las primeras filas de la tabla del DOM
        Este contenido es fijo, es decir no podemos alterarlo desde el front por eso se quitan los elementos de eliminacion y edicion
        No se podran ordenar estos elementos en la tabla mostrandolo siempre al principio en el orden que esta en el Json
        Estos datos quedan diferenciados en la tabla con un background-color diferente el resto de las filas
    */
    await fetch("../../db/dataCursos.json")
        .then(response => response.json())
        .then(data => {
            if(data.length > 0){
                cursosJson = data
            } else {
                cursosJson = []
            }
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error a cargar base de datos!"
            });
        });

    /* 
        Cargo el array de alumnos cargados en el storage
        Estos si podran ser modificados por medio de la columna Accion de la tabla y tambien se podra agregar nuevos alumnos
    */
    if (cursosLS){
        cursos = JSON.parse(cursosLS)
    } else {
        cursos = []
    }
}

class Curso{
    constructor(id, nombre, horas){
        this.id = id
        this.nombre = nombre
        this.horas = horas
    }
}