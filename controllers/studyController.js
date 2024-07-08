import { check, validationResult } from 'express-validator'
import {Study} from '../models/index.js'


const listStudies = async (req, res) => {
    try {
        const studies = await Study.findAll();
        res.status(200).json({ studies });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar los estudios' });
    }
}

const createStudy = async (req, res) => {
    try {
        const {code, name, surveyID, status, RegionVarName, ComunaVarName, UMPVarName} = req.body;
        
        const study = await Study.create({
            code,
            name,
            status,
            surveyID,
            RegionVarName,
            ComunaVarName,
            UMPVarName
        });
        const studies = await Study.findAll();

        res.status(200).json({ msg: 'Estudio creado correctamente', studies });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estudio' });
    }
}


const updateStudy = async (req, res) => {
    try {
        const { studyId } = req.params;
        const {code, name, surveyID, status, RegionVarName, ComunaVarName, UMPVarName} = req.body;
        const study = await Study.findByPk(studyId);
        if(!study){
            return res.status(400).json({ error: 'El estudio no existe' });
        }
        study.set({
            code,
            name,
            surveyID,
            status,
            RegionVarName,
            ComunaVarName,
            UMPVarName
        })
        await study.save()
        const studies = await Study.findAll();
        res.status(200).json({ msg: 'El estudio fue actualizado correctamente', studies });
        
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el estudio' });
    }
}


const deleteStudy= async (req, res) => {
    try {
        const { studyId } = req.params;
        const study = await Study.findOne({ where: { id:studyId } })
        if (!study) {
            res.status(404).json({ error: 'Estudio no encontrado' });
        }
        await study.destroy();
        const studies = await Study.findAll()
        res.status(200).json({ msg: 'Estudio eliminado correctamente', study, studies })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el estudio' });
    }
}


export{
    listStudies,
    createStudy,
    updateStudy,
    deleteStudy
}