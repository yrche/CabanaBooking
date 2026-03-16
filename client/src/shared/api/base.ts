import axios from "axios";

export const $apiInstance = axios.create({
    baseURL: '/api',
    headers: {'X-Custom-Header': 'foobar'}
});