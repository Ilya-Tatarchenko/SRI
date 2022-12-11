<template>
  <div class="card card-container">
    <form name="form">
      <div class="form-group">
        <label for="buildingTypeId">Building Type</label>
        <select
          v-model="buildingTypes"
          type="text"
          class="form-control"
          name="buildingTypeId"
        >
          <option v-for = "buildingType in buildingTypes" :key="buildingType.buildingTypeName">
            {{ buildingType.buildingTypeName }}
          </option>
        </select>
      </div>
    </form>
  </div>
</template>

<script>
import BuildingDataService from '../services/building-data.service';

export default {
  name: 'CreateBuilding',
  data() {
    return {
      buildingTypes: [],
    };
  },
  methods: {
    getBuildingType() {
      BuildingDataService.getBuildingType()
        .then((response) => {
            this.buildingTypes = response.data;
            console.log(this.buildingTypes);
        })
        .catch((e) => {
            console.log(e);
        });
    },
  },
  mounted() {
    this.getBuildingType();
  }
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 550px;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>