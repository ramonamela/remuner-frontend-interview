<template>
    <div class="grid-card-container">
        <div v-if="cardTitle">
            <div class="container">
                <div class="left-box"><div class="grid-card-title">{{ cardTitle }}</div><div class="grid-card-separator"><v-divider thickness="1" color="#4C4B6E" class="border-opacity-25"></v-divider></div></div>
                <div class="right-box">
                    <HoverMenu :items="cardActions"></HoverMenu>
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped>
.grid-card-container {
    background: #FFF;
    height: 100%;
    padding-left: 30px;
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    border-radius: 5px;
}

.grid-card-separator {
    flex-grow: 1;
}

.grid-card-title {
    padding-right: 20px;
}

.container {
    display: flex;
    width: 100%;
}

.left-box {
    flex-grow: 1;
    padding: 0px;
    align-items: center;
    color: #292847;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: 1px;
    display: flex;
}

.right-box {
    width: 35px;
    padding: 0px;
    justify-content: flex-end;
    display: flex;
    margin-left: 20px;
}
</style>

<script setup>
import { defineProps } from 'vue';
import HoverMenu from '@/components/HoverMenu.vue'

const { cardTitle, cardActions } = defineProps(['cardTitle', 'cardActions']);

</script>