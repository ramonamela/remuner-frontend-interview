<template>
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-text class="text-h5">{{ deletedElement.deleteMessage }}</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="elevated" @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDeleteError" max-width="500px">
        <v-card>
            <v-card-text class="text-h5">Error en el borrado</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="elevated" @click="closeDeleteError">Cancelar</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <div class="paginated-data-container">
        <v-data-table :headers="enlargedHeaderDefinition" :items="firstLevelItems">
















            <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="props"
              variant="tonal"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.first_name"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.last_name"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.carbs"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.protein"
                      label="Protein (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>















            <template v-slot:item.delete-table-item="{ item }">
                <!--             <v-icon
                size="small"
                class="me-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon> -->
                <v-icon size="small" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>

            <template v-slot:expanded-row="{ columns, item }">
                <tr>
                    <td :colspan="columns.length">
                        <div class="inner-paginated-data-container">
                            <PaginatedTable v-for="(currentTable, index) in generateSecondaryTables(item)"
                                :headerDefinition="currentTable.header" :items="currentTable.items"></PaginatedTable>
                        </div>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>

import { ref } from 'vue';

const dialog = ref(false);
const dialogDelete = ref(false);
const dialogDeleteError = ref(false);
const deletedElement = ref(null);

export default {
    props: {
        'headerDefinition': Object,
        'items': Array,
        'secondaryTableHeaders': {
            'type': Array,
            'default': () => []
        },
        'deleteDialogConfig': {
            'type': String,
            'default': "false"
        }
    },
    data() {
        return {
            dialog,
            dialogDelete,
            dialogDeleteError,
            deletedElement,
        }
    },
    computed: {
        enlargedHeaderDefinition() {
            let enlargedHeaderDefinition = [...this.headerDefinition]
            if (this.deleteDialogConfig === "true") {
                enlargedHeaderDefinition.push({ title: '', key: 'delete-table-item' })
            }
            if (this.secondaryTableHeaders.length > 0) {
                enlargedHeaderDefinition.push({ title: '', key: 'data-table-expand' })
            }
            return enlargedHeaderDefinition
        },
        firstLevelItems() {
            return this.items
        },
    },
    methods: {
        generateSecondaryTables(item) {
            let secondaryTables = []
            this.secondaryTableHeaders.forEach(element => {
                console.log(item[element.key])
                secondaryTables.push(
                    {
                        header: element.definition,
                        items: item[element.key]
                    }
                )
            }
            )
            return secondaryTables;
        },
        shouldShowItem(item) {
            console.log("Should check")
            console.log(item)
            return item.items.length > 0
        },
        deleteItem(item) {
            dialogDelete.value = true;
            deletedElement.value = item
        },
        async deleteItemConfirm(item) {
            await deletedElement.value.deleteFunction(deletedElement.value).catch(() => {
                dialogDeleteError.value = true
            });
            dialogDelete.value = false;
        },
        closeDelete() {
            dialogDelete.value = false;
            deletedElement = null;
        },
        closeDeleteError() {
            dialogDeleteError.value = false;
        },
    }

}
</script>

<style>
.v-data-table-header__content {
    font-weight: 700;
}

th.v-data-table__td {

    background-color: #D9DBE9;
}
</style>

<style scoped>
.paginated-data-container {
    padding: 15px;
}

.inner-paginated-data-container {
    padding: 15px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    display: flex;
    justify-content: center;
}
</style>



