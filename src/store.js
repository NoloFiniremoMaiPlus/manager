import { writable } from 'svelte/store';

export const api = 'https://192.168.1.119:8443/v1'
export const user =writable({
    id:"",
    username: "",
    email: "",
    accessToken: "",
    refreshToken: "",
    expiresAccess: "",
    expiresRefresh: "",
})