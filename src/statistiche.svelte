<script>
    import {api} from "./store.js"
    import { useFocus} from "svelte-navigator";
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

    async function getRentals(){
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
    
        let users = await getUsers()
        let admins = users.results.filter((user) => user.role != "user")

        let values = []
        let revenue = []

        for(let i=0;i<admins.length;i++){
            values[i]=0
            revenue[i]=0
        }

        let usernames = []

        for(let i=0;i<admins.length;i++){
            usernames.push(admins[i].username)
            for(let j=0;j<rentals.length;j++){
                if(usernames[i]==rentals[j].resp.username){
                    values[i]++
                    revenue[i]=revenue[i] + rentals[j].total 
                }
            }
        }
        
        const ctx1 = document.getElementById('adminRentals').getContext('2d');
        const ctx2 = document.getElementById('adminRevenue').getContext('2d');
        const ctx3 = document.getElementById('adminRentalsdou').getContext('2d');
        const ctx4 = document.getElementById('adminRevenuedou').getContext('2d');

        document.getElementById("adminRentals").style.display="flex"
        document.getElementById("adminRevenue").style.display="flex"
        document.getElementById("adminRentalsdou").style.display="flex"
        document.getElementById("adminRevenuedou").style.display="flex"

        let colors1=[]
        //let colors1hover=[]
        let colors2=[]
        //let colors2hover=[]
        let x,y,z
        for(let i=0;i<usernames.length;i++){
            x = Math.floor(Math.random() * 256)
            y = 100+ Math.floor(Math.random() * 256)
            z = 50+ Math.floor(Math.random() * 256)
            colors1.push("rgb(" + x + "," + y + "," + z + ",1)")
            //colors1hover.push("rgb(" + x + "," + y + "," + z + ",1)")

            x = Math.floor(Math.random() * 256)
            y = 100+ Math.floor(Math.random() * 256)
            z = 50+ Math.floor(Math.random() * 256)
            colors2.push("rgb(" + x + "," + y + "," + z + ",1)")
            //colors2hover.push("rgb(" + x + "," + y + "," + z + ",1)")
        }


        const adminsRentals = new Chart(ctx1, {
            type: 'bar',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Rentals by Admin',
                    data: values,
                    backgroundColor: colors1,
                    hoverBackgroundColor: colors1,
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
                    backgroundColor: colors2,
                    hoverBackgroundColor: colors2,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })

        const adminsRentalsdou = new Chart(ctx3, {
            type: 'doughnut',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Rentals by Admin',
                    data: values,
                    backgroundColor: colors1,
                    hoverBackgroundColor: colors1,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })
        const adminsRevenuedou = new Chart(ctx4, {
            type: 'doughnut',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Revenue by Admin',
                    data: revenue,
                    backgroundColor: colors2,
                    hoverBackgroundColor: colors2,
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
        

        let users = await getUsers()
        
        let admins = users.results.filter((user) => user.role == "user")

        let values = []
        let revenue = []
        for(let i=0;i<admins.length;i++){
            values[i]=0
            revenue[i]=0
        }

        let usernames = []
        
        for(let i=0;i<admins.length;i++){
            usernames.push(admins[i].username)
            for(let j=0;j<rentals.length;j++){
                if(usernames[i]==rentals[j].user.username){
                    values[i]++
                    revenue[i]=revenue[i]+rentals[j].total
                }
            }
        }
        
        const ctx1 = document.getElementById('userRentals').getContext('2d');
        const ctx2 = document.getElementById('userRevenue').getContext('2d');
        const ctx3 = document.getElementById('userRentalsdou').getContext('2d');
        const ctx4 = document.getElementById('userRevenuedou').getContext('2d');

        document.getElementById("userRentals").style.display="flex"
        document.getElementById("userRevenue").style.display="flex"
        document.getElementById("userRentalsdou").style.display="flex"
        document.getElementById("userRevenuedou").style.display="flex"
       
        let colors1=[]
        //let colors1hover=[]
        let colors2=[]
        //let colors2hover=[]
        let x,y,z
        for(let i=0;i<usernames.length;i++){
            x = Math.floor(Math.random() * 256)
            y = 100+ Math.floor(Math.random() * 256)
            z = 50+ Math.floor(Math.random() * 256)
            colors1.push("rgb(" + x + "," + y + "," + z + ",1)")
            //colors1hover.push("rgb(" + x + "," + y + "," + z + ",1)")

            x = Math.floor(Math.random() * 256)
            y = 100+ Math.floor(Math.random() * 256)
            z = 50+ Math.floor(Math.random() * 256)
            colors2.push("rgb(" + x + "," + y + "," + z + ",1)")
            //colors2hover.push("rgb(" + x + "," + y + "," + z + ",1)")
        }

        const userRentals = new Chart(ctx1, {
            type: 'bar',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Rentals by Users',
                    data: values,
                    backgroundColor: colors1,
                    hoverBackgroundColor: colors1,
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
                    backgroundColor: colors2,
                    hoverBackgroundColor: colors2,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })
        const userRentalsdou = new Chart(ctx3, {
            type: 'doughnut',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Rentals by Users',
                    data: values,
                    backgroundColor: colors1,
                    hoverBackgroundColor: colors1,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })
        const userRevenuedou = new Chart(ctx4, {
            type: 'doughnut',
            data:{
                labels: usernames,
                datasets:[{
                    label: 'Revenue by Users',
                    data: revenue,
                    backgroundColor: colors2,
                    hoverBackgroundColor: colors2,
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
        

        let items= await getItems()
        items = items.results
        

        let values = []
        let revenue = []
        for(let i=0;i<items.length;i++){
            values[i]=0
            revenue[i]=0
        }

        let itemNames = []
        

        for(let i=0;i<items.length;i++){
            itemNames.push(items[i].name)
            for(let j=0;j<rentals.length;j++){
                if(itemNames[i]==rentals[j].item.name){
                    values[i]++
                    revenue[i]=revenue[i]+rentals[j].total
                }
            }
        }
        

        const ctx1 = document.getElementById('itemsRentals').getContext('2d');
        const ctx2 = document.getElementById('itemsRevenue').getContext('2d');
        const ctx3 = document.getElementById('itemsRentalsdou').getContext('2d');
        const ctx4 = document.getElementById('itemsRevenuedou').getContext('2d');

        document.getElementById("itemsRentals").style.display="flex"
        document.getElementById("itemsRevenue").style.display="flex"
        document.getElementById("itemsRentalsdou").style.display="flex"
        document.getElementById("itemsRevenuedou").style.display="flex"

        let colors1=[]
        //let colors1hover=[]
        let colors2=[]
        //let colors2hover=[]
        let x,y,z
        for(let i=0;i<itemNames.length;i++){
            x = Math.floor(Math.random() * 256)
            y = 100+ Math.floor(Math.random() * 256)
            z = 50+ Math.floor(Math.random() * 256)
            colors1.push("rgb(" + x + "," + y + "," + z + ",1)")
            //colors1hover.push("rgb(" + x + "," + y + "," + z + ",1)")

            x = Math.floor(Math.random() * 256)
            y = 100+ Math.floor(Math.random() * 256)
            z = 50+ Math.floor(Math.random() * 256)
            colors2.push("rgb(" + x + "," + y + "," + z + ",1)")
            //colors2hover.push("rgb(" + x + "," + y + "," + z + ",1)")
        }

        const itemRentals = new Chart(ctx1, {
            type: 'bar',
            data:{
                labels: itemNames,
                datasets:[{
                    label: 'Rentals by Item',
                    data: values,
                    backgroundColor: colors1,
                    hoverBackgroundColor: colors1,
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
                    backgroundColor: colors2,
                    hoverBackgroundColor: colors2,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })

        const itemRentalsdou = new Chart(ctx3, {
            type: 'doughnut',
            data:{
                labels: itemNames,
                datasets:[{
                    label: 'Rentals by Item',
                    data: values,
                    backgroundColor: colors1,
                    hoverBackgroundColor: colors1,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })

        const itemRevenuedou = new Chart(ctx4, {
            type: 'doughnut',
            data:{
                labels: itemNames,
                datasets:[{
                    label: 'Revenue by Item',
                    data: revenue,
                    backgroundColor: colors2,
                    hoverBackgroundColor: colors2,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })

    }

    async function GraphsRentals(){

        resetGraph()
        
        let rentals = await getRentals()

        let ids=[]
        let names=[]
        let dates=[]
        let revenue=[]
        let rentalsOnDate=[]
        let revenueOnDate=[]
        
        

        for(let i=0;i<rentals.length;i++){

            ids.push("Item:"+rentals[i].item.name + " ID rental:"+rentals[i].id)
            names.push(rentals[i].item.name)
            revenue.push(rentals[i].total)

            if(!dates.includes(rentals[i].from.slice(0,10))){
                dates.push(rentals[i].from.slice(0,10))
            }
            if(!dates.includes(rentals[i].to.slice(0,10))){
                dates.push(rentals[i].to.slice(0,10))
            }
        }

        dates.sort()
        

        for(let i=0;i<dates.length;i++){
            rentalsOnDate[i] = 0
            revenueOnDate[i] = 0
            for(let j=0;j<rentals.length;j++){
                if(dates[i]>=rentals[j].from.slice(0,10) && dates[i]<=rentals[j].to.slice(0,10)){
                    rentalsOnDate[i]++
                    revenueOnDate[i]= revenueOnDate[i] + rentals[j].total 
                }
            }
        }
        

        const ctx1 = document.getElementById('revenueRentalsdou').getContext('2d');
        const ctx2 = document.getElementById('revenueRentalsbar').getContext('2d');
        const ctx3 = document.getElementById('rentalRevenueByDate').getContext('2d');
        const ctx4 = document.getElementById('activeRentalsByDate').getContext('2d');

        document.getElementById("revenueRentalsdou").style.display="flex"
        document.getElementById("revenueRentalsbar").style.display="flex"
        document.getElementById("activeRentalsByDate").style.display="flex"
        document.getElementById("rentalRevenueByDate").style.display="flex"

        let colors1=[]
        //let colors1hover=[]
        let colors2
        //let colors2hover
        let x,y,z
        
        for(let i=0;i<ids.length;i++){
            x = Math.floor(Math.random() * 256)
            y = 100+ Math.floor(Math.random() * 256)
            z = 50+ Math.floor(Math.random() * 256)
            colors1.push("rgb(" + x + "," + y + "," + z + ",1)")
            //colors1hover.push("rgb(" + x + "," + y + "," + z + ",1)")
        }

        x = Math.floor(Math.random() * 256)
        y = 100+ Math.floor(Math.random() * 256)
        z = 50+ Math.floor(Math.random() * 256)
        colors2="rgb(" + x + "," + y + "," + z + ",1)"
        //colors2hover="rgb(" + x + "," + y + "," + z + ",1)"

        const revenueRentalsdou = new Chart(ctx1, {
            type: 'doughnut',
            data:{
                labels: names,
                datasets:[{
                    label: 'Revenue by each Rental',
                    data: revenue,
                    backgroundColor: colors1,
                    hoverBackgroundColor: colors1,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })

        const revenueRentalsbar = new Chart(ctx2, {
            type: 'bar',
            data:{
                labels: names,
                datasets:[{
                    label: 'Revenue by each Rental',
                    data: revenue,
                    backgroundColor: colors1,
                    hoverBackgroundColor: colors1,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })

        const rentalRevenueByDate = new Chart(ctx3, {
            type: 'line',
            data:{
                labels: dates,
                datasets:[{
                    label: 'Rentals Revenue by Date',
                    data: revenueOnDate,
                    backgroundColor: colors2,
                    hoverBackgroundColor: colors2,
                    borderWidth: 1
                }]
            },
            options:{
                responsive: false
            }
        })

        const activeRentalsByDate = new Chart(ctx4, {
            type: 'line',
            data:{
                labels: dates,
                datasets:[{
                    label: 'Rentals by Date',
                    data: rentalsOnDate,
                    backgroundColor: colors2,
                    hoverBackgroundColor: colors2,
                    fill: true,
                    tension: 0.1,
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
    <button class="selettori" on:click={GraphsUsers}>Clienti</button>
    <button class="selettori" on:click={GraphsAdmin}>Dipendenti</button>
    <button class="selettori" on:click={GraphsItems}>Prodotti</button>
    <button class="selettori" on:click={GraphsRentals}>Noleggi</button>
</div>
<div class="grafici">

    <canvas class="graph" id="adminRentals" width="400" height="400"></canvas>
    <canvas class="graph" id="adminRentalsdou" width="400" height="400"></canvas>
    <canvas class="graph" id="adminRevenue" width="400" height="400"></canvas>
    <canvas class="graph" id="adminRevenuedou" width="400" height="400"></canvas>

    <canvas class="graph" id="userRentals" width="400" height="400"></canvas>
    <canvas class="graph" id="userRentalsdou" width="400" height="400"></canvas>
    <canvas class="graph" id="userRevenue" width="400" height="400"></canvas>
    <canvas class="graph" id="userRevenuedou" width="400" height="400"></canvas>

    <canvas class="graph" id="itemsRentals" width="400" height="400"></canvas>
    <canvas class="graph" id="itemsRentalsdou" width="400" height="400"></canvas>
    <canvas class="graph" id="itemsRevenue" width="400" height="400"></canvas>
    <canvas class="graph" id="itemsRevenuedou" width="400" height="400"></canvas>

    <canvas class="graph" id="revenueRentalsdou" width="400" height="400"></canvas>
    <canvas class="graph" id="revenueRentalsbar" width="400" height="400"></canvas>
    <canvas class="graph" id="activeRentalsByDate" width="400" height="400"></canvas>
    <canvas class="graph" id="rentalRevenueByDate" width="400" height="400"></canvas>
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
        margin-bottom: 5%;
        width: 100%;
        height: 40%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    

</style>