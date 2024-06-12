import express from 'express'
import { register, logout, authenticate, listUsers, userUpdate } from '../controllers/userController.js'

const router = express.Router()

router.post('/registro',register)
router.post('/cerrar-sesion', logout)
router.post('/autenticar',authenticate)
router.get('/listar-usuarios', listUsers)
router.put('/actualizar/:userId',userUpdate)


export default router;