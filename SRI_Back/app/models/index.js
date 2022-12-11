const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.user,
    dbConfig.password, {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models for authorization
db.user = require("../models/User.model.js")(sequelize, Sequelize);
db.role = require("../models/Rights.model.js")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.organisation = require("../models/Organisations.model")(sequelize, Sequelize);
db.userOrganisation = require("../models/UserOrganisation.model")(sequelize, Sequelize);

//Models for Building's info
db.building = require("../models/Buildings.model.js")(sequelize, Sequelize);
db.buildingType = require("../models/BuildingType.model.js")(sequelize, Sequelize);
db.buildingUsage = require("../models/BuildingUsage.model.js")(sequelize, Sequelize);
db.climateZone = require("../models/ClimateZone.model.js")(sequelize, Sequelize);
db.country = require("../models/Countries.model.js")(sequelize, Sequelize);
db.floorArea = require("../models/FloorArea.model.js")(sequelize, Sequelize);
db.years = require("../models/Years.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
});
db.user.hasOne(db.refreshToken, {
    foreignKey: 'userId',
    targetKey: 'id'
});

db.ROLES = [1, 2, 3];

module.exports = db;