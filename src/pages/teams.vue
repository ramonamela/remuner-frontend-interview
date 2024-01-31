<template>
  <ViewComponent title="EQUIPOS">
        <PaginatedTable :headerDefinition="headerDefinition" :items="items" :secondaryTableHeaders="secondaryTableHeaders"></PaginatedTable>
  </ViewComponent>
</template>
  
<script>
import ViewComponent from '@/components/ViewComponent.vue'
import PaginatedTable from '@/components/PaginatedTable.vue'
import axios from 'axios';
import Teams from './teams.vue';
const vue_app_backend = import.meta.env.VITE_APP_BACKEND_BASE_URL;
let items = [];
let headerDefinition = [
    { title: 'Equipo', key: 'name', align: 'start' },
]

export default {
    data() {
        return {
            items,
            headerDefinition,
            secondaryTableHeaders: [
                { key: "users", definition: [    { title: 'Nombre', key: 'first_name', align: 'start' },
    { title: 'Apellido', key: 'last_name' },
    { title: 'Correo electrónico', key: 'email' },] },
            ],
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        async loadItems() {
            this.items = [];
            axios.get(vue_app_backend + '/v1/teams', {
                headers: {
                    'Accept': 'application/json',
                    'X-API-Version': '1',
                }
            })
                .then((response) => {
                    // Handle successful response
                    this.items = response.data; // Assign fetched data to items
                })
                .catch((error) => {
                    // Handle errors
                    console.error('There was a problem with the Axios request:', error);
                });
        }
    },
    components: { PaginatedTable }
}
</script>