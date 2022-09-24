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

module.exports = {
    esRoleValido,
    validarExisteEmail
}