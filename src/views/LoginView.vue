<template>
  <div>
    <amplify-authenticator>
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{ user.username }}</div>
      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
</template>

<script>
import { API } from "aws-amplify";
import * as mutations from "@/graphql/mutations";
import * as queries from "@/graphql/queries";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { mapActions } from "vuex";

export default {
  name: "AuthStateApp",
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;

      if (authState === "signedin") {
        this.setSignedIn(true);
        this.$router.push({
          name: "weather-home",
        });
        this.initSavedPreferences(this.user.username);
        this.authState = undefined;
      }
    });
  },
  beforeDestroy() {
    this.unsubscribeAuth();
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
    };
  },
  methods: {
    async initSavedPreferences(username) {
      var savedPreferences = await API.graphql({
        query: queries.getSavedPreferences,
        variables: { id: username },
      });

      if (savedPreferences.data.getSavedPreferences === null) {
        console.log("making new saved pref");
        const prefs = {
          id: username,
          isCelsius: true,
          savedLocations: [],
        };
        console.log(prefs);
        savedPreferences = await API.graphql({
          query: mutations.createSavedPreferences,
          variables: { input: prefs },
        });
      }
      this.setIsCelsius(savedPreferences.data.getSavedPreferences.isCelsius);
      this.setSavedLocations(
        savedPreferences.data.getSavedPreferences.savedLocations
      );
    },
    ...mapActions(["setSignedIn", "setIsCelsius", "setSavedLocations"]),
  },
};
</script>

<style>
:root {
  --amplify-primary-color: #1976d2;
  --amplify-primary-tint: #424242;
  --amplify-primary-shade: #1976d2;
}
</style>
