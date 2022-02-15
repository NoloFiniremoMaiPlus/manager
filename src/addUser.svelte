<script>
    import {api} from "./store.js"
    import {useFocus} from "svelte-navigator";
    const foucus = useFocus();
    let nome, cognome, username, email, password, role
    let telefono = ""
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
        
        let json = await res.json()
        
        if(res.ok){
            window.alert("Utente creato correttamente")
            let red = document.getElementsByClassName("req")
            
            for(let i=0;i<red.length;i++){
                red[i].style.border = "solid 0.5px #5AEAFB";
            }
        }else{
            window.alert( "Error: " + json.code + " " + json.message)
            let red = document.getElementsByClassName("req")
            
            for(let i=0;i<red.length;i++){
                red[i].style.border = "solid 0.5px #d41800";
            }
        }
        
        
    }
</script>

<div class="form" use:foucus>
    <h2>Crea un utente</h2>
    <label>Nome: <br> <input type="text" class="req" placeholder="Mario" bind:value={nome} required/></label>
    
    <label>Cognome: <br> <input type="text" class="req" placeholder="Rossi" bind:value={cognome} required/></label>
    
    <label>Username: <br> <input type="text" class="req" placeholder="MarioRed" bind:value={username} required/></label>
    
    <label>E-mail: <br> <input type="email" class="req" placeholder="mario.rossi@example.com" bind:value={email} required/></label>
    
    <label>Telefono: <br> <input type="tel" placeholder="3891234567" bind:value={telefono}/></label>
    
    <label>Password: <br> <input type="password" class="req" placeholder="passwordMario4567!" bind:value={password} required/></label>
    
    <label>
        Role:
        <select bind:value={role} required>
            <option value="user" >User</option>
            <option value="backoffice" >Backoffice</option>
            <option value="manager" >Manager</option>
        </select>
    </label>
    
    <button on:click={submit}><b>Invia</b></button>
</div>

<style>
    h2{
		font-size: 3rem;
		text-align: center;
		color: #5AEAFB;
	}
    label{
        text-align: center;
    }
    .form{
        margin-top: 4%;
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
    .form input{
        margin-top: 1%;
        text-align: center;
        border: solid 0.5px #5AEAFB;
    }
    .form select{
        margin-top: 1%;
        border: solid 0.5px #5AEAFB;
    }
</style>