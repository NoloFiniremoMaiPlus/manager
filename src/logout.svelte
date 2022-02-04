<script>
    import {url, api} from "./store.js"
    import {navigate} from "svelte-navigator"
	
    async function LogOut(){
		const res = await fetch(api+'/auth/logout', { 
			method: 'POST',
			headers: {
				'Accept': 'application/json',
      			'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				refreshToken: localStorage.getItem("refreshToken")
			})
		})
		
		if(res.status==204){
			localStorage.clear()
			navigate(url+"/manager")
			location.reload()
		}else{
			window.alert("Errore durante il logout " + res.status + " " + res.statusText)
		}
		
	}
    
    function noLogOut(){
        navigate(url+"/manager")
        location.reload()
    }

</script>

<div class='box'>
    <h1>LogOut</h1>
    <h2>Sei sicuro di voler eseguire il logout?</h2>
    <div>
        <button on:click="{LogOut}">SI</button>
        <br>
        <button on:click="{noLogOut}">NO</button>
    </div>
</div>


<style>
	.box{
		display: flex;
		margin: auto auto;
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
		padding: 1em;
	}
	button{
		font-weight: bold;
		color: white;
		background-color:#5AEAFB;
		border:none;
		border-radius: 3px;
	}

</style>
