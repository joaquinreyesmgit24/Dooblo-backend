import express from 'express'
import { createSupervision} from '../controllers/supervisionController.js'

const router = express.Router()

router.post('/create-supervision', createSupervision)



export default router;