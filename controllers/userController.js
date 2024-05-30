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
        }).status(200).json({ user: { id: user.id, username: user.username, role: { id: user.role.id, username: user.role.name }, token: token } })
    } catch (error) {
        console.error('Error en el proceso de autenticación:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }

}

export{
    register,
    logout,
    authenticate
}