const { Router } = require('express');
const { check } = require('express-validator');
const { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } = require('../controllers/proyectoController');
const { existeProyectoPorId } = require('../helpers/db-validator');
const { validarJWT } = require('../middlewares/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

// Crea un Proyecto
// api/proyectos
router.post('/',
    validarJWT,
    [
        check('nombre', 'El Nombre del Producto es Requerido').not().isEmpty(),
        validarCampos,
    ],
crearProyecto);

// obtener los proyectos creados por el usuario autenticado
router.get('/',
    validarJWT,
obtenerProyectos);

// actualizar proyecto por id
router.put('/:id',
    validarJWT,
    [
        check('id', 'no es un ID Válido').isMongoId(),
        check('id').custom(existeProyectoPorId),
        check('nombre', 'El Nombre del Producto es Requerido').not().isEmpty(),
        validarCampos
    ],
actualizarProyecto);

// eliminar un proyecto
router.delete('/:id',
    validarJWT,
    [
        check('id', 'no es un ID Válido').isMongoId(),
        check('id').custom(existeProyectoPorId),
        validarCampos
    ],
eliminarProyecto );

module.exports = router;