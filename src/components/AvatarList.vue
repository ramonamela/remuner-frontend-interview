<template>
    <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
            <div class="item-container">
                <v-icon size="xs">{{ avatar }}</v-icon>
                <!-- Use "mdi-circle" icon or any other bullet point icon you prefer -->
                <div>
                    <v-list-item-content>
                        {{ item }}
                    </v-list-item-content>
                </div>
            </div>
        </v-list-item>
        <!-- Add more items as needed -->
    </v-list>
</template>

<script setup>
const props = defineProps(['items', 'avatar']);
</script>

<style scoped>
.v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
    padding: 3px;
    min-height: 0px;
}
.item-container {
    display: flex;
}
</style>