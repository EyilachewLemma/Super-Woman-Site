import axios from "axios";
let imageApi = axios.create({
    baseURL: 'https://admin.super-women.merahitechnologies.com',
    // baseURL: 'http://192.168.0.3:8000',
    headers: {
        Accept: 'application/json',
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem('tokenu')}`,
        'Access-Control-Allow-Origin': '*',
    }
})

export default imageApi