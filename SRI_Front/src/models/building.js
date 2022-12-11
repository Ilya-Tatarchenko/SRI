export default class Building {
    constructor(validUser, 
                buildingTypeId, 
                buidingUsageId, 
                climateZoneId, 
                areaId, 
                yearId, 
                countryId, 
                organisationId, 
                buildingState, 
                comment,
                postIndex,
                city,
                address,
                buildingNumber) {
        this.validUser = validUser;
        this.buildingTypeId = buildingTypeId;
        this.buidingUsageId = buidingUsageId;
        this.climateZoneId = climateZoneId;
        this.areaId = areaId;
        this.yearId = yearId;
        this.countryId = countryId;
        this.organisationId = organisationId;
        this.buildingState = buildingState;
        this.comment = comment;
        this.postIndex = postIndex;
        this.city = city;
        this.address = address;
        this.buildingNumber = buildingNumber;
    }
}