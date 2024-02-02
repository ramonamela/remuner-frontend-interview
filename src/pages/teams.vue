<template>
    <ViewComponent title="EQUIPOS">
        <PaginatedTable :headerDefinition="headerDefinition" :items="items" :secondaryTableHeaders="secondaryTableHeaders" deleteDialogConfig="true" :editedItem="editedItem" :updateEditedItem="updateEditedItem">
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12" md="12">
                            <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                            <v-select v-model="editedItem.users" :items="users" label="Usuarios" multiple
                                persistent-hint></v-select>
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
import { ref } from 'vue';
import {deleteTeam as deleteItem, getTeams, createTeam, updateTeam} from '@/helpers/http/teams.js'
import { getUsers } from '@/helpers/http/users';

let items = ref([]);
let users = ref([]);
let usersNameToIdDict = ref({});
let usersNameDict = ref({});

const editedItem = ref({
    id: null,
    name: "",
    users: [],
})

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
        return deleteItem(item).then(() => {
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
            editedItem,
            users,
            usersNameToIdDict,
            usersNameDict,
        };
    },
    mounted() {
        this.loadUsers().then(
            (result) => this.loadItems()
        );
    },
    methods: {
        async loadUsers() {
            return getUsers().then((response) => response.data).then(
                (users) => {
                    this.users = users.map(
                        (user) => user.first_name + " " + user.last_name
                    );
                    this.usersNameToIdDict = {}
                    users.forEach(
                        (user) => {
                            this.usersNameToIdDict[user.first_name + " " + user.last_name] = user.id
                        }
                    )
                    users.forEach(
                        (user) => {
                            this.usersNameDict[user.first_name + " " + user.last_name] = user
                        }
                    )
                }
            ).catch((error) => { console.log(error) })
        },
        updateEditedItem(newEditedItemValue) {
            console.log(newEditedItemValue)
            editedItem.value.id = newEditedItemValue.id
            editedItem.value.name = newEditedItemValue.name;
            editedItem.value.users = newEditedItemValue.users.map(user => user.first_name + " " + user.last_name)
            this.addActionsToElement(editedItem.value)
        },
        async saveEditedElement(element) {
            let elementToSend = { ...element }

            elementToSend.users = element.users.map(
                (user) => this.usersNameToIdDict[user]
            )
            console.log("Update team")
            console.log(elementToSend)
            return updateTeam(elementToSend).then((result) => {

                let elementToAdd = { ...element }
                let indexToUpdate = items.value.findIndex(
                    listItem => listItem.id === element.id
                )
                elementToAdd.users = element.users.map(
                    (user) => this.usersNameDict[user]
                )
                items.value[indexToUpdate] = elementToAdd;
                return true
            }).catch((error) => { return false })
        },
        async saveCreatedElement(element) {
            let elementToSend = { ...element }

            elementToSend.users = element.users.map(
                (user) => this.usersNameToIdDict[user]
            )

            return createTeam(elementToSend).then((result) => {
                let elementToAdd = { ...element }
                elementToAdd.users = element.users.map(
                    (user) => this.usersNameDict[user]
                )
                elementToAdd.id = result.data.id
                items.value.push(elementToAdd);
                return true
            }).catch((error) => { return false })
        },
        addActionsToElement(element) {
            console.log("Add actions")
            element.deleteMessage = "Seguro que quieres borrar " + element.name + "?";
            element.deleteFunction = deleteTeam;
            element.editFunction = () => this.saveEditedElement(element);
            element.createFunction = () => this.saveCreatedElement(element);
        },
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