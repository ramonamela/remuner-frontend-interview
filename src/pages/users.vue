<template>
    <ViewComponent title="USUARIOS">
        <EditablePaginatedTable :headerDefinition="headerDefinition" :items="items" :secondaryTableHeaders="secondaryTableHeaders"
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
                            <v-select v-model="editedItem.teams" :items="teams" label="Equipos" multiple
                                persistent-hint></v-select>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </EditablePaginatedTable>
    </ViewComponent>
</template>
  
<script>
import ViewComponent from '@/components/ViewComponent.vue'
import EditablePaginatedTable from '@/components/EditablePaginatedTable.vue'
import { ref } from 'vue';
import { deleteUser as deleteItem, getUsers, createUser, updateUser } from '@/helpers/http/users.js'
import { getIntegrations } from '@/helpers/http/integrations';
import { getTeams } from '@/helpers/http/teams';

let items = ref([]);
let teams = ref([]);
let integrations = ref([]);
let integrationsNameToIdDict = ref({});
let teamsNameToIdDict = ref({});
let integrationsNameDict = ref({});
let teamsNameDict = ref({});

const editedItem = ref({
    id: null,
    first_name: "",
    last_name: "",
    email: "",
    teams: [],
    integrations: [],
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
        return deleteItem(item).then((response) => {
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
            editedItem,
            teams,
            integrations,
            integrationsNameToIdDict,
            teamsNameToIdDict,
            integrationsNameDict,
            teamsNameDict
        };
    },
    mounted() {
        Promise.all([this.loadIntegrations(), this.loadTeams()]).then(
            this.loadItems()
        )
    },
    methods: {
        async loadTeams() {
            return getTeams().then((response) => response.data).then(
                (teams) => {
                    this.teams = teams.map(
                        (team) => team.name
                    );
                    this.teamsNameToIdDict = {}
                    teams.forEach(
                        (team) => {
                            this.teamsNameToIdDict[team.name] = team.id
                        }
                    )
                    teams.forEach(
                        (team) => {
                            this.teamsNameDict[team.name] = team
                        }
                    )
                }
            ).catch((error) => { console.log(error) })
        },
        async loadItems() {
            getUsers()
                .then((response) => {
                    this.items = response.data;
                    this.items.forEach(
                        (element) => {
                            this.addActionsToElement(element)
                        }
                    )
                })
                .catch((error) => {
                    console.error('There was a problem with the request:', error);
                });
        },
        async loadIntegrations() {
            return getIntegrations().then((response) => response.data).then(
                (integrations) => {
                    this.integrations = integrations.map(
                        (integration) => integration.name
                    );
                    this.integrationsNameToIdDict = {}
                    integrations.forEach(
                        (integration) => {
                            this.integrationsNameToIdDict[integration.name] = integration.id
                        }
                    )
                    integrations.forEach(
                        (integration) => {
                            this.integrationsNameDict[integration.name] = integration
                        }
                    )
                }
            ).catch((error) => { console.log(error) })
        },
        updateEditedItem(newEditedItemValue) {
            editedItem.value.id = newEditedItemValue.id
            editedItem.value.first_name = newEditedItemValue.first_name;
            editedItem.value.last_name = newEditedItemValue.last_name;
            editedItem.value.email = newEditedItemValue.email
            editedItem.value.integrations = newEditedItemValue.integrations.map(integration => integration.name)
            editedItem.value.teams = newEditedItemValue.teams.map(team => team.name)
            this.addActionsToElement(editedItem.value)
        },
        async formatElementToSend(elementToSend, originalElement) {
            elementToSend.integrations = originalElement.integrations.map(
                (integration) => this.integrationsNameToIdDict[integration]
            )
            elementToSend.teams = originalElement.teams.map(
                (team) => this.teamsNameToIdDict[team]
            )
        },
        async formatElementToAdd(elementToAdd, originalElement) {
            elementToAdd.integrations = originalElement.integrations.map(
                (integration) => this.integrationsNameDict[integration]
            )
            elementToAdd.teams = originalElement.teams.map(
                (team) => this.teamsNameDict[team]
            )
        },
        async saveEditedElement(element) {
            let elementToSend = { ...element }
            this.formatElementToSend(elementToSend, element);
            return updateUser(elementToSend).then((result) => {
                let elementToAdd = { ...element }
                let indexToUpdate = items.value.findIndex(
                    listItem => listItem.id === element.id
                )
                this.formatElementToAdd(elementToAdd, element);
                items.value[indexToUpdate] = elementToAdd;
                return true
            }).catch((error) => { return false })
        },
        async saveCreatedElement(element) {
            let elementToSend = { ...element }
            this.formatElementToSend(elementToSend, element);
            return createUser(elementToSend).then((result) => {
                let elementToAdd = { ...element }
                this.formatElementToAdd(elementToAdd, element);
                elementToAdd.id = result.data.id
                items.value.push(elementToAdd);
                return true
            }).catch((error) => { return false })
        },
        addActionsToElement(element) {
            element.deleteMessage = "Seguro que quieres borrar " + element.email + "?";
            element.deleteFunction = deleteUser;
            element.editFunction = () => this.saveEditedElement(element);
            element.createFunction = () => this.saveCreatedElement(element);
        }
    },
    components: { EditablePaginatedTable },
}
</script>
