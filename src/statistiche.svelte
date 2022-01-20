<script>
	import Clienti from "./clienti.svelte"
	import Inventario from "./inventario.svelte"
	import Noleggi from "./noleggi.svelte"
	import Dipendenti from "./dipendenti.svelte"
    import {api} from "./store.js"
    import { useFocus, Router, Route, link, navigate } from "svelte-navigator";
    import Chart from 'chart.js/auto';

	const foucus = useFocus(); //accessibility

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

    async function getRentals(){ //userid = 61e59a87827a2a7757adb6e7
        const res = await fetch(api+'/rentals', { 
			method: 'GET',
			headers: {
				'Accept': 'application/json',
      			'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem("accessToken"),
			},
		})
        let json = await res.json() 
        return json.results
    }

    async function RevenueByAdmin(){
        let rentals = await getRentals()
        console.log(rentals)
        
        let users = await getUsers()
        console.log(users)
        let admins = users.results.filter((user) => user.role != "user")

        let values = []
        for(let i=0;i<admins.length;i++){
            values[i]=0
        }
        let usernames = []

        for(let i=0;i<admins.length;i++){
            usernames.push(admins[i].username)
            for(let j=0;j<rentals.length;j++){
                if(admins[i].username==rentals[j].resp.username){
                    values[i]++
                }
            }
        }
        console.log(values)
        console.log(usernames)
        console.log(typeof usernames)
        //return usernames;

        const ctx1 = document.getElementById('adminRentals').getContext('2d');
        const ctx2 = document.getElementById('adminRevenue').getContext('2d');
       
        const adminsRentals = new Chart(ctx1, {
            type: 'bar',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Rentals by Admin',
                    data: values,
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
    <button class="selettori" on:click={getRentals}>getRentals</button> <!--Clienti-->
    <button class="selettori" on:click={RevenueByAdmin}>RevenueByAdmin</button> <!--Dipendenti-->
    <button class="selettori">Prodotti</button>
    <button class="selettori">Noleggi</button>
</div>
<div class="grafici">
    <canvas id="adminRentals" width="400" height="400"></canvas>
    <canvas id="adminRevenue" width="400" height="400"></canvas>
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