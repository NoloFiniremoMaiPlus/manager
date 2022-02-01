<script>
    import {api} from "./store.js"
    let nome, cognome, username, email, telefono, password, role
    let result=""
    async function submit(){
        const res = await fetch(api+'/users', { 
			method: 'POST',
			headers: {
      			'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("accessToken"),
			},body:JSON.stringify({
                    "name": nome,
                    "surname": cognome,
                    "username": username,
                    "email": email,
                    "phone": telefono,
                    "password": password,
                    "role": role,
                    "loyalty": 10
            })
		})
        console.log(res)
        let json = await res.json()
        console.log(json)
        if(res.ok){
            result = "Utente creato correttamente"
        }else{
            result = "Error: " + json.code + " " + json.message
        }
        
        
    }
</script>

<div class="form">
    <h2>Crea un utente</h2>
    <label>Nome: <br> <input type="text" placeholder="Mario" bind:value={nome}/></label>
    
    <label>Cognome: <br> <input type="text" placeholder="Rossi" bind:value={cognome}/></label>
    
    <label>Username: <br> <input type="text" placeholder="MarioRed" bind:value={username}/></label>
    
    <label>E-mail: <br> <input type="email" placeholder="mario.rossi@example.com" bind:value={email}/></label>
    
    <label>Telefono: <br> <input type="tel" placeholder="3891234567" bind:value={telefono}/></label>
    
    <label>Password: <br> <input type="password" placeholder="passwordMario4567!" bind:value={password}/></label>
    
    <label>
        Role:
        <select bind:value={role}>
            <option value="manager" >Manager</option>
            <option value="admin" >Admin</option>
            <option value="user" >User</option>
        </select>
    </label>
    
    <button on:click={submit}><b>Invia</b></button>
    
    <p>{result}</p>
</div>

<style>
    h2{
		font-size: 3rem;
		text-align: center;
		color: #5AEAFB;
	}
    .form{
        margin-top: 5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    button{
        border-radius: 10%;
        margin: 0% 1%;
        border: none;
        background-color:#5AEAFB;
    }
    button:hover{
        background-color: lightskyblue;
    }
</style>