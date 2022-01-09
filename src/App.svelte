<script>
	import { Router, Route, link } from "svelte-navigator"
	import Login from "./login.svelte"
	import {api} from "./store.js"

	async function LogOut(){
		const res = await fetch(api+'/auth/logout', { 
			method: 'POST',
			headers: {
				'Accept': 'application/json',
      			'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				refreshToken: localStorage.getItem("refreshToken")
			})
		})
		console.log(res.status)
		if(res.statu=204){
			localStorage.clear()
			location.reload()
		}else{
			window.alert("Errore durante il logout " + res.status + " " + res.statusText)
		}
		
	}
</script>

<Router>
	<header>
		<a href='/' class='link' use:link>Clienti</a> <!--<Link class="link" to="/">Clienti</Link>-->
		<a href='/' class='link' use:link>Inventario</a>
		<a href='/' class='link' use:link>Noleggi Attivi</a>
		<a href='/' class='link' use:link>Noleggi Conclusi</a>
		<a href='/' class='link' use:link>Dipendenti</a>
		{#if localStorage.getItem("id")==undefined}
		<a href='login' class='logbutton' use:link id="logIn">LogIn</a> <!--<Link class="link" to="login">LOGIN</Link> -->
		{:else}
		<a href='/' class='outbutton' use:link id="logOut" on:click="{LogOut}">LogOut</a>
		{/if}
	</header>
	<main>
		<Route path="login">
			<Login />
		</Route>
	</main>
</Router>
<style>
	header{
		display: flex;
		flex-direction: row;
		height: 5%;
		background-color:white;
		border-bottom: 4px solid black; /*testing*/
	}
	.link{
		color: black;
		padding: 0.5% 0.5%;
	}
	.link:hover{
		background-color: darkgrey;
		text-decoration: none;
	}
	.logbutton{
		margin-left: auto;
		display: block;
		padding: 0.5% 0.5%;
		color: black;
		background-color:#5AEAFB; /*per il logout colore-> #C85662*/
		border:none;
	}
	.logbutton:hover{
		text-decoration: none;
		background-color: #3aa5b1;
	}
	.outbutton{
		margin-left: auto;
		display: block;
		padding: 0.5% 0.5%;
		color: black;
		background-color: #C85662;
		border:none;
	}
	.outbutton:hover{
		text-decoration: none;
		background-color: #ff1b31;
	}

</style>