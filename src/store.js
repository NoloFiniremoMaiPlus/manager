import { writable } from 'svelte/store';

export const user =writable({
    id:"",
    username: "",
    email: "",
    accessToken: "",
    refreshToken: "",
    expiresAccess: "",
    expiresRefresh: "",
})