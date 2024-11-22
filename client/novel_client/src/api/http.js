import axios from 'axios'

function create(baseURL, options) {
    const instance = axios.create(Object.assign({baseURL}), options)
    return instance
}

export const novelApi = create('http://localhost:8001/api/auth/login')