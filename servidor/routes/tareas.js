const { Router } = require('express');
const { check } = require('express-validator');
const { crearTarea, obtenerTareas, actualizarTarea, borrarTarea } = require('../controllers/tareasController');
const { existeProyectoPorId } = require('../helpers/db-validator');
const { validarJWT } = require('../middlewares/auth');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

// crear una tarea
// /api/tareas
router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El id del proyecto es obligatorio').not().isEmpty(),
        check('proyecto', 'No es un proyecto válido').isMongoId(),
        check('proyecto').custom(existeProyectoPorId),
        validarCampos
    ],
crearTarea);

// Obtener las tareas por proyecto
router.get('/',
    [
        validarJWT,
        check('proyecto', 'El id del proyecto es obligatorio').not().isEmpty(),
        check('proyecto', 'No es un proyecto válido').isMongoId(),
        check('proyecto').custom(existeProyectoPorId),
        validarCampos
    ],
obtenerTareas);

// actualizar tarea por id
router.put('/:id',
    [
        validarJWT,
        check('proyecto', 'El id del proyecto es obligatorio').not().isEmpty(),
        check('proyecto', 'No es un proyecto válido').isMongoId(),
        check('proyecto').custom(existeProyectoPorId),
        validarCampos        
    ],
actualizarTarea);

// Eliminar tarea por id
router.delete('/:id',
    [
        validarJWT,
        check('id', 'El id de la Tarea es obligatorio').not().isEmpty(),
        check('id', 'No es un documento válido').isMongoId(),
        check('proyecto', 'No es un proyecto válido').isMongoId(),
        check('proyecto').custom(existeProyectoPorId),
        validarCampos
    ],
borrarTarea)

module.exports = router;