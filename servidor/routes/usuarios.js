/* 
    Rutas Para Crear Usuarios
*/

const { Router } = require('express');
const { crearUsuario } = require('../controllers/usuarioController');
const router = Router();
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

// crea un usuario
// api/usuarios
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email Válido').isEmail(),
        check('password', 'El Password debe ser minimo de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    crearUsuario
);

module.exports = router;
