const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const UserOrganisation = db.userOrganisation;
const Organisations = db.organisation;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Email
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (user) {
            return res.status(400).send({
                message: "Failed! Email is already in use!"
            });
        }

        next();
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate!" + error
        });
    }
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }

    next();
};

// checkPeopleInOrganisation = async (req, res, next) => {
    
// }

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;