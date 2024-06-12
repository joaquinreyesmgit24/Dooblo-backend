import express from 'express'
import { listProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js'

const router = express.Router()

//Projects
router.get('/listar-proyectos', listProjects)

export default router;