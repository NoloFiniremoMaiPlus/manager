<script>
    import {api} from "./store.js"
    import {useFocus} from "svelte-navigator";
    let nome, cognome, username, email, telefono, loyalty
    let user, users=[], res;

    const foucus = useFocus();

    async function getUsers(){
        const res = await fetch(api+'/users', { 
			method: 'GET',
			headers: {
				'Accept': 'application/json',
      			'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("accessToken"),
			},
		})
        let json = await res.json()
        return json
    }
    async function load(){
        res = await getUsers()
        users = res.results
    }

    window.onload = load()

    async function showUser(){

        nome = user.name
        cognome = user.surname
        username = user.username
        email = user.email
        telefono = (user.phone) ? user.phone : ""
        loyalty = user.loyalty

        document.getElementById("form").style.display="flex"

    }

    async function patchUser(){
        const res = await fetch(api+'/users/'+user.id, { 
			method: 'PATCH',
			headers: {
      			'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("accessToken"),
			},body:JSON.stringify({
                    "name": nome,
                    "surname": cognome,
                    "username": username,
                    "email": email,
                    "phone": telefono,
                    "password": user.password,
                    "loyalty": loyalty
            })
		})
        let json = await res.json()
        if(res.ok){
            window.alert("Utente aggiornato correttamente")
        }else{
            window.alert(json.message)
        }
    }
    
    
</script>

<div use:foucus class="selettore">
    <h2>Modifica un utente</h2>
    <select bind:value={user} on:change={showUser}>
        {#each users as user}
            <option value={user}>
                {user.username}
            </option>
        {/each}
	</select>
    <div id="form">

        <label>Nome: <br> <input type="text" bind:value={nome}/></label>
    
        <label>Cognome: <br> <input type="text" bind:value={cognome} /></label>
        
        <label>Username: <br> <input type="text" bind:value={username} /></label>
        
        <label>E-mail: <br> <input type="email" bind:value={email} /></label>
        
        <label>Telefono: <br> <input type="tel" bind:value={telefono}/></label>

        <label>Loyalty: <br> <input type="number" bind:value={loyalty}/></label>

        <button on:click={patchUser}><b>Patch</b></button>
        
    </div>
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
    .selettore{
        margin-top:4%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    select{
        border: solid 0.5px #5AEAFB;
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
    #form{
        margin-top:2%;
        display: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    input{
        text-align: center;
    }
</style>