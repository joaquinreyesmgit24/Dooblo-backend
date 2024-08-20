import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import {Role, User} from '../models/index.js'
import { generateJWT } from '../helpers/tokens.js'
import cloudinary from '../config/cloudinary.js'


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

        if (!role) {
            return res.status(400).json({ error: 'El rol especificado no es válido' });
        }
        const user = await User.create({ username, password, status: true, roleId });
        if (req.file) {
            try {
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: 'image' },
                        async (error, result) => {
                            if (error) {
                                return reject(error);
                            } else {
                                try {
                                    // Actualizar usuario con la URL de la imagen
                                    await user.update({ imgUrl: result.secure_url });
                                    resolve(result.secure_url);
                                } catch (updateError) {
                                    reject(updateError);
                                }
                            }
                        }
                    ).end(req.file.buffer);
                });
                
                console.log('File uploaded successfully:', result);
            } catch (err) {
                console.error('Error uploading file:', err);
                // Manejar el error apropiadamente, por ejemplo, enviando una respuesta de error
            }
        }
        const users = await User.findAll({
            include: Role,
            required:true
            });
        res.status(200).json({msg: 'Usuario creado correctamente', user, users })
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
        }).status(200).json({ user: { id: user.id, username: user.username, role: { id: user.role.id, name: user.role.name }, token: token, imgUrl:user.imgUrl } })
    } catch (error) {
        console.error('Error en el proceso de autenticación:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
const updateUser = async (req, res) => {
    try {
        const { username, password, status, roleId, repeat_password } = req.body;

        await check('username').notEmpty().withMessage('El nombre no puede ir vacío').run(req);
        if (password || repeat_password) {
            await check('password').isLength({ min: 6 }).withMessage('La contraseña debe ser de al menos 6 caracteres').run(req);
            await check('repeat_password').equals(req.body.password).withMessage('Las contraseñas no son iguales').run(req);
        }
        let resultado = validationResult(req);
        if (!resultado.isEmpty()) {
            return res.status(400).json({ errors: resultado.array() });
        }

        const { userId } = req.params;

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(400).json({ error: 'El usuario no existe' });
        }

        if (!roleId) {
            return res.status(400).json({ error: 'Debes seleccionar un rol válido' });
        }

        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(400).json({ error: 'El rol especificado no existe' });
        }

        const salt = await bcrypt.genSalt(10);
        if (password) {
            user.password = await bcrypt.hash(password, salt);
        }

        user.username = username;
        user.status = status;
        user.roleId = roleId;
        // Manejar la actualización de la imagen
        if (req.file) {
            // Si ya tiene una imagen, eliminarla de Cloudinary
            if (user.imgUrl) {
                const publicId = user.imgUrl.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
            }

            // Subir la nueva imagen
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    async (error, result) => {
                        if (error) {
                            return reject(error);
                        } else {
                            resolve(result.secure_url);
                        }
                    }
                ).end(req.file.buffer);
            });

            // Actualizar la URL de la imagen en el usuario
            user.imgUrl = result;
        }

        // Guardar cambios en la base de datos
        await user.save();

        const users = await User.findAll({
            required: true,
            include: Role,
        });

        res.status(200).json({ msg: 'Usuario actualizado correctamente', users });

    } catch (error) {
        console.error('Error al actualizar al usuario:', error);
        res.status(500).json({ error: 'Error al actualizar al usuario' });
    }
};
const listRoles = async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar los roles' });
    }
}
const deleteUser = async (req,res)=>{
    try{
        const {userId} = req.params;
        const user = await User.findOne({ where: { id:userId } })
        if (!user) {
            return res.status(400).json({ error: 'El usuario no existe' });
        }
        await user.destroy()
        const users = await User.findAll({
            include: Role,
            required:true
        });
        res.status(200).json({ msg: 'Usuario eliminado correctamente', user, users })
    } catch(error){
        res.status(500).json({ error: 'Error al listar los roles' });
    }
}
const userReport = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const activeUsers = await User.count({ where: { status: true } });
        const inactiveUsers = await User.count({ where: { status: false } });

        const activePercentageUsers = (activeUsers / totalUsers) * 100;
        const inactivePercentageUsers = (inactiveUsers / totalUsers) * 100;

        res.json({
            totalUsers:totalUsers,
            activePercentageUsers: activePercentageUsers,
            inactivePercentageUsers: inactivePercentageUsers
        });
    } catch (error) {
        res.status(500).json({ error: 'No se pudo obtener el reporte de los usuarios' });
    }
};

export{
    register,
    logout,
    authenticate,
    listUsers,
    updateUser,
    listRoles,
    deleteUser,
    userReport
}