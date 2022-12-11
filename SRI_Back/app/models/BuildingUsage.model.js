module.exports = (sequelize, Sequelize) => {
    const BuidingUsage = sequelize.define("BuidingUsage", {
        buidingUsageId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        buildingUsageName: {
            type: Sequelize.STRING(100)
        }
    }, {
        timestamps: false
    });

    return BuidingUsage;
};