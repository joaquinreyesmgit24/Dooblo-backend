import express from 'express'
import { register, logout, authenticate, listUsers, userUpdate, listRoles } from '../controllers/userController.js'

const router = express.Router()

router.post('/register',register)
router.post('/logout', logout)
router.post('/authenticate',authenticate)
router.get('/list-users', listUsers)
router.get('/list-roles', listRoles)
router.put('/update/:userId',userUpdate)


export default router;