import Vue from "vue";
import Vuex from "vuex";
import { API, Auth } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import * as queries from "@/graphql/queries";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedIn: false,
    savedLocations: [],
    isCelsius: true,
    editMode: false,
  },
  mutations: {
    SET_SIGNED_IN(state, signedIn) {
      state.signedIn = signedIn;
    },
    ADD_LOCATION(state, location) {
      state.savedLocations.push(location);
    },
    REMOVE_LOCATION(state, location) {
      state.savedLocations = state.savedLocations.filter(
        (item) => item !== location
      );
    },
    SET_LOCATION(state, location) {
      state.location = location;
    },
    SET_SAVED_LOCATIONS(state, locations) {
      state.savedLocations = locations;
    },
    SET_IS_CELSIUS(state, isCelsius) {
      state.isCelsius = isCelsius;
    },
    SET_EDIT_MODE(state, editMode) {
      state.editMode = editMode;
    },
  },
  actions: {
    setSignedIn({ commit }, signedIn) {
      commit("SET_SIGNED_IN", signedIn);
    },
    setEditMode({ commit }, editMode) {
      commit("SET_EDIT_MODE", editMode);
    },
    setSavedLocations({ commit }, savedLocations) {
      if (savedLocations !== undefined) {
        commit("SET_SAVED_LOCATIONS", savedLocations);
      }
    },
    setIsCelsius({ commit }, isCelsius) {
      commit("SET_IS_CELSIUS", isCelsius);
    },
    async updateSavedLocations({ commit }, savedLocations) {
      if (savedLocations !== undefined) {
        const user = await Auth.currentUserInfo();

        var savedPreferences = await API.graphql({
          query: queries.getSavedPreferences,
          variables: { id: user.username },
        });

        const updatedPrefs = {
          id: savedPreferences.data.getSavedPreferences.id,
          isCelsius: savedPreferences.data.getSavedPreferences.isCelsius,
          savedLocations: savedLocations,
        };

        await API.graphql({
          query: mutations.updateSavedPreferences,
          variables: { input: updatedPrefs },
        });

        commit("SET_SAVED_LOCATIONS", savedLocations);
      }
    },
    async updateIsCelsius({ commit }, isCelsius) {
      const user = await Auth.currentUserInfo();

      var savedPreferences = await API.graphql({
        query: queries.getSavedPreferences,
        variables: { id: user.username },
      });

      const updatedPrefs = {
        id: savedPreferences.data.getSavedPreferences.id,
        isCelsius: isCelsius,
        savedLocations:
          savedPreferences.data.getSavedPreferences.savedLocations,
      };

      await API.graphql({
        query: mutations.updateSavedPreferences,
        variables: { input: updatedPrefs },
      });

      commit("SET_IS_CELSIUS", isCelsius);
    },
    async addLocation({ commit }, location) {
      const user = await Auth.currentUserInfo();

      var savedPreferences = await API.graphql({
        query: queries.getSavedPreferences,
        variables: { id: user.username },
      });

      savedPreferences.data.getSavedPreferences.savedLocations.push(location);

      const updatedPrefs = {
        id: savedPreferences.data.getSavedPreferences.id,
        isCelsius: savedPreferences.data.getSavedPreferences.isCelsius,
        savedLocations:
          savedPreferences.data.getSavedPreferences.savedLocations,
      };

      await API.graphql({
        query: mutations.updateSavedPreferences,
        variables: { input: updatedPrefs },
      });

      commit("ADD_LOCATION", location);
    },
    async removeLocation({ commit }, location) {
      console.log("inside remove location " + location);
      const user = await Auth.currentUserInfo();

      var savedPreferences = await API.graphql({
        query: queries.getSavedPreferences,
        variables: { id: user.username },
      });

      console.log(savedPreferences.data.getSavedPreferences.savedLocations);

      savedPreferences.data.getSavedPreferences.savedLocations =
        savedPreferences.data.getSavedPreferences.savedLocations.filter(
          (item) => item !== location
        );

      console.log(savedPreferences.data.getSavedPreferences.savedLocations);

      const updatedPrefs = {
        id: savedPreferences.data.getSavedPreferences.id,
        isCelsius: savedPreferences.data.getSavedPreferences.isCelsius,
        savedLocations:
          savedPreferences.data.getSavedPreferences.savedLocations,
      };

      await API.graphql({
        query: mutations.updateSavedPreferences,
        variables: { input: updatedPrefs },
      });

      commit("REMOVE_LOCATION", location);
    },
  },
});
