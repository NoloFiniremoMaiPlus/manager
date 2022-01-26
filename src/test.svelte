<script>
	import Clienti from "./clienti.svelte"
	import Inventario from "./inventario.svelte"
	import Noleggi from "./noleggi.svelte"
	import Dipendenti from "./dipendenti.svelte"
    import {api} from "./store.js"
    import { useFocus, Router, Route, link, navigate } from "svelte-navigator";
    import Chart from 'chart.js/auto';
    import Bar from "svelte-chartjs/src/Bar.svelte"

    

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
                if(admins[i].username==rentals[j].resp.username){
                    prezzoFinale = Number(rentals[j].price.$numberDecimal) - Number(rentals[j].discount.$numberDecimal) - Number(rentals[j].loyalty) + Number(rentals[j].surcharge.$numberDecimal)
                    values[i]++
                    revenue[i]=revenue[i]+prezzoFinale //price-sconto-loyalty+surcharge
                }
            }
        }
        console.log(values)
        console.log(usernames)
        let dataRentalsByAdmins = {
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
            }
        }
        return dataRentalsByAdmins
        //------------------------------------------------------------------------------------------

    }


    async function RevenueByUsers(){    
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
                if(admins[i].username==rentals[j].user.username){
                    prezzoFinale = Number(rentals[j].price.$numberDecimal) - Number(rentals[j].discount.$numberDecimal) - Number(rentals[j].loyalty) + Number(rentals[j].surcharge.$numberDecimal)
                    values[i]++
                    revenue[i]=revenue[i]+prezzoFinale //price-sconto-loyalty+surcharge
                }
            }
        }
        console.log(values)
        console.log(usernames)
        console.log(typeof usernames)
        
    }

    let dataRentalsByAdmins = RevenueByAdmin();
    console.log(dataRentalsByAdmins)
    

</script>
<Router>
    <div class="divButtons" use:foucus>
        <a href="clienti" class="selettori" use:link>Clienti</a> <!--Clienti-->
        <a href="dipendenti" class="selettori" use:link>Dipendenti</a> <!--Dipendenti-->
        <a href="prodotti" class="selettori" use:link>Prodotti</a>
        <a href="noleggi" class="selettori" use:link>Noleggi</a>
    </div>
    <div class="grafici">

        <Route path="clienti">
            <Bar />
            <Bar />
        </Route>

        <Route path="dipendenti">
            <Bar />
            <Bar />
        </Route>

        <Route path="prodotti">

        </Route>

        <Route path="noleggi">

        </Route>
    </div>
</Router>
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