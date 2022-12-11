module.exports = (sequelize, Sequelize) => {
    const BuildingType = sequelize.define("BuildingType", {
        buildingTypeId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        buildingTypeName: {
            type: Sequelize.STRING(100)
        }
    }, {
        timestamps: false
    });

    return BuildingType;
};