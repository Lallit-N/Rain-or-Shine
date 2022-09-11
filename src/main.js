import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import {
  applyPolyfills,
  defineCustomElements,
} from "@aws-amplify/ui-components/loader";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

applyPolyfills().then(() => {
  defineCustomElements(window);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
