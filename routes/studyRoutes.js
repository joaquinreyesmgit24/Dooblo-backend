import express from 'express'
import { listStudies, createStudy, updateStudy, deleteStudy, studyReport, listActiveStudies, getStudyById } from '../controllers/studyController.js'

const router = express.Router()

//Projects
router.get('/list-studies', listStudies)
router.put('/update-study/:studyId', updateStudy)
router.get('/list-study/:studyId', getStudyById)
router.post('/create-study', createStudy)
router.delete('/delete-study/:studyId',deleteStudy)
router.get('/study-report',studyReport)
router.get('/list-active-studies',listActiveStudies)




export default router;