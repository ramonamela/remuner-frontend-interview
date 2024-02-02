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

async function createTeam(team) {
    return axios.post(vue_app_backend + '/v1/teams', team, {
        headers: {
            'Accept': 'application/json',
            'X-API-Version': '1',
            'ContentType': 'application/json',
        },
    })
}

async function updateTeam(team) {
    return axios.post(vue_app_backend + '/v1/teams/' + team.id, team, {
        headers: {
            'Accept': 'application/json',
            'X-API-Version': '1',
            'ContentType': 'application/json',
        },
    })
}

async function getTeamsStats() {
    return axios.get(vue_app_backend + '/v1/teams/stats', {
        headers: {
            'Accept': 'application/json',
            'X-API-Version': '1',
        }
    })
}

export { deleteTeam, getTeams, createTeam, updateTeam, getTeamsStats }