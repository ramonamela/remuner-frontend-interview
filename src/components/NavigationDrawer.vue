<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
            <template v-slot:append>
                <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
            </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list nav>
            <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
            <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
            <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
            <v-list-item class="fixedBottom">
                <v-list-item-icon v-if="rail">
                    <v-icon>mdi-email-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content v-if="!rail">
                    <div>
                        <div>Any doubts?</div>
                        <div>Contact us at:</div>
                        <div>help@company.com</div>
                    </div>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
    
<script>

import { ref } from 'vue'

const drawer = ref(true)
const rail = ref(true)

function checkScreenSize() {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Adjust the media query as needed
    const isSmallScreen = mediaQuery.matches;

    if (isSmallScreen) {
        rail.value = true;
    } else {
        rail.value = false;
    }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

export default {
    data() {
        return {
            drawer,
            rail,
        }
    },
}
</script>

<style scoped>
.fixedBottom {
    position: fixed !important;
    bottom: 0 !important;
    background: #FFF;
}
</style>