import { check, validationResult } from 'express-validator'
import {Supervision} from '../models/index.js'

// Ruta para guardar encuestas

const createSupervision = async (req, res) => {
    try {
      // Obtener los datos del cuerpo de la solicitud
      const  encuestasParaGuardar  = req.body; // Se espera un array de objetos 'encuestasParaGuardar' desde el frontend
      // Validar si el array está vacío
    if (!Array.isArray(encuestasParaGuardar) || encuestasParaGuardar.length === 0) {
        return res.status(400).json({ message: 'No hay encuestas para guardar' });
    }
      // Realizar un bulkCreate para insertar las encuestas en la base de datos
    const result = await Supervision.bulkCreate(encuestasParaGuardar);

      // Responder con éxito y los datos guardados
    res.status(201).json({
        message: 'Encuestas guardadas correctamente',
        data: result, // Puedes devolver el array con las encuestas creadas
    });
    } catch (error) {
        console.error('Error al guardar supervisión:', error);
        res.status(500).json({ message: 'Error interno del servidor', error });
    }
}

const getSupervisionByStudyId = async (req,res)=>{
  try {
    const { studyId } = req.params;
    const supervisions = await Supervision.findAll({
        where: {
            studyId: studyId
        }
    });

    // Si se encuentra el estudio, devuelve la respuesta con los datos
    res.status(200).json({ supervisions });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el estudio' });
    }
}


export{
  createSupervision,
  getSupervisionByStudyId
}