module.exports = (sequelize, Sequelize) => {
    const UserOrganisation = sequelize.define("User_Organisation", {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        organisationId: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });

    return UserOrganisation;
};