// Rutas para autenticar usuarios
const { Router } = require('express');
const { check} = require('express-validator');
const { autenticarUsuario } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// crea un usuario
// api/auth
router.post('/', 
    [
        check('email', 'Agrega un Correo Válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6}),
        validarCampos
    ],
    autenticarUsuario 
)

module.exports = router;