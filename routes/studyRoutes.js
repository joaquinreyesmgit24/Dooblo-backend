import express from 'express'
import { listStudies, createStudy, updateStudy, deleteStudy } from '../controllers/studyController.js'

const router = express.Router()

//Projects
router.get('/list-studies', listStudies)
router.put('/update-study/:studyId', updateStudy)
router.post('/create-study', createStudy)
router.delete('/delete-study/:studyId',deleteStudy)


export default router;