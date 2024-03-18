 
let alumnos
let alumnosLS = localStorage.getItem("alumnos")
if (alumnosLS){
    alumnos = JSON.parse(alumnosLS)
} else {
    alumnos = []
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
let cursosLS = localStorage.getItem("cursos")
if (cursosLS){
    cursos = JSON.parse(cursosLS)
} else {
    cursos = []
}



class Curso{
    constructor(id, nombre, horas){
        this.id = id
        this.nombre = nombre
        this.horas = horas
    }
}