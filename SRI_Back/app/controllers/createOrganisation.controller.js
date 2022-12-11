const db = require("../models");

const {organisation: Organisation} = db;
const generator = require('generate-password');

exports.createOrganisation = async (req, res) => {
    try {

        const code = generator.generate({
            length: 10,
            numbers: true
        })

        const organisation = await Organisation.create({
            organisationsName: req.body.organisationsName,
            organisationsCode: code
        })

        if(organisation){
            res.send({
                message: "Organisation registered successfully"
            })
        }


    } catch (error) {
        res.status(500).send({
            message: error.message
        });
    }
}