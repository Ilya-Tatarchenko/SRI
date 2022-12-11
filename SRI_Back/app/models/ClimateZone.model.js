module.exports = (sequelize, Sequelize) => {
    const ClimateZone = sequelize.define("ClimateZone", {
        climateZoneId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        climateZoneName: {
            type: Sequelize.STRING(100)
        }
    }, {
        timestamps: false
    });

    return ClimateZone;
};