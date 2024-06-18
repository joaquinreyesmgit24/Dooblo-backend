import express from 'express'
import { listProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js'

const router = express.Router()

//Projects
router.get('/list-projects', listProjects)

export default router;