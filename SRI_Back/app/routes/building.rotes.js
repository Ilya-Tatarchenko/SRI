const controller = require("../controllers/building.controller");

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/building/create", controller.createBuilding);

    app.get("/api/building/getBuildingType", controller.getBuildingType);
}