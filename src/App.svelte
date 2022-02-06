<script>
	import { Router, Route, link, navigate } from "svelte-navigator"
	import Login from "./login.svelte"
	import Logout from "./logout.svelte"
	import Stats from "./statistiche.svelte"
	import AddUsers from "./addUser.svelte"
	import PatchUsers from "./patchUser.svelte"
	import {url, api} from "./store.js" 

	function home(){
		navigate(url + "/manager")
		location.reload()
	}
</script>

<Router>

	<header>

		<button class="home" on:click="{home}">
			<i class="mi mi-home"><span class="u-sr-only">Home</span></i>
		</button>
		{#if localStorage.getItem("id")!=undefined && localStorage.getItem("role")=="manager"}
		<p class="accName">Welcome {localStorage.getItem("username")}!</p>
	
		<a href='/manager/statistiche' class='link' use:link>Statistiche</a>
		<a href='/manager/add' class='link' use:link>Add User</a>
		<a href='/manager/patch' class='link' use:link>Patch User</a>
		<a href='{url}/office' class='link'>BackOffice</a>
		<a href='/manager/logout' class='outbutton' use:link id="logOut">LogOut</a>
	
		{:else}
			{#if localStorage.getItem("id")!=undefined && localStorage.getItem("role")!="manager"}
			<p class="accName">LogIn effettuato con un account non manager.</p>
			<a href='/manager/logout' class='outbutton' use:link id="logOut">LogOut</a>
			{/if}
		{/if}
		{#if localStorage.getItem("id")==undefined}
			<a href='/manager/login' class='logbutton' use:link id="logIn">LogIn</a>
		{/if}

	</header>
	<main>
		
		<Route path="/manager/login">
			<Login />
		</Route>
		
		<Route path="/manager/statistiche">
			<Stats />
		</Route>

		<Route path="/manager/add">
			<AddUsers />
		</Route>

		<Route path="/manager/patch">
			<PatchUsers />
		</Route>
		
		<Route path="/manager/logout">
			<Logout />
		</Route>
		
	</main>
</Router>

<style>
	header{
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		height: 6%;
		background-color: whitesmoke;
		
	}
	.accName{
		font-weight: bolder;
		margin-left: 1%;
		color: black;
		align-self: center;
	}
	.link{
		align-self: center;
		color: black;
		padding: 0.5% 0.5%;
		margin: 0% 1%;
	}
	.link:hover{
		border-radius: 10%;
		background-color: lightskyblue;
		text-decoration: none;
	}
	.logbutton{
		align-self: center;
		margin-left: auto;
		display: block;
		margin-right: 1%;
		padding: 0.5% 0.5%;
		color: black;
		background-color:#5AEAFB;
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
	.home{
		background-color: transparent;
		border: none;
		align-self: center;
		margin-top: 0.5%;
		
	}
	.mi:hover{
		color: lightskyblue;
	}

	.mi {
		font-size: 1.4rem;
	}
	.u-sr-only {
		position: absolute;
		left: -10000px;
		top: auto;
		width:1px;
		height:1px;
		overflow:hidden;
	}
</style>