<template>
  <ViewComponent title="INTEGRACIONES">
    <PaginatedTable :headerDefinition="headerDefinition" :items="items"
      deleteDialogConfig="true">
    </PaginatedTable>
  </ViewComponent>
</template>
  
<script>
import ViewComponent from '@/components/ViewComponent.vue'
import PaginatedTable from '@/components/PaginatedTable.vue'
import axios from 'axios';
import Teams from './teams.vue'
import { ref } from 'vue'
import {deleteIntegration as deleteItem, getIntegrations} from '@/helpers/http/integrations.js';

const vue_app_backend = import.meta.env.VITE_APP_BACKEND_BASE_URL;
let items = ref([]);
let headerDefinition = [
  { title: 'Integración', key: 'name', align: 'start' },
  { title: 'Nombre', key: 'user_first_name', align: 'start' },
  { title: 'Apellido', key: 'user_last_name', align: 'start' },
  { title: 'Correo electrónico', key: 'user_email', align: 'start' },
]

const deleteIntegration = async function (item) {
  let indexToRemove = items.value.findIndex(
    listItem => listItem.id === item.id
  )
  if (indexToRemove === -1) {
    return false;
  } else {
    deleteItem(item).then(() => {
      items.value.splice(indexToRemove, 1);
      return true;
    }).catch((error) => {
      return false;
    });
  }
}

export default {
  data() {
    return {
      items,
      headerDefinition,
    };
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    async loadItems() {
      this.items = [];
      getIntegrations()
        .then((response) => {
          this.items = response.data;
          this.items.forEach(
            (element) => {
              element.deleteMessage = "Seguro que quieres borrar " + element.email + "?";
              element.deleteFunction = deleteIntegration
            }
          )
        })
        .catch((error) => {
          console.error('There was a problem with the Axios request:', error);
        });
    }
  },
  components: { PaginatedTable }
}

</script>