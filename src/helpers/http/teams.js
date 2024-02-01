import axios from 'axios';
const vue_app_backend = import.meta.env.VITE_APP_BACKEND_BASE_URL;

async function deleteTeam(team) {
    return axios.delete(vue_app_backend + '/v1/teams/' + team.id, {
        headers: {
            'Accept': 'application/json',
            'X-API-Version': '1',
        }
    })
}

async function getTeams() {
    return axios.get(vue_app_backend + '/v1/teams', {
        headers: {
            'Accept': 'application/json',
            'X-API-Version': '1',
        }
    })
}

export { deleteTeam, getTeams }