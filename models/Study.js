import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const Study = db.define('studies',{
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
    },
    expectedCase:{
        type:DataTypes.INTEGER
    },
    startDate:{
        type:DataTypes.DATE        
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
})

export default Study