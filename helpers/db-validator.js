const Rol = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido =  async ( rol = '' ) => {
    const existeRol = await Rol.findOne({ rol })
    if ( !existeRol ) throw new Error(`El rol ${ rol } no está registrado en la BD`);
}

const validarExisteEmail = async ( correo ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) throw new Error(`El correo ${ correo } ya esta registrado`);
}

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById( id );
    if ( !existeUsuario ) throw new Error(`El id ${ id } no existe`);
}

module.exports = {
    esRoleValido,
    validarExisteEmail,
    existeUsuarioPorId
}