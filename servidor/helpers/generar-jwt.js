const jwt = require('jsonwebtoken');

const generarJWT = ( data ) => {
    return new Promise ( (resolve, reject) => {

        const payload = { data };
        jwt.sign( payload, process.env.SECRETA, {
            expiresIn: '1h'
        },( err, token )=> {
            if( err ){
                console.log(err);
                reject( 'No se Pudo Generar el Token');
            } else {
                resolve( token );
            }
        })
    });
}

module.exports = {
    generarJWT
}