import { check, validationResult } from 'express-validator'
import {Project} from '../models/index.js'


const listProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json({ projects });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar los projectos' });
    }
}

const createProject = async (req, res) => {
    try {
        const {
            code,
            name,
            status,
            surveyId,
            regionSurveyName,
            comunaSurveyName,
            umpSurveyName
        } = req.body;
        
        const newProject = await Project.create({
            code,
            name,
            status,
            surveyId,
            regionSurveyName,
            comunaSurveyName,
            umpSurveyName
        });

        res.status(201).json({ project: newProject });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
}


const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            code,
            name,
            status,
            surveyId,
            regionSurveyName,
            comunaSurveyName,
            umpSurveyName
        } = req.body;
        
        const project = await Project.findByPk(id);
        if (project) {
            project.code = code;
            project.name = name;
            project.status = status;
            project.surveyId = surveyId;
            project.regionSurveyName = regionSurveyName;
            project.comunaSurveyName = comunaSurveyName;
            project.umpSurveyName = umpSurveyName;
            await project.save();
            res.status(200).json({ project });
        } else {
            res.status(404).json({ error: 'Proyecto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
}


const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByPk(id);
        if (project) {
            await project.destroy();
            res.status(200).json({ message: 'Proyecto eliminado' });
        } else {
            res.status(404).json({ error: 'Proyecto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
}


export{
    listProjects,
    createProject,
    updateProject,
    deleteProject
}