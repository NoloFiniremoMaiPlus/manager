import App from './App.svelte';
//localhost = "https://192.168.178.65:8443"
const app = new App({
	target: document.body,
	props: {
		localhost: 'https://192.168.178.65:8443/v1'
	}
});

export default app;