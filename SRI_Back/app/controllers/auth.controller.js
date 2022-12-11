const db = require("../models");
const config = require("../config/auth.config");
const {
    user: User,
    //role: Role,
    refreshToken: RefreshToken,
    organisation: Organisations,
    userOrganisation: UserOrganisation
} = db;

// const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    // Save User to Database
    try {

        //find organisationsCode
        let code = await Organisations.findOne({
            where: {
                organisationsCode: req.body.organisationsCode
            }
        })

        //find organisationsId using organisationsCode
        let findOrganisationId = async function (code) {
            const organisationId = await Organisations.findOne({
                where: {
                    organisationsCode: code
                }
            });
            if (organisationId) {
                return organisationId.id
            } else {
                res.send({
                    message: "Organisation is not found"
                });
            }
        }

        const organisationId = await findOrganisationId(req.body.organisationsCode);

        //find if user is in Organisation
        const userInOrganisation = await UserOrganisation.findAndCountAll({
            where: {
                organisationId: organisationId
            }
        })

        // console.log(userInOrganisation);

        if (code) {
            if(userInOrganisation.count < 5) {
                const user = await User.create({
                    gender: req.body.gender,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: bcrypt.hashSync(req.body.password, 8),
                });
    
                if (userInOrganisation.count > 0) {
                    // user has role = 1 (User)
                    const result = user.setRoles(1);
    
                    if (result) res.send({
                        message: "User registered successfully!"
                    });
                } else {
                    // user has role = 3 (Admin)
                    const result = user.setRoles(3);
                    if (result) res.send({
                        message: "User registered successfully!"
                    });
                }
    
                await UserOrganisation.create({
                    userId: user.id,
                    organisationId: organisationId
                });
            } else {
                res.send({
                    message: "Too many people in this organisation"
                })
            }
        } else {
            res.send({
                message: "Invalid code or code is not given"
            })
        }


    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
};

exports.signin = (req, res) => {
    User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(async (user) => {
            if (!user) {
                return res.status(404).send({
                    message: "User Not found."
                });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign({
                id: user.id
            }, config.secret, {
                expiresIn: config.jwtExpiration
            });

            let refreshToken = await RefreshToken.createToken(user);

            let authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }

                res.status(200).send({
                    id: user.id,
                    gender: req.body.gender,
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    phone: req.body.phone,
                    roles: authorities,
                    accessToken: token,
                    refreshToken: refreshToken,
                });
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.refreshToken = async (req, res) => {
    const {
        refreshToken: requestToken
    } = req.body;

    if (requestToken == null) {
        return res.status(403).json({
            message: "Refresh Token is required!"
        });
    }

    try {
        let refreshToken = await RefreshToken.findOne({
            where: {
                token: requestToken
            }
        });

        console.log(refreshToken)

        if (!refreshToken) {
            res.status(403).json({
                message: "Refresh token is not in database!"
            });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.destroy({
                where: {
                    id: refreshToken.id
                }
            });

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        const user = await refreshToken.getUser();
        let newAccessToken = jwt.sign({
            id: user.id
        }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({
            message: err
        });
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({
            message: "You've been signed out!"
        });
    } catch (err) {
        this.next(err);
    }
};