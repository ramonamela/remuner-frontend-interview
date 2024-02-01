import axios from 'axios';
const vue_app_backend = import.meta.env.VITE_APP_BACKEND_BASE_URL;

async function deleteIntegration(integration) {
    return axios.delete(vue_app_backend + '/v1/integrations/' + integration.id, {
        headers: {
            'Accept': 'application/json',
            'X-API-Version': '1',
        }
    })
}

async function getIntegrations() {
    return axios.get(vue_app_backend + '/v1/integrations', {
        headers: {
            'Accept': 'application/json',
            'X-API-Version': '1',
        }
    })
}

export { deleteIntegration, getIntegrations }