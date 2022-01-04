<script>
	export let api;
	let email = "" //manager@example.com
	let password = "" //Managerpassword1
	let result = null
	
	async function doPost () {
		console.log(JSON.stringify({email,password}))
		const res = await fetch(api+'/auth/login', { 
			method: 'POST',
			headers: {
				'Accept': 'application/json',
      			'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				password
			})
		})
		const json = await res.json()
		result = JSON.stringify(json)
	}
</script>
<body>
	<h1>NoloNolo</h1>
	<h2>Manager login</h2>
	<div>
		<p>Email:</p><input bind:value={email} type="text"/>
		<p>Password:</p><input bind:value={password} type="password"/>
		<button type="button" on:click={doPost}>Login</button>
	</div>
</body>

<style>
	body{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h1{
		font-size: 4rem;
		text-align: center;
		color: #5AEAFB;
	}
	h2{
		font-size: 3rem;
		text-align: center;
		color: #5AEAFB;
	}
	div{
		width: 50%;
		display: flex;
		flex-direction: column;
  		border: 3px solid #b7e0f4;
		  border-radius: 2rem;
		padding: 1em;
	}
	p{
		font-weight: bold;
		text-align: center;
	}
	button{
		font-weight: bold;
		color: white;
		background-color:#5AEAFB; /*per il logout colore-> #C85662*/
		border:none;
		border-radius: 3px;
	}

</style>
