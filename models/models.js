const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'USER'
    }
})

const AcademyDegree = sequelize.define('AcademyDegree', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    value: {
        type: DataTypes.STRING
    }
})

User.hasOne(AcademyDegree)
AcademyDegree.belongsTo(User)

module.exports = {
    User,
    AcademyDegree,
}