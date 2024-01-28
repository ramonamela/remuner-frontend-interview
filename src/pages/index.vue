<template>
  <ViewComponent title="OVERVIEW">
    <v-container fluid class="fill-height">
    <v-row class="fill-height">
      <!-- Create columns using v-col -->
      <v-col cols="12" md="6">
        <GridCard cardTitle="Prueba técnica">
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
        <GridCard>
          Last card
        </GridCard>
      </v-col>
    </v-row>
  </v-container>
  </ViewComponent>
</template>

<script setup>
import GridCard from '@/components/GridCard.vue'
import SimpleCard from '@/components/SimpleCard.vue'
import TitledCard from '@/components/TitledCard.vue'
import ViewComponent from '@/components/ViewComponent.vue'
</script>
