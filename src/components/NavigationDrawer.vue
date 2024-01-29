<template>
    <v-navigation-drawer v-model="drawer" :rail="rail" permanent :width=navWidth>
        <v-list nav>

            <router-link to="/">
                <v-list-item prepend-icon="mdi-home-city" title="" value="home" v-if="rail" class="v-list-icon">
                </v-list-item>
                <v-list-item title="" value="home" v-if="!rail">
                    <div class="nav-title-selected">Overview</div>
                </v-list-item>
            </router-link>
            <router-link to="/users">
                <v-list-item prepend-icon="mdi-account" title="" value="users" v-if="rail" class="v-list-icon">
                </v-list-item>
                <v-list-item title="" value="users" v-if="!rail">
                    <div class="nav-title-selected">Usuarios</div>
                </v-list-item>
            </router-link>
            <router-link to="/teams">
                <v-list-item prepend-icon="mdi-account-group-outline" title="" value="teams" v-if="rail"
                    class="v-list-icon">
                </v-list-item>
                <v-list-item title="" value="teams" v-if="!rail">
                    <div class="nav-title-selected">Equipos</div>
                </v-list-item>
            </router-link>
            <router-link to="/integrations">
                <v-list-item prepend-icon="mdi-connection" title="" value="integrations" v-if="rail" class="v-list-icon">
                </v-list-item>
                <v-list-item title="" value="integrations" v-if="!rail">
                    <div class="nav-title-selected random-integrations-spacing">Integraciones</div>
                </v-list-item>
            </router-link>


            <v-list-item prepend-icon="mdi-email-outline" :href="'mailto:help@company.com'" title="" value="email"
                v-if="rail" class="fixedBottom v-list-icon">
            </v-list-item>
            <v-list-item v-if="!rail" class="contact-container">
                <div class="v-nav-help-text-format">
                    <div class="v-nav-help-doubts">Any doubts?</div>
                    <div class="v-nav-help-contact">Contact us at:</div>
                    <div>
                        <a class="v-nav-help-link" :href="'mailto:help@company.com'">help@company.com</a>
                    </div>
                </div>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
    
<script>

import { ref } from 'vue'

const rail = ref(true)
const drawer = ref(true)
/* 768 */
function checkScreenSize() {
    const mediaQuery = window.matchMedia('(max-width: 1200px)'); // Adjust the media query as needed
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
    props: {
        navWidth: String
    }
}
</script>

<style>
.router-link-active > .v-list-item > .v-list-item__prepend {
    color: #222326;
    opacity: 1;
}
</style>

<style scoped>
.v-list-item--link {
    margin: 5px;
    border-radius: 2px;
    background: #424246;
    color:#FFF;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 100% */
    letter-spacing: 1px;
}
.v-list-icon {
    max-width: 40px;
}

.v-list {
    padding: 0px;
}

.random-integrations-spacing {
    letter-spacing: -0.442px;
}

.contact-container {
    position: fixed;
    bottom: 0;
    padding: 15px;
}

a {
    text-decoration: none;
}

.router-link-active > .v-list-item {
    background: #F4F5F8;
    background-color: #F4F5F8;
}

.router-link-active .nav-title-selected {
    color: #222326 !important;
    font-weight: 700;
}

.v-navigation-drawer {
    background: #222326;
}

.v-nav-help-text-format {
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    font-size: 15.1px;
    color: #FFF;
}

.v-nav-help-doubts {

    letter-spacing: -0.442px;
}

.v-nav-help-contact {
    font-weight: 400;
    letter-spacing: -0.442px;
}

.v-nav-help-link {
    color: #5E6AD2 !important;
    text-align: center;
    letter-spacing: -0.442px;
    text-decoration: none;
}</style>
