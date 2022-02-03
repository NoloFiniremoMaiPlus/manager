<script>
    import {api} from "./store.js"
    import { useFocus, Router, Route, link, navigate } from "svelte-navigator";
    import Chart from 'chart.js/auto';

    

	const foucus = useFocus(); //accessibility

    function resetGraph(){

        let grafici=document.getElementsByClassName("graph")
        for(let i=0;i<grafici.length;i++){
            grafici[i].style.display="none"
        }
    }

    async function getItems(){
        const res = await fetch(api+'/items', { 
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

    async function GraphsAdmin(){    

        resetGraph()
        
        let rentals = await getRentals()
        console.log(rentals)

        let users = await getUsers()
        console.log(users)
        let admins = users.results.filter((user) => user.role != "user")

        let values = []
        let revenue = []
        for(let i=0;i<admins.length;i++){
            values[i]=0
            revenue[i]=0
        }
        let usernames = []
        let prezzoFinale = 0
        for(let i=0;i<admins.length;i++){
            usernames.push(admins[i].username)
            for(let j=0;j<rentals.length;j++){
                if(usernames[i]==rentals[j].resp.username){
                    prezzoFinale = Number(rentals[j].price.$numberDecimal) - Number(rentals[j].discount.$numberDecimal) - Number(rentals[j].loyalty) //+ Number(rentals[j].surcharge.$numberDecimal)
                    values[i]++
                    revenue[i]=revenue[i]+prezzoFinale //price-sconto-loyalty+surcharge
                }
            }
        }
        console.log(values)
        console.log(usernames)
        
        const ctx1 = document.getElementById('adminRentals').getContext('2d');
        const ctx2 = document.getElementById('adminRevenue').getContext('2d');

        document.getElementById("adminRentals").style.display="flex"
        document.getElementById("adminRevenue").style.display="flex"

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

        const adminsRevenue = new Chart(ctx2, {
            type: 'bar',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Revenue by Admin',
                    data: revenue,
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
    }

    async function GraphsUsers(){   
        
        resetGraph()
        
        let rentals = await getRentals()
        console.log(rentals)

        let users = await getUsers()
        console.log(users)
        let admins = users.results.filter((user) => user.role == "user")

        let values = []
        let revenue = []
        for(let i=0;i<admins.length;i++){
            values[i]=0
            revenue[i]=0
        }
        let usernames = []
        let prezzoFinale = 0
        for(let i=0;i<admins.length;i++){
            usernames.push(admins[i].username)
            for(let j=0;j<rentals.length;j++){
                if(usernames[i]==rentals[j].user.username){
                    prezzoFinale = Number(rentals[j].price.$numberDecimal) - Number(rentals[j].discount.$numberDecimal) - Number(rentals[j].loyalty) //+ Number(rentals[j].surcharge.$numberDecimal)
                    values[i]++
                    revenue[i]=revenue[i]+prezzoFinale //price-sconto-loyalty+surcharge
                }
            }
        }
        console.log(values)
        console.log(usernames)
        console.log(typeof usernames)
        

        const ctx1 = document.getElementById('userRentals').getContext('2d');
        const ctx2 = document.getElementById('userRevenue').getContext('2d');

        document.getElementById("userRentals").style.display="flex"
        document.getElementById("userRevenue").style.display="flex"
       
        const userRentals = new Chart(ctx1, {
            type: 'bar',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Rentals by Users',
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
        const userRevenue = new Chart(ctx2, {
            type: 'bar',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Revenue by Users',
                    data: revenue,
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
    }

    async function GraphsItems(){

        resetGraph()

        let rentals = await getRentals()
        console.log(rentals)

        let items= await getItems()
        items = items.results
        console.log(items)

        let values = []
        let revenue = []
        for(let i=0;i<items.length;i++){
            values[i]=0
            revenue[i]=0
        }

        let itemNames = []
        let prezzoFinale = 0

        for(let i=0;i<items.length;i++){
            itemNames.push(items[i].name)
            for(let j=0;j<rentals.length;j++){
                if(itemNames[i]==rentals[j].item.name){
                    prezzoFinale = Number(rentals[j].price.$numberDecimal) - Number(rentals[j].discount.$numberDecimal) - Number(rentals[j].loyalty) //+ Number(rentals[j].surcharge.$numberDecimal)
                    values[i]++
                    revenue[i]=revenue[i]+prezzoFinale //price-sconto-loyalty+surcharge
                }
            }
        }
        
        console.log(values)
        console.log(revenue)

        const ctx1 = document.getElementById('itemsRentals').getContext('2d');
        const ctx2 = document.getElementById('itemsRevenue').getContext('2d');

        document.getElementById("itemsRentals").style.display="flex"
        document.getElementById("itemsRevenue").style.display="flex"

        const itemRentals = new Chart(ctx1, {
            type: 'bar',
            data:{
                labels: itemNames,
                datasets:[{
                    label: 'Rentals by Item',
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

        const itemRevenue = new Chart(ctx2, {
            type: 'bar',
            data:{
                labels: itemNames,
                datasets:[{
                    label: 'Revenue by Item',
                    data: revenue,
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

    }

</script>
<div class="divButtons" use:foucus>
    <button class="selettori" on:click={GraphsUsers}>Clienti</button> <!--Clienti-->
    <button class="selettori" on:click={GraphsAdmin}>Dipendenti</button> <!--Dipendenti-->
    <button class="selettori" on:click={GraphsItems}>Prodotti</button>
    <button class="selettori">Noleggi</button>
</div>
<div class="grafici">
    <canvas class="graph" id="adminRentals" width="400" height="400"></canvas>
    <canvas class="graph" id="adminRevenue" width="400" height="400"></canvas>
    <canvas class="graph" id="userRentals" width="400" height="400"></canvas>
    <canvas class="graph" id="userRevenue" width="400" height="400"></canvas>
    <canvas class="graph" id="itemsRentals" width="400" height="400"></canvas>
    <canvas class="graph" id="itemsRevenue" width="400" height="400"></canvas>
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    

</style>