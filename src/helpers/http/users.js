import axios from 'axios';
const vue_app_backend = import.meta.env.VITE_APP_BACKEND_BASE_URL;

async function deleteUser(user) {
    return axios.delete(vue_app_backend + '/v1/users/' + user.id, {
        headers: {
            'Accept': 'application/json',
            'X-API-Version': '1',
        }
    })
}

async function getUsers() {
    return axios.get(vue_app_backend + '/v1/users', {
        headers: {
            'Accept': 'application/json',
            'X-API-Version': '1',
        }
    })
}

export { deleteUser, getUsers }