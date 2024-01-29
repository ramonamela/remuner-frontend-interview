<template>
    <router-link v-if="targetRoute" style="text-decoration: none; color: inherit;" :to="targetRoute">
        <div class="container">
            <div class="title">{{ title }}</div>
            <div class="counter">{{ counter }}</div>
        </div>
    </router-link>
</template>

<script setup>
const { title, counter } = defineProps(['title', 'counter', 'targetRoute']);
</script>

<style scoped>
.container {
    display: flex;
    padding: 5px;
    align-items: center;
}

.title {
    flex-grow: 1;
    color: #222326;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 1px;
}

.counter {
    justify-content: flex-end;
    color: #5E6AD2;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    letter-spacing: 1px;
}
</style>