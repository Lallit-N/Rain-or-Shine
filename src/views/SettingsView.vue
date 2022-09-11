<template>
  <v-card class="mx-auto my-12 pa-1" max-width="600">
    <v-card-title class="text-h4 justify-center">Settings</v-card-title>
    <v-card class="pa-5 ma-1 align-center">
      <v-row class="justify-space-between align-center">
        <h2 class="ml-3">Temperature Units</h2>
        <v-radio-group row v-model="selectedUnits">
          <v-radio label="Celsius" :value="true" />
          <v-radio label="Fahrenheit" :value="false" />
        </v-radio-group>
      </v-row>
      <v-divider></v-divider>
      <v-btn
        class="mt-5"
        block
        color="primary"
        :disabled="savedLocations.length == 0"
        @click="updateSavedLocations([])"
      >
        Clear All Saved Locations
      </v-btn>
    </v-card>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      selectedUnits: null,
    };
  },
  created() {
    this.selectedUnits = this.isCelsius;
  },
  watch: {
    selectedUnits(newVal) {
      this.updateIsCelsius(newVal);
    },
  },
  computed: mapState(["isCelsius", "savedLocations"]),
  methods: mapActions(["updateIsCelsius", "updateSavedLocations"]),
};
</script>
