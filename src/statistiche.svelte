<script>
	import Clienti from "./clienti.svelte"
	import Inventario from "./inventario.svelte"
	import Noleggi from "./noleggi.svelte"
	import Dipendenti from "./dipendenti.svelte"
    import {api} from "./store.js"
    import { useFocus, Router, Route, link, navigate } from "svelte-navigator";
    import Chart from 'chart.js/auto';

	const foucus = useFocus(); //accessibility
    
    async function getAdmins(){
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
        return usernames;
    }
    function doChart(){
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
});
    }
</script>
<div class="divButtons" use:foucus>
    <button class="selettori" on:click={doChart}>doChart</button> <!--Clienti-->
    <button class="selettori" on:click={getAdmins}>getAdmins</button> <!--Dipendenti-->
    <button class="selettori">Prodotti</button>
    <button class="selettori">Noleggi</button>
</div>
<div>
    <canvas id="myChart" width="400" height="400"></canvas>
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
    

</style>