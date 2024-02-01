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
                <v-btn color="blue-darken-1" variant="elevated" @click="closeDeleteError">Entendido</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <div class="paginated-data-container">
        <v-data-table :headers="enlargedHeaderDefinition" :items="firstLevelItems">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogCreateEdit" max-width="700px" @click:outside="closeEdit">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" dark class="mb-2" v-bind="props" variant="tonal" @click="createItem">
                                Crear
                            </v-btn>
                        </template>
                        <v-card>
                            <slot></slot>
                            <v-card>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue-darken-1" variant="flat" @click="closeEdit">
                                        Cancelar
                                    </v-btn>
                                    <v-btn color="blue-darken-1" variant="text" @click="saveEdit">
                                        Guardar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-card>
                    </v-dialog>

                </v-toolbar>
            </template>
            <template v-slot:item.delete-table-item="{ item }">
                            <v-icon
                size="small"
                class="me-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
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

import { ref, toRaw } from 'vue';

const dialogCreateEdit = ref(false);
const dialogDelete = ref(false);
const dialogDeleteError = ref(false);
const deletedElement = ref({deleteMessage: ""});
const editedElement = ref({});
let defaultEditedItem;

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
        },
        'editedItem': {
            'type': Object
        },
        'updateEditedItem': {
            'type': Function
        }
    },
    data() {
        return {
            dialogCreateEdit,
            dialogDelete,
            dialogDeleteError,
            deletedElement,
            editedElement,
            defaultEditedItem,
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
    mounted() {
        console.log("Set default edited item")
        console.log(defaultEditedItem)
        defaultEditedItem = {...toRaw(this.editedItem)};
        console.log(defaultEditedItem)
    },
    methods: {
        createItem(){
            console.log("Create item")
            this.updateEditedItem(defaultEditedItem)
        },
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
        editItem(item) {
            this.updateEditedItem(item)
            dialogCreateEdit.value = true;
        },
        deleteItem(item) {
            dialogDelete.value = true;
            deletedElement.value = item
        },
        async deleteItemConfirm(item) {
            await deletedElement.value.deleteFunction(deletedElement.value).then(
                (result) => {
                    console.log("Todo ha ido bien")
                    console.log(result)
                    if(!result) {
                        console.log(result)
                        dialogDeleteError.value = true;
                    }
                }
                ).catch(() => {
                console.log("Estamos en error")
                dialogDeleteError.value = true
            });
            console.log("Cerrar delete item dialog")
            dialogDelete.value = false;
        },
        closeDelete() {
            dialogDelete.value = false;
            deletedElement.value = {deleteMessage: ""};
        },
        closeDeleteError() {
            dialogDeleteError.value = false;
        },
        closeEdit() {
            console.log("close");
            dialogCreateEdit.value = false;
            editedElement.value = -1;
        },
        saveEdit() {
            console.log("save")
            console.log()
            dialogCreateEdit.value = false;
            editedElement.value = -1;
        }
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



