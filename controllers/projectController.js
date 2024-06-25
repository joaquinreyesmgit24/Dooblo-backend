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
        const {code, name, surveyID, status, RegionVarName, ComunaVarName, UMPVarName} = req.body;
        
        const project = await Project.create({
            code,
            name,
            status,
            surveyID,
            RegionVarName,
            ComunaVarName,
            UMPVarName
        });
        const projects = await Project.findAll();

        res.status(200).json({ msg: 'Proyecto creado correctamente', projects });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
}


const updateProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const {code, name, surveyID, status, RegionVarName, ComunaVarName, UMPVarName} = req.body;
        const project = await Project.findByPk(projectId);
        if(!project){
            return res.status(400).json({ error: 'El proyecto no existe' });
        }
        project.set({
            code,
            name,
            surveyID,
            status,
            RegionVarName,
            ComunaVarName,
            UMPVarName
        })
        await project.save()
        const projects = await Project.findAll();
        res.status(200).json({ msg: 'Proyecto actualizado correctamente', projects });
        
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