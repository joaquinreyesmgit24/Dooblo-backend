import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const Supervision = db.define('supervisions',{
    subjNum:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mail:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

export default Supervision