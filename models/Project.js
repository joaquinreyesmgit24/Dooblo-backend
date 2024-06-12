import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const Project = db.define('projects',{
    code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    surveyID:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    RegionVarName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    ComunaVarName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    UMPVarName:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

export default Project