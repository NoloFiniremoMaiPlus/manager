<script>
	import { Router, Route, link, navigate } from "svelte-navigator"
	import Login from "./login.svelte"
	import Logout from "./logout.svelte"
	import Stats from "./statistiche.svelte"
	import AddUsers from "./addUser.svelte"
	import PatchUsers from "./patchUser.svelte"

	function home(){
		navigate("/")
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
		
		<a href='statistiche' class='link' use:link>Statistiche</a>
		<a href='add' class='link' use:link>Add User</a>
		<a href='patch' class='link' use:link>Patch User</a>
		<a href='/' class='link'>BackOffice</a>
		<!--
			CENTRARE I QUESTI 4 <a> 
		-->
		<a href='logout' class='outbutton' use:link id="logOut">LogOut</a>
		{:else}
		{#if localStorage.getItem("id")!=undefined && localStorage.getItem("role")!="manager"}
		<p class="accName">LogIn effettuato con un account non manager.</p>
		<a href='logout' class='outbutton' use:link id="logOut">LogOut</a>
		{/if}
		<a href='login' class='logbutton' use:link id="logIn">LogIn</a>
		{/if}
	</header>
	<main>
		
		<Route path="login">
			<Login />
		</Route>
		
		<Route path="statistiche">
			<Stats />
		</Route>

		<Route path="add">
			<AddUsers />
		</Route>

		<Route path="patch">
			<PatchUsers />
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