<template>
  <ViewComponent title="OVERVIEW">
    <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <!-- Create columns using v-col -->
      <v-col cols="12" md="6">
        <GridCard cardTitle="Prueba técnica" :cardActions="firstCardActions">
          First card
        </GridCard>
      </v-col>
      <v-col cols="12" md="6">
        <v-row>
          <v-col cols="12">
            <GridCard>Usuarios</GridCard>
          </v-col>
          <v-col cols="12"><GridCard>Equipos</GridCard></v-col>
          <v-col cols="12"><GridCard>Integraciones</GridCard></v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="12">
        <GridCard cardTitle="Modelo de datos">
          Last card
        </GridCard>
      </v-col>
    </v-row>
  </v-container>
  </ViewComponent>
</template>

<script setup>
import GridCard from '@/components/GridCard.vue'
import ViewComponent from '@/components/ViewComponent.vue'

const firstCardActions = [
            { title: 'Config', icon: 'mdi-cog', action: () => {alert("Config")} },
            { title: 'Editar', icon: 'mdi-pencil', action: () => {alert("Editar")}},
        ];

</script>
