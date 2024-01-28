<template>
    <v-app-bar color="blue" height="49" elevation="0" scroll-behavior="hide" scroll-threshold="50">
        <div class="view-component-title">{{ title }}</div>
    </v-app-bar>
    <div class="remuner-view-component">
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'ViewComponent',
    props: {
        title: {
            type: String,
        }
    }
}
</script>


<style scoped>
.remuner-view-component {
    padding: 30px;
    background: #E9E9EC;
}

.v-app-bar {
    color: white !important;
    padding-left: 54px;
    background-color: #5E6AD2 !important;
    height: 49px;
    align-items: center;
}

.view-component-title {
    color: #FFF;
    font-weight: 700;
    letter-spacing: 1px;
}
</style>
