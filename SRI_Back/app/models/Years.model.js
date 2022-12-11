module.exports = (sequelize, Sequelize) => {
    const Years = sequelize.define("Years", {
        yearId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        yearFrom: {
            type: Sequelize.INTEGER
        },
        yearTo: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return Years;
};