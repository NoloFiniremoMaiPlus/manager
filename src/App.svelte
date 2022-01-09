<script>
	import { Router, Route, link } from "svelte-navigator"
	import Login from "./login.svelte"
	
</script>

<Router>
	<header>
		<a href='/' class='link' use:link>Clienti</a> <!--<Link class="link" to="/">Clienti</Link>-->
		<a href='/' class='link' use:link>Inventario</a>
		<a href='/' class='link' use:link>Noleggi Attivi</a>
		<a href='/' class='link' use:link>Noleggi Conclusi</a>
		<a href='/' class='link' use:link>Dipendenti</a>
		<a href='login' class='logbutton' use:link>LogIn</a> <!--<Link class="link" to="login">LOGIN</Link> -->
		<a href='/' class='outbutton' use:link>LogOut</a>
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
		display: none;
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