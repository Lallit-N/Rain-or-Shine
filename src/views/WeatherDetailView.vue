<template>
  <CenterPanel>
    <template slot="content">
      <v-list-item class="mt-n10">
        <v-list-item-content>
          <v-row class="my-auto align-center">
            <v-col>
              <v-list-item-title class="text-h2">
                {{ weatherData.location.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-h4">
                {{ weatherData.location.region }}
              </v-list-item-subtitle>
              <v-list-item-text class="text-h6">
                {{ weatherData.location.localtime }}
              </v-list-item-text>
            </v-col>

            <v-col class="align-center">
              <v-img
                contain
                height="160"
                :src="weatherData.current.condition.icon"
                alt=""
              />
            </v-col>
            <v-col class="align-center text-center">
              <v-text v-if="isCelsius" class="text-h2">
                {{ Math.round(weatherData.current.temp_c) }}&deg;C
              </v-text>
              <v-text v-else class="text-h2">
                {{ Math.round(weatherData.current.temp_f) }}&deg;F
              </v-text>

              <v-row class="ma-auto align-center text-center">
                <v-text class="text-h5 ma-auto">
                  {{ weatherData.current.condition.text }}
                </v-text>
              </v-row>

              <v-row class="ma-auto align-center">
                <v-text v-if="isCelsius" class="text-h5 ma-auto">
                  Hi:
                  {{
                    Math.round(
                      weatherData.forecast.forecastday[0].day.maxtemp_c
                    )
                  }}&deg;C
                </v-text>
                <v-text v-else class="text-h5 ma-auto">
                  Hi:
                  {{
                    Math.round(
                      weatherData.forecast.forecastday[0].day.maxtemp_f
                    )
                  }}&deg;F
                </v-text>

                <v-text class="text-h5 ma-auto">/</v-text>

                <v-text v-if="isCelsius" class="text-h5 ma-auto">
                  Lo:
                  {{
                    Math.round(
                      weatherData.forecast.forecastday[0].day.mintemp_c
                    )
                  }}&deg;C
                </v-text>
                <v-text v-else class="text-h5 ma-auto">
                  Lo:
                  {{
                    Math.round(
                      weatherData.forecast.forecastday[0].day.mintemp_f
                    )
                  }}&deg;F
                </v-text>
              </v-row>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon large>mdi-weather-windy</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle class="text-h5">
          {{ weatherData.current.wind_kph }} km/h
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon large>mdi-weather-rainy</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle class="text-h5">
          {{ weatherData.forecast.forecastday[0].day.daily_chance_of_rain }}%
        </v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list class="transparent">
        <h2 class="ml-4">3 Day Forecast</h2>
        <v-list-item
          v-for="item in weatherData.forecast.forecastday"
          :key="item.day"
        >
          <v-list-item-title class="text-h6">{{ item.date }}</v-list-item-title>

          <v-list-item-icon>
            <v-img contain :src="item.day.condition.icon" alt="" />
          </v-list-item-icon>

          <v-list-item-subtitle v-if="isCelsius" class="text-right text-h6">
            {{ Math.round(item.day.maxtemp_c) }}&deg;C /
            {{ Math.round(item.day.mintemp_c) }}&deg;C
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else class="text-right text-h6">
            {{ Math.round(item.day.maxtemp_f) }}&deg;F /
            {{ Math.round(item.day.mintemp_f) }}&deg;F
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          v-show="!isSavedLocation"
          tile
          color="primary"
          @click="addLocation(url)"
        >
          <v-icon left> mdi-plus </v-icon>
          <v-text>Add to Saved Locations</v-text>
        </v-btn>
        <v-btn
          v-show="isSavedLocation"
          tile
          color="primary"
          @click="removeLocation(url)"
        >
          <v-icon left> mdi-check </v-icon>
          <v-text>Added to Saved Locations</v-text>
        </v-btn>
      </v-card-actions>
    </template>
  </CenterPanel>
</template>

<script>
import WeatherService from "@/services/WeatherService";
import CenterPanel from "@/components/CenterPanel.vue";
import { mapState, mapActions } from "vuex";

export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  components: {
    CenterPanel,
  },
  data() {
    return {
      weatherData: {},
      isSavedLocation: false,
    };
  },
  computed: mapState(["savedLocations", "isCelsius"]),
  methods: mapActions(["addLocation", "removeLocation"]),
  created() {
    WeatherService.getWeatherForecast(this.url)
      .then((response) => {
        this.weatherData = response.data;
        console.log(this.weatherData);
      })
      .catch((error) => {
        console.log(error);
      });

    if (this.savedLocations.indexOf(this.url) === -1) {
      this.isSavedLocation = false;
    } else {
      this.isSavedLocation = true;
    }
  },
  watch: {
    url() {
      WeatherService.getWeatherForecast(this.url)
        .then((response) => {
          this.weatherData = response.data;
          console.log(this.weatherData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    savedLocations() {
      if (this.savedLocations.indexOf(this.url) === -1) {
        this.isSavedLocation = false;
      } else {
        this.isSavedLocation = true;
      }
    },
  },
};
</script>
