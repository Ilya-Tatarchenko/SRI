module.exports = (sequelize, Sequelize) => {
    const Organisation = sequelize.define("Organisations", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        organisationsName: {
            type: Sequelize.STRING(100)
        },
        organisationsCode: {
            type: Sequelize.STRING(100)
        }
    });

    return Organisation;
};