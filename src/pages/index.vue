<template>
  <ViewComponent title="OVERVIEW">
    <v-container fluid class="fill-height">
      <v-row class="fill-height">
        <!-- Create columns using v-col -->
        <v-col cols="12" md="6">
          <GridCard cardTitle="Prueba técnica" :cardActions="firstCardActions">
            <div class="index-prueba-tecnica-container index-prueba-tecnica-text-format">
              <div>
                <p class="underlined-text">Consigna:</p>
              </div>
              <AvatarList :items="firstListItems" avatar="mdi-circle-small"></AvatarList>
              <div>
                <p class="underlined-text">Requerimientos:</p>
              </div>
              <AvatarList :items="secondListItems" avatar="mdi-circle-small"></AvatarList>
            </div>
          </GridCard>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <GridCard>
                <CounterCard title="Usuarios" :counter="usersCount" targetRoute="/users"></CounterCard>
              </GridCard>
            </v-col>
            <v-col cols="12">
              <GridCard>
                <CounterCard title="Equipos" :counter="teamsCount" targetRoute="/teams"></CounterCard>
              </GridCard>
            </v-col>
            <v-col cols="12">
              <GridCard>
                <CounterCard title="Integraciones" :counter="integrationsCount" targetRoute="/integrations"></CounterCard>
              </GridCard>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <GridCard cardTitle="Modelos de datos" :cardActions="secondCardActions">
            <div class="index-remuner-data-model-image">
              <v-img src="@/assets/remuner-data-model.png" />
            </div>
          </GridCard>
        </v-col>
      </v-row>
    </v-container>
  </ViewComponent>
</template>

<script>
import GridCard from '@/components/GridCard.vue'
import ViewComponent from '@/components/ViewComponent.vue'
import { getIntegrationsStats } from '@/helpers/http/integrations';
import { getTeamsStats } from '@/helpers/http/teams';
import { getUsersStats } from '@/helpers/http/users';
import { ref } from 'vue';

const integrationsCount = ref(null);
const teamsCount = ref(null);
const usersCount = ref(null);

export default {
  data() {
    return {
      firstCardActions: [
        { title: 'Config', icon: 'mdi-cog', action: () => { alert("Config en prueba técnica") } },
        { title: 'Editar', icon: 'mdi-pencil', action: () => { alert("Editar en prueba técnica") } },
      ],

      secondCardActions: [
        { title: 'Config', icon: 'mdi-cog', action: () => { alert("Config en modelos de datos") } },
        { title: 'Editar', icon: 'mdi-pencil', action: () => { alert("Editar en modelos de datos") } },
      ],

      firstListItems: [
        "Replicar este dashboard respetando estilos y colores definidos en Figma.",
        "Agregar vistas para manejo de usuarios, equipos e integraciones, linkeables desde el panel de navegación.",
        "Realizar un backend para el CRUD de los datos de usuarios, equipos e integraciones implementando los modelos descriptos abajo."
      ],
      secondListItems: [
        "Para el frontend utilizar el framework Vue.js con librería de componentes Vuetify.",
        "Para el backend utilizar el framework Fastapi.",
        "Entrega del código de frontend y backend en un zip."
      ],
      integrationsCount,
      teamsCount,
      usersCount,
    }
  },
  mounted() {
    getIntegrationsStats().then((response) => {integrationsCount.value = response.data.count});
    getTeamsStats().then((response) => {teamsCount.value = response.data.count});
    getUsersStats().then((response) => {usersCount.value = response.data.count});
  }
}

</script>

<style scoped>
.index-remuner-data-model-image {
  max-height: 400px;
  padding-left: 30px;
  padding-right: 70px;
  padding-top: 15px;
}

.underlined-text {
  text-decoration: underline;
  /* Add underline style */
}

.index-prueba-tecnica-container {
  padding-top: 10px;
}

.index-prueba-tecnica-text-format {
  color: #000;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: -0.5px;
}
</style>
