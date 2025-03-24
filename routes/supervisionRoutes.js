import express from 'express'
import { createSupervision, getSupervisionByStudyId} from '../controllers/supervisionController.js'

const router = express.Router()

router.post('/create-supervision', createSupervision)
router.get('/list-supervision/:studyId', getSupervisionByStudyId)


export default router;