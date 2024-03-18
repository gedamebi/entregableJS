

let alumnos
let alumnosJson
let alumnosLS = localStorage.getItem("alumnos")

async function cargarAlumnosDB(){
    await fetch("../../../db/dataAlumnos.json")
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

    if (alumnosLS){
        alumnos = JSON.parse(alumnosLS)
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
    await fetch("../../../db/dataCursos.json")
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

    if (cursosLS){
        cursos = JSON.parse(cursosLS)
    }
}

class Curso{
    constructor(id, nombre, horas){
        this.id = id
        this.nombre = nombre
        this.horas = horas
    }
}