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

const getStudyById = async (req, res) => {
    try {
        // Obtén el ID desde los parámetros de la URL
        const { studyId } = req.params;

        // Busca el estudio por ID
        const study = await Study.findOne({
            where: {
                id: studyId // Filtramos por el ID proporcionado
            }
        });

        // Si no se encuentra el estudio, devuelve un error
        if (!study) {
            return res.status(404).json({ error: 'Estudio no encontrado' });
        }

        // Si se encuentra el estudio, devuelve la respuesta con los datos
        res.status(200).json({ study });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estudio' });
    }
}


const listActiveStudies = async (req, res) => {
    try {
        // Filtrar estudios que están activos
        const studies = await Study.findAll({
            where: {
                status: true // Solo estudios con status `true` (activos)
            }
        });
        res.status(200).json({ studies });
    } catch (error) {
        res.status(500).json({ error: 'Error al listar los estudios' });
    }
}

const createStudy = async (req, res) => {
    try {
        await check('code').notEmpty().withMessage('El código del estudio no puede ir vacío').run(req);
        await check('name').isLength({ min: 6 }).withMessage('El nombre del estudio debe ser de al menos 6 caracteres').run(req);
        await check('surveyID').notEmpty().withMessage('El id de la encuesta no puede ir vacío').run(req);
        await check('TelefonoVarName').notEmpty().withMessage('El nombre de la variable teléfono no puede ir vacío').run(req);
        await check('CorreoVarName').notEmpty().withMessage('El nombre de la variable correo no puede ir vacío').run(req);
        await check('DireccionVarName').notEmpty().withMessage('El nombre de la variable dirección no puede ir vacío').run(req);
        await check('RegionVarName').notEmpty().withMessage('El nombre de la variable región no puede ir vacío').run(req);
        await check('ComunaVarName').notEmpty().withMessage('El nombre de la variable comuna no puede ir vacío').run(req);
        await check('UMPVarName').notEmpty().withMessage('El nombre de la variable UMP no puede ir vacío').run(req);
        await check('AreaVarName').notEmpty().withMessage('El nombre de la área comuna no puede ir vacío').run(req);
        await check('expectedCases').notEmpty().withMessage('La cantidad de casos esperados del estudio no puede ir vacío').run(req);
        await check('startDate').notEmpty().withMessage('La fecha de inicio del estudio no puede ir vacío').run(req);
        await check('expectedCasesRegion1').notEmpty().withMessage('La cantidad de casos esperados de la región 1 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion1').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 1 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion1').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 1 no puede ir vacío').run(req);
        await check('expectedCasesRegion2').notEmpty().withMessage('La cantidad de casos esperados de la región 2 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion2').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 2 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion2').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 2 no puede ir vacío').run(req);
        await check('expectedCasesRegion3').notEmpty().withMessage('La cantidad de casos esperados de la región 3 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion3').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 3 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion3').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 3 no puede ir vacío').run(req);
        await check('expectedCasesRegion4').notEmpty().withMessage('La cantidad de casos esperados de la región 4 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion4').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 4 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion4').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 4 no puede ir vacío').run(req);
        await check('expectedCasesRegion5').notEmpty().withMessage('La cantidad de casos esperados de la región 5 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion5').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 5 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion5').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 5 no puede ir vacío').run(req);
        await check('expectedCasesRegion6').notEmpty().withMessage('La cantidad de casos esperados de la región 6 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion6').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 6 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion6').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 6 no puede ir vacío').run(req);
        await check('expectedCasesRegion7').notEmpty().withMessage('La cantidad de casos esperados de la región 7 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion7').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 7 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion7').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 7 no puede ir vacío').run(req);
        await check('expectedCasesRegion8').notEmpty().withMessage('La cantidad de casos esperados de la región 8 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion8').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 8 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion8').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 8 no puede ir vacío').run(req);
        await check('expectedCasesRegion9').notEmpty().withMessage('La cantidad de casos esperados de la región 9 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion9').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 9 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion9').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 9 no puede ir vacío').run(req);
        await check('expectedCasesRegion10').notEmpty().withMessage('La cantidad de casos esperados de la región 10 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion10').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 10 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion10').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 10 no puede ir vacío').run(req);
        await check('expectedCasesRegion11').notEmpty().withMessage('La cantidad de casos esperados de la región 11 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion11').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 11 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion11').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 11 no puede ir vacío').run(req);
        await check('expectedCasesRegion12').notEmpty().withMessage('La cantidad de casos esperados de la región 12 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion12').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 12 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion12').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 12 no puede ir vacío').run(req);
        await check('expectedCasesRegion13').notEmpty().withMessage('La cantidad de casos esperados de la región 13 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion13').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 13 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion13').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 13 no puede ir vacío').run(req);
        await check('expectedCasesRegion14').notEmpty().withMessage('La cantidad de casos esperados de la región 14 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion14').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 14 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion14').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 14 no puede ir vacío').run(req);
        await check('expectedCasesRegion15').notEmpty().withMessage('La cantidad de casos esperados de la región 15 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion15').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 15 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion15').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 15 no puede ir vacío').run(req);
        await check('expectedCasesRegion16').notEmpty().withMessage('La cantidad de casos esperados de la región 16 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion16').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 16 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion16').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 16 no puede ir vacío').run(req);
        
        let result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }

        const {code, name, surveyID, status, TelefonoVarName, CorreoVarName,
            DireccionVarName, RegionVarName, ComunaVarName, UMPVarName, AreaVarName, expectedCases, startDate, expectedCasesRegion1,
            expectedCasesUrbanAreaRegion1,
            expectedCasesRuralAreaRegion1,
            expectedCasesRegion2,
            expectedCasesUrbanAreaRegion2,
            expectedCasesRuralAreaRegion2,
            expectedCasesRegion3,
            expectedCasesUrbanAreaRegion3,
            expectedCasesRuralAreaRegion3,
            expectedCasesRegion4,
            expectedCasesUrbanAreaRegion4,
            expectedCasesRuralAreaRegion4,
            expectedCasesRegion5,
            expectedCasesUrbanAreaRegion5,
            expectedCasesRuralAreaRegion5,
            expectedCasesRegion6,
            expectedCasesUrbanAreaRegion6,
            expectedCasesRuralAreaRegion6,
            expectedCasesRegion7,
            expectedCasesUrbanAreaRegion7,
            expectedCasesRuralAreaRegion7,
            expectedCasesRegion8,
            expectedCasesUrbanAreaRegion8,
            expectedCasesRuralAreaRegion8,
            expectedCasesRegion9,
            expectedCasesUrbanAreaRegion9,
            expectedCasesRuralAreaRegion9,
            expectedCasesRegion10,
            expectedCasesUrbanAreaRegion10,
            expectedCasesRuralAreaRegion10,
            expectedCasesRegion11,
            expectedCasesUrbanAreaRegion11,
            expectedCasesRuralAreaRegion11,
            expectedCasesRegion12,
            expectedCasesUrbanAreaRegion12,
            expectedCasesRuralAreaRegion12,
            expectedCasesRegion13,
            expectedCasesUrbanAreaRegion13,
            expectedCasesRuralAreaRegion13,
            expectedCasesRegion14,
            expectedCasesUrbanAreaRegion14,
            expectedCasesRuralAreaRegion14,
            expectedCasesRegion15,
            expectedCasesUrbanAreaRegion15,
            expectedCasesRuralAreaRegion15,
            expectedCasesRegion16,
            expectedCasesUrbanAreaRegion16,
            expectedCasesRuralAreaRegion16
        } = req.body

        const existStudy = await Study.findOne({ where: { name } })
        if (existStudy) {
            return res.status(400).json({ error: 'El estudio ya existe' });
        }
    
        const study = await Study.create({
            code, name, surveyID, status, TelefonoVarName, CorreoVarName,
            DireccionVarName, RegionVarName, ComunaVarName, UMPVarName, AreaVarName, expectedCases, startDate, expectedCasesRegion1,
            expectedCasesUrbanAreaRegion1,
            expectedCasesRuralAreaRegion1,
            expectedCasesRegion2,
            expectedCasesUrbanAreaRegion2,
            expectedCasesRuralAreaRegion2,
            expectedCasesRegion3,
            expectedCasesUrbanAreaRegion3,
            expectedCasesRuralAreaRegion3,
            expectedCasesRegion4,
            expectedCasesUrbanAreaRegion4,
            expectedCasesRuralAreaRegion4,
            expectedCasesRegion5,
            expectedCasesUrbanAreaRegion5,
            expectedCasesRuralAreaRegion5,
            expectedCasesRegion6,
            expectedCasesUrbanAreaRegion6,
            expectedCasesRuralAreaRegion6,
            expectedCasesRegion7,
            expectedCasesUrbanAreaRegion7,
            expectedCasesRuralAreaRegion7,
            expectedCasesRegion8,
            expectedCasesUrbanAreaRegion8,
            expectedCasesRuralAreaRegion8,
            expectedCasesRegion9,
            expectedCasesUrbanAreaRegion9,
            expectedCasesRuralAreaRegion9,
            expectedCasesRegion10,
            expectedCasesUrbanAreaRegion10,
            expectedCasesRuralAreaRegion10,
            expectedCasesRegion11,
            expectedCasesUrbanAreaRegion11,
            expectedCasesRuralAreaRegion11,
            expectedCasesRegion12,
            expectedCasesUrbanAreaRegion12,
            expectedCasesRuralAreaRegion12,
            expectedCasesRegion13,
            expectedCasesUrbanAreaRegion13,
            expectedCasesRuralAreaRegion13,
            expectedCasesRegion14,
            expectedCasesUrbanAreaRegion14,
            expectedCasesRuralAreaRegion14,
            expectedCasesRegion15,
            expectedCasesUrbanAreaRegion15,
            expectedCasesRuralAreaRegion15,
            expectedCasesRegion16,
            expectedCasesUrbanAreaRegion16,
            expectedCasesRuralAreaRegion16
        });
        const studies = await Study.findAll();

        res.status(200).json({ msg: 'Estudio creado correctamente', studies });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el estudio' });
    }
}


