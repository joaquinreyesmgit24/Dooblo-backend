import express from 'express'
import { register, logout, authenticate, listUsers, userUpdate, listRoles } from '../controllers/userController.js'

const router = express.Router()

router.post('/create-user',register)
router.post('/logout-user', logout)
router.post('/authenticate-user',authenticate)
router.get('/list-users', listUsers)
router.get('/list-roles', listRoles)
router.put('/update-user/:userId',userUpdate)


export default router;