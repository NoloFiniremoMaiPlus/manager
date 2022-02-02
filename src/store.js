import { writable } from 'svelte/store';
//https://192.168.178.65:8443
//https://site202132.tw.cs.unibo.it/
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