import User from './User.js'
import Role from './Role.js'
import Study from './Study.js'

Role.hasMany(User, {foreignKey:'roleId'})
User.belongsTo(Role, {foreignKey: 'roleId'})



export{
    User,
    Role,
    Study
}