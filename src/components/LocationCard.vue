<template>
  <v-card
    class="pa-5 ma-1 align-center"
    style="cursor: pointer"
    @click="navToDetails()"
  >
    <v-row class="d-flex align-center justify-space-between">
      <v-col class="text-no-wrap">
        <v-card-title class="text-h4">{{ weather.location.name }}</v-card-title>

        <v-card-subtitle class="text-h6">
          {{ weather.location.region }}
        </v-card-subtitle>
      </v-col>

      <v-row class="d-flex align-center justify-start">
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-col v-show="!isEditable || !editMode">
          <v-img
            contain
            height="110"
            :src="weather.current.condition.icon"
            alt=""
          ></v-img>
        </v-col>
        <v-col v-show="!isEditable || !editMode">
          <v-text v-if="isCelsius" class="text-h3">
            {{ Math.round(weather.current.temp_c) }}&deg;C
          </v-text>
          <v-text v-else class="text-h3">
            {{ Math.round(weather.current.temp_f) }}&deg;F
          </v-text>
        </v-col>

        <v-col v-show="isEditable && editMode">
          <v-btn height="60" @click="removeLocation(locationUrl)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>

<script>
import WeatherService from "@/services/WeatherService";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    locationUrl: {
      type: String,
      required: true,
    },
    isEditable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      weather: {},
    };
  },
  computed: mapState(["editMode", "isCelsius"]),
  created() {
    WeatherService.getWeather(this.locationUrl)
      .then((response) => {
        this.weather = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    navToDetails() {
      if (!this.editMode) {
        this.$router.push({
          name: "weather-detail",
          params: {
            url: this.locationUrl,
          },
        });
      }
    },
    ...mapActions(["removeLocation"]),
  },
};
</script>
