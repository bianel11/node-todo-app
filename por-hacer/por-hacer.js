const fs = require('fs');
const colores = require('colors');

let listadoPorHacer = [];


function crear(descripcion) {
    cargarDB();
    let porHacer = {
        /* descripcion */
        descripcion: descripcion,
        completado: false,
    }

    listadoPorHacer.push(porHacer);
    guardarDatos();
    return porHacer;
}

const guardarDatos = () => {
    let data = JSON.stringify(listadoPorHacer); /* Combierte a JSON un objeto */
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar la tarea', err);
    });
}

function cargarDB() {
    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }

}

function getListado() {
    cargarDB();
    for (const tarea of listadoPorHacer) {
        console.log('======= Por Hacer ======='.green);
        console.log(tarea.descripcion);
        console.log('Estado: ', tarea.completado);
        console.log('=========================='.green)
    }
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });

    if(index > -1){
        listadoPorHacer[index].completado = completado;
        guardarDatos();
        return true;
    }else{
        return false;
    }
}

function borrar(descripcion) {
    cargarDB();
    let copia = listadoPorHacer.filter(tarea=>{
        return tarea.descripcion !== descripcion;
    });
    if(listadoPorHacer.length === copia.length) {
        return false;
    }else{
        listadoPorHacer = copia;
        guardarDatos();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}