import { writable } from 'svelte/store';
//https://site202132.tw.cs.unibo.it/
export const api = 'https://site202132.tw.cs.unibo.it/v1'

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