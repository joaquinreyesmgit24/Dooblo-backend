import express from 'express'
import { register,authenticate } from '../controllers/userController.js'

const router = express.Router()

router.post('/registro',register)
router.post('/autenticar',authenticate )


export default router;