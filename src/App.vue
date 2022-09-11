<template>
  <v-app>
    <TopBar />
    <v-main class="main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import TopBar from "@/components/TopBar.vue";

export default {
  name: "App",
  components: {
    TopBar,
  },
};
</script>

<style>
.main {
  background-color: lightsteelblue;
}
</style>
