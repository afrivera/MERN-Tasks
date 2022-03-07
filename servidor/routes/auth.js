// Rutas para autenticar usuarios
const { Router } = require('express');
const { check} = require('express-validator');
const { autenticarUsuario, usuarioAutenticado } = require('../controllers/authController');
const { validarJWT } = require('../middlewares/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Iniciar sesión
// api/auth
router.post('/', 
    [
        check('email', 'Agrega un Correo Válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6}),
        validarCampos
    ],
    autenticarUsuario 
);

// obtiene usuario autenticado
router.get('/',  validarJWT,
usuarioAutenticado)

module.exports = router;