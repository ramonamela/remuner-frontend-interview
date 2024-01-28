<template>
  <v-app>
    <v-app-bar height="47" elevation="0">DASHBOARD</v-app-bar>
    <v-main>
      <NavigationDrawer navWidth="204" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

html,
body {
  font-family: 'Montserrat', sans-serif;
  height: 100%;
}

.v-main {
  background: #E9E9EC;
}

.v-app-bar {
  padding-left: 21px;
  background-color: #F4F5F8 !important;
}

.v-toolbar__content {
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0px;
  color: #222326;
}
</style>