<template>
    <div class="grid-card-container">
        <div v-if="cardTitle">
            <div class="container">
                <div class="left-box">{{ cardTitle }}</div>
                <div class="right-box">
                    <HoverMenu></HoverMenu>
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

.container {
    display: flex;
    width: 100%;
}

.left-box {
    flex-grow: 1;
    padding: 0px;
    align-items: center;
    color: #292847;
    -webkit-text-stroke-width: 1;
    -webkit-text-stroke-color: #000;
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    /* 100% */
    letter-spacing: 1px;
}

.right-box {
    width: 35px;
    padding: 0px;
    justify-content: flex-end;
    display: flex;
}
</style>

<script setup>
import { defineProps } from 'vue';
import HoverMenu from '@/components/HoverMenu.vue'

const props = defineProps(
    {
        cardTitle: String,
        default: '',
    },
    {
        cardActions: Object,
        default: {}
    }
);
</script>