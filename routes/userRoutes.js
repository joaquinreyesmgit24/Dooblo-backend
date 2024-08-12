import express from 'express'
import multer from 'multer';
import { register, logout, authenticate, listUsers, updateUser,deleteUser, listRoles, userReport } from '../controllers/userController.js'

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router()

router.post('/create-user',upload.single('file'),register)
router.post('/logout-user', logout)
router.post('/authenticate-user',authenticate)
router.get('/list-users', listUsers)
router.get('/list-roles', listRoles)
router.get('/user-report', userReport)
router.put('/update-user/:userId',updateUser)
router.delete('/delete-user/:userId', deleteUser)

export default router;