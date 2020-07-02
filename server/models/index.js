'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json')) [
    env
];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
        defind: {
            charset: 'utf-8',
            collate: 'utf8_general_ci'
        }
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully");
}).catch(err => {
    console.log('Unable to connect to the databse: ', err);
});

db.Teacher = require('./teacher')(sequelize, $equelize);
db.Class = require('./class')(sequelize, $equelize);

// N대 N 관게 (Teachers : Classes)
db.Teacher.belongsToMany(db.Class, {
    through : 'sceudle',
    foreignKey : 'teacher_id'
});
db.Class.belongsToMany(db.Teacher, {
    through : 'scedule',
    foreignKey : 'class_id',
});

db.secret = "(9*)5$&!3%^0%^@@2$1!#5@!4";
module.exports = db;