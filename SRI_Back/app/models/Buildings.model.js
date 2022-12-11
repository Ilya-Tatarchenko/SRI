module.exports = (sequelize, Sequelize) => {
    const Building = sequelize.define("Buildings", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        validUser: {
            type: Sequelize.INTEGER
        },
        buildingTypeId: {
            type: Sequelize.INTEGER
        },
        buidingUsageId: {
            type: Sequelize.INTEGER
        },
        climateZoneId: {
            type: Sequelize.INTEGER
        },
        areaId: {
            type: Sequelize.INTEGER
        },
        yearId: {
            type: Sequelize.INTEGER
        },
        countryId: {
            type: Sequelize.INTEGER
        },
        organisationId: {
            type: Sequelize.INTEGER
        },
        buildingState: {
            type: Sequelize.STRING(255)
        },
        comment: {
            type: Sequelize.STRING(255)
        },
        postIndex: {
            type: Sequelize.INTEGER
        },
        city: {
            type: Sequelize.STRING(50)
        },
        address: {
            type: Sequelize.STRING(255)
        },
        buildingNumber: {
            type: Sequelize.INTEGER
        },
        SRI: {
            type: Sequelize.FLOAT
        }
    });

    return Building;
};