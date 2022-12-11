module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
        gender: {
            type: Sequelize.STRING(20)
        },
        name: {
            type: Sequelize.STRING(100)
        },
        surname: {
            type: Sequelize.STRING(100)
        },
        email: {
            type: Sequelize.STRING(50),
            unique: true
        },
        phone: {
            type: Sequelize.STRING(20)
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};