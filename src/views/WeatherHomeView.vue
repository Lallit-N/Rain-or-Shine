<template>
  <div>
    <CenterPanel v-show="signedIn">
      <template slot="title">
        <v-row class="d-flex ma-auto justify-space-between">
          <h1>Saved Locations</h1>
          <v-btn tile color="primary" @click="setEditMode(!editMode)">
            <div v-if="!editMode">
              <v-icon left> mdi-pencil </v-icon>
              <v-text>Edit</v-text>
            </div>
            <v-text v-if="editMode">Cancel</v-text>
          </v-btn>
        </v-row>
      </template>
      <v-row slot="content" dense>
        <v-col>
          <v-divider></v-divider>
          <v-col v-for="location in savedLocations" :key="location" cols="12">
            <LocationCard :locationUrl="location" :isEditable="true" />
          </v-col>
          <h2 v-show="savedLocations.length == 0" class="ml-3">
            You don't have any saved locations right now.
          </h2>
        </v-col>
      </v-row>
    </CenterPanel>

    <CenterPanel>
      <template slot="title">
        <h1>Weather Near You</h1>
      </template>
      <v-row slot="content" dense>
        <v-col v-for="location in nearbyLocations" :key="location" cols="12">
          <LocationCard :locationUrl="location.url" :isEditable="false" />
        </v-col>
      </v-row>
    </CenterPanel>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import LocationCard from "@/components/LocationCard.vue";
import CenterPanel from "@/components/CenterPanel.vue";
import WeatherService from "@/services/WeatherService";

export default {
  data() {
    return {
      nearbyLocations: [],
    };
  },
  created() {
    this.fetchNearbyLocations();
  },
  components: {
    LocationCard,
    CenterPanel,
  },
  computed: mapState(["savedLocations", "signedIn", "editMode"]),
  methods: {
    fetchNearbyLocations() {
      WeatherService.getNearbyLocations(this.searchText)
        .then((response) => {
          this.nearbyLocations = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.nearbyLocations = [];
        });
    },
    ...mapActions(["setEditMode"]),
  },
};
</script>
