<template>
    <v-menu open-on-hover :position-x="0" :position-y="20" background-color="transparent">
        <template v-slot:activator="{ props }">
            <v-btn class="hover-menu-icon" icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list class="hover-menu-list">
            <v-list-item v-for="(item, index) in items" :key="index" :value="index" class="hover-menu-item" @click="handleItemClick(item)">
                <v-list-item-content class="d-flex">
                    <v-list-item-avatar class="hover-menu-list-icon">
                        <v-icon class="hover-menu-list-icon" size="x-small">{{ item.icon }}</v-icon>
                    </v-list-item-avatar>
                    <v-list-item-title class="ml-2 hover-menu-list-title">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
  
<script>
export default {
    props: {
        items: {
            type: Object,
            default: []
        }
    },
    methods: {
        handleItemClick(item) {
            item.action()
        }
    }
}
</script>

<style scoped>
.hover-menu-icon {
    width: 35px;
    height: 35px;
    box-shadow: none;
}

.v-menu>.v-overlay__content>.v-list {
    background: transparent;
    box-shadow: none;

}

.v-list-item {
    min-height: 27px;
    height: 27px;
    padding: 9px;
}

.hover-menu-item {
    margin: 5px;
    background: white;
    border-radius: 10px;
    border-radius: 5px;
    border: 1px solid #C9C9D1;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.hover-menu-list-title {
    color: #222326;
    font-size: 12px;
    letter-spacing: -0.5px;
}
</style>