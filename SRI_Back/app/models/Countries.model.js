module.exports = (sequelize, Sequelize) => {
    const Countryies = sequelize.define("Countryies", {
        countryId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        countryName: {
            type: Sequelize.STRING(100)
        }
    }, {
        timestamps: false
    });

    return Countryies;
};