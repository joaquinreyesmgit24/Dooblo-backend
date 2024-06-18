import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import {Role, User} from '../models/index.js'
import { generateJWT } from '../helpers/tokens.js'

const register = async (req,res)=>{
    try{
        //Validation
        await check('username').notEmpty().withMessage('El nombre de usuario no puede ir vacio').run(req)
        await check('password').isLength({ min: 6 }).withMessage('La contraseña debe ser de al menos 6 caracteres').run(req)
        await check('repeat_password').equals(req.body.password).withMessage('Las contraseñas no son iguales').run(req)
        let result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }
        //Check duplicate user
        const { username, password, roleId } = req.body
        const userExists = await User.findOne({ where: { username } })
        if (userExists) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
        if (!roleId) {
            return res.status(400).json({ error: 'Debes seleccionar un rol válido' });
        }
        const role = await Role.findByPk(roleId);
        console.log(role)
        if (!role) {
            return res.status(400).json({ error: 'El rol especificado no es válido' });
        }
        const user = await User.create({ username, password, status: true, roleId });
        
        const users = await User.findAll({
            include: Role,
            required:true
            });
        res.status(200).json({ user, users })

    }catch(error){
        res.status(500).json({ error: 'Error al crear el usuario' })
    }
}
const logout = (req, res) => {
    res.clearCookie('_token');
    res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
};
const listUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            required:true,
            include: Role,
        });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar los usuarios' });
    }
}

const authenticate = async (req, res) => {
    try {
        await check('username').notEmpty().withMessage('El nombre de usuario no puede ir vacio').run(req)
        await check('password').notEmpty().withMessage('La contraseña es obligatoria').run(req)
        let result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }
        //Check if the user exists
        const user = await User.findOne({
            required:true,
            where: { username: req.body.username },
            include: Role
        })
        if (!user) {
            return res.status(400).json({ error: 'El usuario no existe' });
        }
        if (!user.status) {
            return res.status(400).json({ error: 'El usuario esta inhabilitado' });
        }
        //Check the password
        if (!user.verifyPassword(req.body.password)) {
            return res.status(400).json({ error: 'La contraseña es incorrecta' });
        }
        //Authenticate the user
        const token = generateJWT({ id: user.id, username: user.username })
        return res.cookie('_token', token, {
            httpOnly: true,
        }).status(200).json({ user: { id: user.id, username: user.username, role: { id: user.role.id, name: user.role.name }, token: token } })
    } catch (error) {
        console.error('Error en el proceso de autenticación:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
const userUpdate = async (req, res) => {
    try {
        const { username, password, status, roleId } = req.body;

        await check('username').notEmpty().withMessage('El nombre no puede ir vacio').run(req)
        if (password) {
            await check('password').isLength({ min: 6 }).withMessage('La contraseña debe ser de al menos 6 caracteres').run(req)
            await check('repeat_password').equals(req.body.password).withMessage('Las contraseñas no son iguales').run(req)
        }
        let resultado = validationResult(req)
        if (!resultado.isEmpty()) {
            return res.status(400).json({ errors: resultado.array() })
        }
        const { userId } = req.params;

        const user = await User.findOne({ where: { id:userId } })
        if (!user) {
            return res.status(400).json({ error: 'El usuario no existe' });
        }
        if(!roleId){
            return res.status(400).json({ error: 'Debes seleccionar un rol válido' });
        }
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(400).json({ error: 'El rol especificado no existe' });
        }

        const salt = await bcrypt.genSalt(10)
        if (!password) {
            user.set({
                username,
                status,
                roleId
            })
        } else {
            user.set({
                username,
                status,
                roleId,
                password: await bcrypt.hash(password, salt)
            })
        }
        await user.save();
        const users = await User.findAll({
            required:true,
            include: Role,
        });
        res.status(200).json({ msg: 'Usuario actualizado correctamente', users });

    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar al usuario' });
    }
}
const listRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar los roles' });
    }
}


export{
    register,
    logout,
    authenticate,
    listUsers,
    userUpdate,
    listRoles,
}