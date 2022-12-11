import axios from 'axios';
const API_URL = 'http://localhost:8080/api/building/';

class BuildingDataService {
    getBuildingType() {
        return axios.get(API_URL + 'getBuildingType');
    }
}

export default new  BuildingDataService();