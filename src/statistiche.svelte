<script>
	import Clienti from "./clienti.svelte"
	import Inventario from "./inventario.svelte"
	import Noleggi from "./noleggi.svelte"
	import Dipendenti from "./dipendenti.svelte"
    import {api} from "./store.js"
    import { useFocus, Router, Route, link, navigate } from "svelte-navigator";
    import Chart from 'chart.js/auto';

	const foucus = useFocus(); //accessibility
    
    async function RevenueByAdmin(){
        const res = await fetch(api+'/users', { 
			method: 'GET',
			headers: {
				'Accept': 'application/json',
      			'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("accessToken"),
			},
		})
        let json = await res.json()
        let print = json.results.filter((user) => user.role != "user")
        console.log(json)
        console.log(print)
        let usernames = [];
        for(let i=0;i<print.length;i++){
            usernames.push(print[i].username)
        }
        console.log(usernames)
        console.log(typeof usernames)
        //return usernames;
        const ctx1 = document.getElementById('adminRevenue').getContext('2d');
        const ctx2 = document.getElementById('adminRentals').getContext('2d');
        const adminsRevenue = new Chart(ctx1, {
            type: 'bar',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Revenue by Admin',
                    data:[10,5,3,1]
                }]
            },
            options:{
                responsive: false
            }
        })
        const adminRentals = new Chart(ctx2, {
            type: 'bar',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Revenue by Admin',
                    data:[10,5,3,1]
                }]
            },
            options:{
                responsive: false
            }
        })
    }
</script>
<div class="divButtons" use:foucus>
    <button class="selettori" >doChart</button> <!--Clienti-->
    <button class="selettori" on:click={RevenueByAdmin}>getAdmins</button> <!--Dipendenti-->
    <button class="selettori">Prodotti</button>
    <button class="selettori">Noleggi</button>
</div>
<div class="grafici">
    <canvas id="adminRevenue" width="400" height="400"></canvas>
    <canvas id="adminRentals" width="400" height="400"></canvas>
</div>
<style>
    .divButtons{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 5%;
    }
    .selettori{
        border-radius: 10%;
        margin: 0% 1%;
        border: none;
        background-color:#5AEAFB;
    }
    .selettori:hover{
        background-color: lightskyblue;
    }
    .grafici{
        margin-top: 5%;
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    

</style>