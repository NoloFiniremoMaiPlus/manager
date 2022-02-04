<script>
    import {user, api} from "./store.js"
	import {navigate} from "svelte-navigator"
	let email = "" 
	let password = "" 
	let result = ""
	function setStore(){
		if(user.id!=null){
			localStorage.setItem("id",user.id)
			localStorage.setItem("username",user.username)
			localStorage.setItem("email",user.email)
			localStorage.setItem("accessToken",user.accessToken)
			localStorage.setItem("refreshToken",user.refreshToken)
			localStorage.setItem("expiresAccess",user.expiresAccess)
			localStorage.setItem("expiresRefresh",user.expiresRefresh)
			localStorage.setItem("role",user.role)
		}
	}
	
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

        if(res.status==200){

            result = "logged in"
            
            user.id = json.user.id
            user.email = json.user.email
            user.username = json.user.name
            user.accessToken = json.tokens.access.token
            user.expiresAccess = json.tokens.access.expires
            user.refreshToken = json.tokens.refresh.token
            user.expiresRefresh = json.tokens.refresh.expires
			user.role = json.user.role
			setStore()
			navigate("site202132.tw.cs.unibo.it/manager")
			location.reload()

        }else{
            result = res.statusText
        }
	}
	
</script>
<form>
    <h1>NoloNolo</h1>
    <h2>Manager login</h2>
    <div>
        <p>Email:</p><input bind:value={email} type="text"/>
        <p>Password:</p><input bind:value={password} type="password"/>
        <button type="button" on:click={doPost}>Login</button>
        <p>{result}</p>
    </div>
</form>


<style>
	form{
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
		background-color:#5AEAFB;
		border:none;
		border-radius: 3px;
	}

</style>
