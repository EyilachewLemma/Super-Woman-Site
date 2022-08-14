import axios from "axios";
let apiClient = axios.create({
    // baseURL: 'https://admin.super-women.merahitechnologies.com',
    baseURL: 'http://192.168.0.4:8000',
    headers: {
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Content-Type': 'application/json',


    }
})

export default apiClient