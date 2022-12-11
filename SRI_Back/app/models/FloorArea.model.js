module.exports = (sequelize, Sequelize) => {
    const FloorArea = sequelize.define("FloorArea", {
        areaId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        areaFrom: {
            type: Sequelize.INTEGER
        },
        areaTo: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return FloorArea;
};