const updateStudy = async (req, res) => {
    try {
        await check('code').notEmpty().withMessage('El código del estudio no puede ir vacío').run(req);
        await check('name').isLength({ min: 6 }).withMessage('El nombre del estudio debe ser de al menos 6 caracteres').run(req);
        await check('surveyID').notEmpty().withMessage('El id de la encuesta no puede ir vacío').run(req);
        await check('TelefonoVarName').notEmpty().withMessage('El nombre de la variable teléfono no puede ir vacío').run(req);
        await check('CorreoVarName').notEmpty().withMessage('El nombre de la variable correo no puede ir vacío').run(req);
        await check('DireccionVarName').notEmpty().withMessage('El nombre de la variable dirección no puede ir vacío').run(req);
        await check('RegionVarName').notEmpty().withMessage('El nombre de la variable región no puede ir vacío').run(req);
        await check('ComunaVarName').notEmpty().withMessage('El nombre de la variable comuna no puede ir vacío').run(req);
        await check('UMPVarName').notEmpty().withMessage('El nombre de la variable UMP no puede ir vacío').run(req);
        await check('AreaVarName').notEmpty().withMessage('El nombre de la variable área no puede ir vacío').run(req);
        await check('expectedCases').notEmpty().withMessage('La cantidad de casos esperados del estudio no puede ir vacío').run(req);
        await check('startDate').notEmpty().withMessage('La fecha de inicio del estudio no puede ir vacío').run(req);
        await check('expectedCasesRegion1').notEmpty().withMessage('La cantidad de casos esperados de la región 1 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion1').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 1 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion1').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 1 no puede ir vacío').run(req);
        await check('expectedCasesRegion2').notEmpty().withMessage('La cantidad de casos esperados de la región 2 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion2').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 2 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion2').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 2 no puede ir vacío').run(req);
        await check('expectedCasesRegion3').notEmpty().withMessage('La cantidad de casos esperados de la región 3 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion3').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 3 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion3').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 3 no puede ir vacío').run(req);
        await check('expectedCasesRegion4').notEmpty().withMessage('La cantidad de casos esperados de la región 4 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion4').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 4 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion4').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 4 no puede ir vacío').run(req);
        await check('expectedCasesRegion5').notEmpty().withMessage('La cantidad de casos esperados de la región 5 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion5').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 5 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion5').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 5 no puede ir vacío').run(req);
        await check('expectedCasesRegion6').notEmpty().withMessage('La cantidad de casos esperados de la región 6 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion6').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 6 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion6').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 6 no puede ir vacío').run(req);
        await check('expectedCasesRegion7').notEmpty().withMessage('La cantidad de casos esperados de la región 7 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion7').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 7 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion7').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 7 no puede ir vacío').run(req);
        await check('expectedCasesRegion8').notEmpty().withMessage('La cantidad de casos esperados de la región 8 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion8').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 8 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion8').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 8 no puede ir vacío').run(req);
        await check('expectedCasesRegion9').notEmpty().withMessage('La cantidad de casos esperados de la región 9 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion9').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 9 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion9').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 9 no puede ir vacío').run(req);
        await check('expectedCasesRegion10').notEmpty().withMessage('La cantidad de casos esperados de la región 10 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion10').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 10 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion10').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 10 no puede ir vacío').run(req);
        await check('expectedCasesRegion11').notEmpty().withMessage('La cantidad de casos esperados de la región 11 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion11').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 11 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion11').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 11 no puede ir vacío').run(req);
        await check('expectedCasesRegion12').notEmpty().withMessage('La cantidad de casos esperados de la región 12 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion12').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 12 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion12').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 12 no puede ir vacío').run(req);
        await check('expectedCasesRegion13').notEmpty().withMessage('La cantidad de casos esperados de la región 13 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion13').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 13 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion13').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 13 no puede ir vacío').run(req);
        await check('expectedCasesRegion14').notEmpty().withMessage('La cantidad de casos esperados de la región 14 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion14').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 14 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion14').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 14 no puede ir vacío').run(req);
        await check('expectedCasesRegion15').notEmpty().withMessage('La cantidad de casos esperados de la región 15 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion15').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 15 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion15').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 15 no puede ir vacío').run(req);
        await check('expectedCasesRegion16').notEmpty().withMessage('La cantidad de casos esperados de la región 16 no puede ir vacío').run(req);
        await check('expectedCasesUrbanAreaRegion16').notEmpty().withMessage('La cantidad de casos esperados por zona urbana de la región 16 no puede ir vacío').run(req);
        await check('expectedCasesRuralAreaRegion16').notEmpty().withMessage('La cantidad de casos esperados por zona rural de la región 16 no puede ir vacío').run(req);

        let result = validationResult(req)
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() })
        }
        
        const { studyId } = req.params;
        const {code, name, surveyID, status, TelefonoVarName, CorreoVarName,
            DireccionVarName, RegionVarName, ComunaVarName, UMPVarName, AreaVarName, expectedCases, startDate, expectedCasesRegion1,
            expectedCasesUrbanAreaRegion1,
            expectedCasesRuralAreaRegion1,
            expectedCasesRegion2,
            expectedCasesUrbanAreaRegion2,
            expectedCasesRuralAreaRegion2,
            expectedCasesRegion3,
            expectedCasesUrbanAreaRegion3,
            expectedCasesRuralAreaRegion3,
            expectedCasesRegion4,
            expectedCasesUrbanAreaRegion4,
            expectedCasesRuralAreaRegion4,
            expectedCasesRegion5,
            expectedCasesUrbanAreaRegion5,
            expectedCasesRuralAreaRegion5,
            expectedCasesRegion6,
            expectedCasesUrbanAreaRegion6,
            expectedCasesRuralAreaRegion6,
            expectedCasesRegion7,
            expectedCasesUrbanAreaRegion7,
            expectedCasesRuralAreaRegion7,
            expectedCasesRegion8,
            expectedCasesUrbanAreaRegion8,
            expectedCasesRuralAreaRegion8,
            expectedCasesRegion9,
            expectedCasesUrbanAreaRegion9,
            expectedCasesRuralAreaRegion9,
            expectedCasesRegion10,
            expectedCasesUrbanAreaRegion10,
            expectedCasesRuralAreaRegion10,
            expectedCasesRegion11,
            expectedCasesUrbanAreaRegion11,
            expectedCasesRuralAreaRegion11,
            expectedCasesRegion12,
            expectedCasesUrbanAreaRegion12,
            expectedCasesRuralAreaRegion12,
            expectedCasesRegion13,
            expectedCasesUrbanAreaRegion13,
            expectedCasesRuralAreaRegion13,
            expectedCasesRegion14,
            expectedCasesUrbanAreaRegion14,
            expectedCasesRuralAreaRegion14,
            expectedCasesRegion15,
            expectedCasesUrbanAreaRegion15,
            expectedCasesRuralAreaRegion15,
            expectedCasesRegion16,
            expectedCasesUrbanAreaRegion16,
            expectedCasesRuralAreaRegion16} = req.body;
        const study = await Study.findByPk(studyId);

        if(!study){
            return res.status(400).json({ error: 'El estudio no existe' });
        }
        if (name !== study.name) {
            const exitStudy = await Study.findOne({ where: { name } });
            if (exitStudy) {
                return res.status(400).json({ error: 'El estudio ya existe' });
            }
        }

        study.set({
            code, name, surveyID, status, TelefonoVarName, CorreoVarName,
            DireccionVarName, RegionVarName, ComunaVarName, UMPVarName, AreaVarName, expectedCases, startDate, expectedCasesRegion1,
            expectedCasesUrbanAreaRegion1,
            expectedCasesRuralAreaRegion1,
            expectedCasesRegion2,
            expectedCasesUrbanAreaRegion2,
            expectedCasesRuralAreaRegion2,
            expectedCasesRegion3,
            expectedCasesUrbanAreaRegion3,
            expectedCasesRuralAreaRegion3,
            expectedCasesRegion4,
            expectedCasesUrbanAreaRegion4,
            expectedCasesRuralAreaRegion4,
            expectedCasesRegion5,
            expectedCasesUrbanAreaRegion5,
            expectedCasesRuralAreaRegion5,
            expectedCasesRegion6,
            expectedCasesUrbanAreaRegion6,
            expectedCasesRuralAreaRegion6,
            expectedCasesRegion7,
            expectedCasesUrbanAreaRegion7,
            expectedCasesRuralAreaRegion7,
            expectedCasesRegion8,
            expectedCasesUrbanAreaRegion8,
            expectedCasesRuralAreaRegion8,
            expectedCasesRegion9,
            expectedCasesUrbanAreaRegion9,
            expectedCasesRuralAreaRegion9,
            expectedCasesRegion10,
            expectedCasesUrbanAreaRegion10,
            expectedCasesRuralAreaRegion10,
            expectedCasesRegion11,
            expectedCasesUrbanAreaRegion11,
            expectedCasesRuralAreaRegion11,
            expectedCasesRegion12,
            expectedCasesUrbanAreaRegion12,
            expectedCasesRuralAreaRegion12,
            expectedCasesRegion13,
            expectedCasesUrbanAreaRegion13,
            expectedCasesRuralAreaRegion13,
            expectedCasesRegion14,
            expectedCasesUrbanAreaRegion14,
            expectedCasesRuralAreaRegion14,
            expectedCasesRegion15,
            expectedCasesUrbanAreaRegion15,
            expectedCasesRuralAreaRegion15,
            expectedCasesRegion16,
            expectedCasesUrbanAreaRegion16,
            expectedCasesRuralAreaRegion16
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
        const totalStudies = await Study.count();
        // Formatear la respuesta
        const result = {
            totalStudies,
            studiesByYear:studiesByYear.map(row => ({
            year: row.get('year'),
            count: row.get('count')
            }))
        }

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
    studyReport,
    listActiveStudies,
    getStudyById
}