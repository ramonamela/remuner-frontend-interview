<template>
  <ViewComponent title="INTEGRACIONES">
    <PaginatedTable :headerDefinition="headerDefinition" :items="items" deleteDialogConfig="true" :editedItem="editedItem"
      :updateEditedItem="updateEditedItem">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="editedItem.name" label="Nombre"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-text-field v-model="editedItem.token" label="Token"></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-select v-model="editedItem.user" :items="users" label="Usuario" persistent-hint></v-select>
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
import { ref } from 'vue'
import { deleteIntegration as deleteItem, getIntegrations, createIntegration, updateIntegration } from '@/helpers/http/integrations.js';
import { getUsers } from '@/helpers/http/users';

let items = ref([]);
let users = ref([]);
let usersNameToIdDict = ref({});
let usersNameDict = ref({});

const editedItem = ref({
  id: null,
  name: "a",
  token: "",
  user: "",
})

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
      editedItem.value.token = newEditedItemValue.token;
      editedItem.value.user = newEditedItemValue.user
      this.addActionsToElement(editedItem.value)
    },
    async saveEditedElement(element) {
      let elementToSend = { ...element }

      elementToSend.user_id = this.usersNameToIdDict[element.user]
            
      return updateIntegration(elementToSend).then((result) => {

        let elementToAdd = { ...element }
        let indexToUpdate = items.value.findIndex(
          listItem => listItem.id === element.id
        )
        elementToAdd.users = element.users.map(
          (user) => this.usersNameDict[user]
        )
        items.value[indexToUpdate] = elementToAdd;
        return true
      }).catch((error) => { console.log(error); return false })
    },
    async saveCreatedElement(element) {
      let elementToSend = { ...element }

      elementToSend.user_id = this.usersNameToIdDict[element.user]

      return createIntegration(elementToSend).then((result) => {
        let elementToAdd = { ...element }
        let userOfAddedElement = this.usersNameDict[element.user]
        elementToAdd.user_first_name = userOfAddedElement.first_name
        elementToAdd.user_last_name = userOfAddedElement.last_name
        elementToAdd.user_email = userOfAddedElement.email
        elementToAdd.user = userOfAddedElement.first_name + " " + userOfAddedElement.last_name
        elementToAdd.id = result.data.id
        items.value.push(elementToAdd);
        return true
      }).catch((error) => { 
        console.log(error);
        return false 
      })
    },
    addActionsToElement(element) {
      console.log("Add actions")
      element.deleteMessage = "Seguro que quieres borrar " + element.name + "?";
      element.deleteFunction = deleteIntegration;
      element.editFunction = () => this.saveEditedElement(element);
      element.createFunction = () => this.saveCreatedElement(element);
    },
    async loadItems() {
      this.items = [];
      getIntegrations()
        .then((response) => {
          this.items = response.data;
          this.items.forEach(
            (element) => {
              element.deleteMessage = "Seguro que quieres borrar " + element.email + "?";
              element.deleteFunction = deleteIntegration
              element.user = element.user_first_name + " " + element.user_last_name
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