<template>
    <ViewComponent title="EQUIPOS">
        <PaginatedTable :headerDefinition="headerDefinition" :items="items" :secondaryTableHeaders="secondaryTableHeaders" deleteDialogConfig="true">
        </PaginatedTable>
    </ViewComponent>
</template>
  
<script>
import ViewComponent from '@/components/ViewComponent.vue'
import PaginatedTable from '@/components/PaginatedTable.vue'
import axios from 'axios';
import { ref } from 'vue';
import {deleteTeam as deleteItem, getTeams} from '@/helpers/http/teams.js'
const vue_app_backend = import.meta.env.VITE_APP_BACKEND_BASE_URL;
let items = ref([]);
let headerDefinition = [
    { title: 'Equipo', key: 'name', align: 'start' },
]

const deleteTeam = async function (item) {
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
            secondaryTableHeaders: [
                {
                    key: "users", definition: [{ title: 'Nombre', key: 'first_name', align: 'start' },
                    { title: 'Apellido', key: 'last_name' },
                    { title: 'Correo electrónico', key: 'email' },]
                },
            ],
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        async loadItems() {
            this.items = [];
            getTeams()
                .then((response) => {
                    this.items = response.data;
                    this.items.forEach(
                        (element) => {
                            element.deleteMessage = "Seguro que quieres borrar " + element.email + "?";
                            element.deleteFunction = deleteTeam
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