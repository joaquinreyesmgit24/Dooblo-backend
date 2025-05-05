import express from 'express'
import { createSupervision, getSupervisionByStudyId, deleteSupervisions} from '../controllers/supervisionController.js'

const router = express.Router()

router.post('/create-supervision', createSupervision)
router.get('/list-supervision/:studyId', getSupervisionByStudyId)
router.delete('/delete-supervision/:studyId', deleteSupervisions)


export default router;