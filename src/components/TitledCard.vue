<template>
    <div class="titled-card-container">
        <div v-if="cardTitle">
            <div class="container">
                <div class="box">{{ cardTitle }}</div>
                <div class="box">Box 2</div>
                <div class="box">Box 3</div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
.titled-card-container {
    background: #FFF;
    height: 100%;
    padding: 40px;
    border-radius: 5px;
}
.container {
    display: flex;
}
</style>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    cardTitle: String,
    default: '',
});
</script>