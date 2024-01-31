<template>
    <ViewComponent title="USUARIOS">
        <PaginatedTable :headerDefinition="headerDefinition" :items="items" :secondaryTableHeaders="secondaryTableHeaders"
            :deleteDialogConfig="deleteDialogConfig"></PaginatedTable>
    </ViewComponent>
</template>
  
<script>
import ViewComponent from '@/components/ViewComponent.vue'
import PaginatedTable from '@/components/PaginatedTable.vue'
import axios from 'axios';
import { ref } from 'vue';
const vue_app_backend = import.meta.env.VITE_APP_BACKEND_BASE_URL;
let items = ref([]);
let headerDefinition = [
    { title: 'Nombre', key: 'first_name', align: 'start' },
    { title: 'Apellido', key: 'last_name' },
    { title: 'Correo electrónico', key: 'email' },
]

const deleteUser = async function (item) {
    let indexToRemove = items.value.findIndex(
        listItem => listItem.id === item.id
    )
    if (indexToRemove === -1) {
        throw ("Error en el borrado");
    } else {
        axios.delete(vue_app_backend + '/v1/users/' + item.id, {
            headers: {
                'Accept': 'application/json',
                'X-API-Version': '1',
            }
        }).then(() => {
            items.value.splice(indexToRemove, 1);
        }).catch((error) => {
            throw ("Error en el borrado")
        });
    }
}


export default {
    data() {
        return {
            items,
            headerDefinition,
            secondaryTableHeaders: [
                { key: "teams", definition: [{ title: "Equipos", key: "name" }] },
                { key: "integrations", definition: [{ title: "Integraciones", key: "name" }] },
            ],
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        async loadItems() {
            this.items = [];
            axios.get(vue_app_backend + '/v1/users', {
                headers: {
                    'Accept': 'application/json',
                    'X-API-Version': '1',
                }
            })
                .then((response) => {
                    // Handle successful response
                    this.items = response.data; // Assign fetched data to items
                    this.items.forEach(
                        (element) => {
                            element.deleteMessage = "Seguro que quieres borrar " + element.email + "?";
                            element.deleteFunction = deleteUser
                        }
                    )
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
