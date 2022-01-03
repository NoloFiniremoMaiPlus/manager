<script>
	let username = ''
	let password = ''
	let result = null
	
	async function doPost () {
		const res = await fetch('https://httpbin.org/post', {
			method: 'POST',
			body: JSON.stringify({
				username,
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
		<p>Username:</p><input bind:value={username}/>
		<p>Password:</p><input bind:value={password}/>
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
