const db = require("../models");
const {
    building: Building,
    user: User,
    userOrganisation: UserOrganisation,
    buildingType: BuildingType
} = db;

exports.createBuilding = async(req, res) => {
    try {

        let findUserId = async function(currentUser) {
            const user = await User.findOne({
                where: {
                    id: currentUser
                }
            })
            if(user){
                return user.id
            } else {
                res.send({
                    message: "User is not found"
                });
            }
        }

        let findOrganisationId = async function(currentUser) {
            const organisation = await UserOrganisation.findOne({
                where: {
                    userId: currentUser
                }
            })
            if(organisation){
                return organisation.organisationId
            } else {
                res.send({
                    message: "Organisation is not found"
                });
            }
        }

        const currentUserId = await findUserId(req.body.currentUserId);
        const currentOrganisationId = await findOrganisationId(req.body.currentUserId);

        const building = await Building.create({
            validUser: currentUserId,
            buildingTypeId: req.body.buildingTypeId,
            buidingUsageId: req.body.buidingUsageId,
            climateZoneId: req.body.climateZoneId,
            areaId: req.body.areaId,
            yearId: req.body.yearId,
            countryId: req.body.countryId,
            organisationId: currentOrganisationId,
            buildingState: req.body.buildingState,
            comment: req.body.comment,
            postIndex: req.body.postIndex,
            city: req.body.city,
            address: req.body.address,
            buildingNumber: req.body.buildingNumber
        });

        if(building) {
            res.send({
                message: "Building added succesfully"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}

exports.getBuildingType = async(req, res) => {
    BuildingType.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving tutorials."
            })
        })
}

exports.getBuildingUsage = async(req, res) => {
    
}

