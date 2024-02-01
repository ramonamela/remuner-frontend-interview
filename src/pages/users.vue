<template>
    <ViewComponent title="USUARIOS">
        <PaginatedTable :headerDefinition="headerDefinition" :items="items" :secondaryTableHeaders="secondaryTableHeaders"
            deleteDialogConfig="true" :editedItem="editedItem" :updateEditedItem="updateEditedItem">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="5">
                            <v-text-field v-model="editedItem.first_name" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="7">
                            <v-text-field v-model="editedItem.last_name" label="Apellido"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="editedItem.email" label="Correo electrónico"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">

                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </PaginatedTable>
    </ViewComponent>
</template>
  
<script>
import ViewComponent from '@/components/ViewComponent.vue'
import PaginatedTable from '@/components/PaginatedTable.vue'
import axios from 'axios';
import { ref } from 'vue';
import { deleteUser as deleteItem, getUsers } from '@/helpers/http/users.js'
const vue_app_backend = import.meta.env.VITE_APP_BACKEND_BASE_URL;
let items = ref([]);
const editedItem = ref({
    id: null,
    first_name: "a",
    last_name: "a",
    email: "a",
    teams: []
})
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
        return false;
    } else {
        deleteItem(item).then((response) => {
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
                { key: "teams", definition: [{ title: "Equipos", key: "name" }] },
                { key: "integrations", definition: [{ title: "Integraciones", key: "name" }] },
            ],
            editedItem
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        updateEditedItem(newEditedItemValue) {
            editedItem.value.id = newEditedItemValue.id
            editedItem.value.first_name = newEditedItemValue.first_name;
            editedItem.value.last_name = newEditedItemValue.last_name;
            editedItem.value.email = newEditedItemValue.email
            console.log(editedItem)
        },
        async loadItems() {
            this.items = [];
            getUsers()
                .then((response) => {
                    this.items = response.data;
                    this.items.forEach(
                        (element) => {
                            element.deleteMessage = "Seguro que quieres borrar " + element.email + "?";
                            element.deleteFunction = deleteUser;
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
