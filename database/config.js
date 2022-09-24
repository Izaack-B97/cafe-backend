const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        
        await mongoose.connect( process.env.MONGODB_CNN, { 
            // useNewUrlParse: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: true
        });
        
        console.log('Base de datos conectada');

    } catch ( err ) {
        console.log( err );
        throw new Error( 'Error al inicializar la base de datos' );
    }
}

module.exports = {
    dbConnection
};