import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const Study = db.define('studies',{
    code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
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
    CorreoVarName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    DireccionVarName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    TelefonoVarName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    AreaVarName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    expectedCases:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    startDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    status:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    expectedCasesRegion1:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion1:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion1:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion2:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion2:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion2:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion3:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion3:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion3:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion4:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion4:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion4:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion5:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion5:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion5:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion6:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion6:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion6:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion7:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion7:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion7:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion8:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion8:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion8:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion9:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion9:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion9:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    
    expectedCasesRegion10:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion10:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion10:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion11:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion11:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion11:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion12:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion12:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion12:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion13:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion13:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion13:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion14:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion14:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion14:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion15:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion15:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion15:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRegion16:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesUrbanAreaRegion16:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    expectedCasesRuralAreaRegion16:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
})

export default Study