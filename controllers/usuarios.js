
const bcrypt = require('bcrypt');
const { response, request } = require('express');
const usuario = require('../models/usuario');

const Usuario = require( '../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const query = { estado: true };
    const { limite = 5, desde = 0 } =  req.query;


    const [ total, usuarios ] = await Promise.all([ 
        Usuario.countDocuments( query ),
        Usuario
            .find( query )
            .skip( desde )
            .limit( Number( limite ) )
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // TODO: Validar con la BD

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API - usuariosPut',
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    
    // Eliminar fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id )
    
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } )
    
    res.json({
        msg: 'delete API - usuariosDelete',
        usuario
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}