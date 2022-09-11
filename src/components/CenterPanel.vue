<template>
  <v-card class="mx-auto my-12" max-width="900">
    <v-card-title><slot name="title"></slot></v-card-title>
    <v-container>
      <slot name="content"></slot>
    </v-container>
  </v-card>
</template>
