import axios from 'axios'

export const HTTP = axios.create({
    baseURL: `http://localhost:64675/api/`,
    headers: {
        "Content-Type": "application/json"
    }
})