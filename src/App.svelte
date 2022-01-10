<script>
	import { Router, Route, link } from "svelte-navigator"
	import Login from "./login.svelte"
	import Logout from "./logout.svelte";
</script>

<Router>
	<header>
		{#if localStorage.getItem("id")!=undefined && localStorage.getItem("role")=="manager"}
		<p class="accName">Welcome {localStorage.getItem("username")}!</p>
		<a href='clienti' class='link' use:link>Clienti</a>
		<a href='Inventario' class='link' use:link>Inventario</a>
		<a href='Noleggi attivi' class='link' use:link>Noleggi Attivi</a>
		<a href='Noleggi conclusi' class='link' use:link>Noleggi Conclusi</a>
		<a href='Dipendenti' class='link' use:link>Dipendenti</a>
		<a href='logout' class='outbutton' use:link id="logOut">LogOut</a>
		{:else}
		{#if localStorage.getItem("id")!=undefined && localStorage.getItem("role")!="manager"}
		<p>LogIn effettuato con un account non manager.</p>
		{/if}
		<a href='login' class='logbutton' use:link id="logIn">LogIn</a>
		{/if}
	</header>
	<main>
		
		<Route path="login">
			<Login />
		</Route>

		<Route path="clienti">
			
		</Route>

		<Route path="Inventario">
			
		</Route>
		
		<Route path="Noleggi attivi">
			
		</Route>

		<Route path="Noleggi conclusi">
			
		</Route>
		
		<Route path="Dipendenti">
			
		</Route>
		
		<Route path="logout">
			<Logout />
		</Route>

		
	</main>
</Router>
<style>
	header{
		display: flex;
		flex-direction: row;
		height: 5%;
	}
	.accName{
		font-weight: bolder;
		margin-left: 1%;
		margin-right: auto;
		color: black;
		align-self: center;
	}
	.link{
		align-self: center;
		color: black;
		padding: 0.5% 0.5%;
	}
	.link:hover{
		border-radius: 10%;
		background-color: darkgrey;
		text-decoration: none;
	}
	.logbutton{
		align-self: center;
		margin-left: auto;
		display: block;
		margin-right: 1%;
		padding: 0.5% 0.5%;
		color: black;
		background-color:#5AEAFB; /*per il logout colore-> #C85662*/
		border:none;
		border-radius: 10%;
	}
	.logbutton:hover{
		text-decoration: none;
		background-color: #3aa5b1;
	}
	.outbutton{
		align-self: center;
		margin-left: auto;
		margin-right: 1%;
		display: block;
		padding: 0.5% 0.5%;
		color: black;
		background-color: #C85662;
		border:none;
		border-radius: 10%;
	}
	.outbutton:hover{
		text-decoration: none;
		background-color: #ff1b31;
	}

</style>