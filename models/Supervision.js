import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const Supervision = db.define('supervisions',{
    subjNum:{
        type:DataTypes.STRING,
        allowNull:false
    },
})

export default Supervision