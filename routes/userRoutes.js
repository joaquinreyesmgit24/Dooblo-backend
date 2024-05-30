import express from 'express'
import { register, logout, authenticate } from '../controllers/userController.js'

const router = express.Router()

router.post('/registro',register)
router.post('/cerrar-sesion', logout )
router.post('/autenticar',authenticate )


export default router;