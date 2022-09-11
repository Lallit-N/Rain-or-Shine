<template>
  <v-app-bar app color="primary" dark height="75">
    <v-toolbar-title
      style="cursor: pointer"
      @click="
        $router.push({
          name: 'weather-home',
        })
      "
    >
      <h1>Rain or Shine</h1>
    </v-toolbar-title>

    <v-col cols="4">
      <v-autocomplete
        label="Search For A Location"
        type="Location"
        prepend-icon="mdi-magnify"
        class="mt-5 ml-10"
        v-model="selectedLocationUrl"
        :search-input.sync="searchText"
        :items="resultLocations"
        item-text="url"
        @focus="getAutocompleteSearchResults"
        hide-no-data
      >
        <template v-slot:item="data">
          <v-list-item-content @click="navToDetails(data.item.url)">
            <v-list-item-title>{{ data.item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ data.item.region }}</v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>

    <v-spacer></v-spacer>

    <v-btn v-show="!signedIn" text to="/login">Login</v-btn>

    <v-btn v-show="signedIn" text to="/settings">
      <span class="mr-2">Settings</span>
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <v-btn v-show="signedIn" text @click="signOut()">Sign Out</v-btn>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import WeatherService from "@/services/WeatherService";
import { Auth } from "aws-amplify";

export default {
  data() {
    return {
      searchText: null,
      resultLocations: [],
      selectedLocationUrl: null,
    };
  },
  computed: mapState(["signedIn"]),
  watch: {
    searchText() {
      this.getAutocompleteSearchResults();
    },
  },
  methods: {
    getAutocompleteSearchResults() {
      WeatherService.getLocations(this.searchText)
        .then((response) => {
          this.resultLocations = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.resultLocations = [];
        });
    },
    navToDetails(url) {
      this.$router.push({
        name: "weather-detail",
        params: {
          url: url,
        },
      });
    },
    async signOut() {
      try {
        await Auth.signOut({ global: true });
        this.setSignedIn(false);
        this.setIsCelsius(true);
      } catch (error) {
        console.log("error signing out: ", error);
      }
    },
    ...mapActions(["setSignedIn", "setIsCelsius"]),
  },
};
</script>
