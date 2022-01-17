import { writable } from 'svelte/store';
//https://192.168.178.65:8443
export const api = 'https://192.168.178.65:8443/v1'

export const user =writable({
    id:"",
    username: "",
    email: "",
    role: "",
    accessToken: "",
    refreshToken: "",
    expiresAccess: "",
    expiresRefresh: "",
})