const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../../config/config');

const dbConfig = config.db;

const { transformToPlain } = require('./plugins');

const db = {};

const basename = path.basename(__filename);
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'postgres',
  logging: false,
});

// Load all models
fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    /* eslint-disable-next-line import/no-dynamic-require, global-require */
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    // Add a centralized afterFind hook for transforming results
    model.addHook('afterFind', (result) => {
      if (result) {
        return transformToPlain(result);
      }
      return result;
    });

    db[model.name] = model;
  });

// Apply associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
