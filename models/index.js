import User from './User.js'
import Role from './Role.js'
import Study from './Study.js'
import Supervision from './Supervision.js'
import Sequelize  from 'sequelize'


Role.hasMany(User, {foreignKey:'roleId'})
User.belongsTo(Role, {foreignKey: 'roleId'})
Study.hasMany(Supervision, {foreignKey: 'studyId'})
Supervision.belongsTo(Study, {foreignKey:'studyId'})

export{
    User,
    Role,
    Study,
    Sequelize
}