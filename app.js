// REQUIRES
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
// console.log(argv); IMPRIME TODOS LOS COMANDOS
// console.log(argv);

let comando = argv._[0];

switch(comando) {
    case 'crear':
        
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
         porHacer.getListado();
        // console.log('Mostrar todas las tareas por hacer');
        break;
    case 'actualizar':
        let actualizar = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizar);
        // console.log('Actualiza una tarea');
        break;
    case 'borrar': 
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default: 
        console.log('Comando no reconocido');
        break;
}


