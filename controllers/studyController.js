import { check, validationResult } from 'express-validator'
import {Study, Sequelize} from '../models/index.js'

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
        const {code, name, surveyID, status, RegionVarName, ComunaVarName, UMPVarName, expectedCases, startDate, expectedCasesRegion1,expectedCasesRegion2,expectedCasesRegion3,expectedCasesRegion4,
            expectedCasesRegion5,expectedCasesRegion6,expectedCasesRegion7,expectedCasesRegion8,expectedCasesRegion9,expectedCasesRegion10,expectedCasesRegion11,expectedCasesRegion12,expectedCasesRegion13,
            expectedCasesRegion14,expectedCasesRegion15,expectedCasesRegion16
        } = req.body;
        const study = await Study.create({
            code, name, surveyID, status, RegionVarName, ComunaVarName, UMPVarName, expectedCases, startDate, expectedCasesRegion1,expectedCasesRegion2,expectedCasesRegion3,expectedCasesRegion4,
            expectedCasesRegion5,expectedCasesRegion6,expectedCasesRegion7,expectedCasesRegion8,expectedCasesRegion9,expectedCasesRegion10,expectedCasesRegion11,expectedCasesRegion12,expectedCasesRegion13,
            expectedCasesRegion14,expectedCasesRegion15,expectedCasesRegion16
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
        const {code, name, surveyID, status, RegionVarName, ComunaVarName, UMPVarName, expectedCases, startDate, expectedCasesRegion1,expectedCasesRegion2,expectedCasesRegion3,expectedCasesRegion4,
            expectedCasesRegion5,expectedCasesRegion6,expectedCasesRegion7,expectedCasesRegion8,expectedCasesRegion9,expectedCasesRegion10,expectedCasesRegion11,expectedCasesRegion12,expectedCasesRegion13,
            expectedCasesRegion14,expectedCasesRegion15,expectedCasesRegion16} = req.body;
        const study = await Study.findByPk(studyId);
        if(!study){
            return res.status(400).json({ error: 'El estudio no existe' });
        }
        study.set({
            code, name, surveyID, status, RegionVarName, ComunaVarName, UMPVarName, expectedCases, startDate, expectedCasesRegion1,expectedCasesRegion2,expectedCasesRegion3,expectedCasesRegion4,
            expectedCasesRegion5,expectedCasesRegion6,expectedCasesRegion7,expectedCasesRegion8,expectedCasesRegion9,expectedCasesRegion10,expectedCasesRegion11,expectedCasesRegion12,expectedCasesRegion13,
            expectedCasesRegion14,expectedCasesRegion15,expectedCasesRegion16
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

const studyReport = async (req, res) => {
    try {
        // Obtener el año actual y el año hace 5 años
        const endYear = new Date().getFullYear();
        const startYear = endYear - 5;
        // Obtener la cantidad de estudios por año
        const studiesByYear = await Study.findAll({
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('startDate')), 'year'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ],
            where: Sequelize.where(
                Sequelize.fn('YEAR', Sequelize.col('startDate')),
                {
                    [Sequelize.Op.between]: [startYear, endYear]
                }
            ),
            group: ['year'],
            order: [['year', 'ASC']]
        });

        // Formatear la respuesta
        const result = studiesByYear.map(row => ({
            year: row.get('year'),
            count: row.get('count')
        }));

        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'No se pudo obtener el reporte de los estudios' });
    }
}

export{
    listStudies,
    createStudy,
    updateStudy,
    deleteStudy,
    studyReport
}