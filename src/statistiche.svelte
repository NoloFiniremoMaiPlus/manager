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
        const ctx3 = document.getElementById('adminRentalsdou').getContext('2d');
        const ctx4 = document.getElementById('adminRevenuedou').getContext('2d');

        document.getElementById("adminRentals").style.display="flex"
        document.getElementById("adminRevenue").style.display="flex"
        document.getElementById("adminRentalsdou").style.display="flex"
        document.getElementById("adminRevenuedou").style.display="flex"

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

        const adminsRentalsdou = new Chart(ctx3, {
            type: 'doughnut',
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
        const adminsRevenuedou = new Chart(ctx4, {
            type: 'doughnut',
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
        const ctx3 = document.getElementById('userRentalsdou').getContext('2d');
        const ctx4 = document.getElementById('userRevenuedou').getContext('2d');

        document.getElementById("userRentals").style.display="flex"
        document.getElementById("userRevenue").style.display="flex"
        document.getElementById("userRentalsdou").style.display="flex"
        document.getElementById("userRevenuedou").style.display="flex"
       
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
        const userRentalsdou = new Chart(ctx3, {
            type: 'doughnut',
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
        const userRevenuedou = new Chart(ctx4, {
            type: 'doughnut',
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
        const ctx3 = document.getElementById('itemsRentalsdou').getContext('2d');
        const ctx4 = document.getElementById('itemsRevenuedou').getContext('2d');

        document.getElementById("itemsRentals").style.display="flex"
        document.getElementById("itemsRevenue").style.display="flex"
        document.getElementById("itemsRentalsdou").style.display="flex"
        document.getElementById("itemsRevenuedou").style.display="flex"

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

        const itemRentalsdou = new Chart(ctx3, {
            type: 'doughnut',
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

        const itemRevenuedou = new Chart(ctx4, {
            type: 'doughnut',
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

    async function GraphsRentals(){

        resetGraph()
        
        let rentals = await getRentals()
        console.log(rentals)

        let ids=[]
        let names=[]
        let dates=[]
        let revenue=[]
        let rentalsOnDate=[]
        let revenueOnDate=[]
        //let abc=[1,2,3]
        

        for(let i=0;i<rentals.length;i++){

            ids.push("Item:"+rentals[i].item.name + " ID rental:"+rentals[i].id)
            names.push(rentals[i].item.name)
            revenue.push(rentals[i].total)

            if(!dates.includes(rentals[i].from)){
                dates.push(rentals[i].from)
            }
            if(!dates.includes(rentals[i].to)){
                dates.push(rentals[i].to)
            }
        }

        dates.sort()
        console.log(dates)
        console.log(ids)
        console.log(revenue)

        for(let i=0;i<dates.length;i++){
            rentalsOnDate[i] = 0
            revenueOnDate[i] = 0
            for(let j=0;j<rentals.length;j++){
                if(dates[i]>=rentals[j].from && dates[i]<=rentals[j].to){
                    rentalsOnDate[i]++
                    revenueOnDate[i]= revenueOnDate[i] + rentals[j].total 
                }
            }
        }
        console.log(revenueOnDate)

        /*
        for(let i=0;i<rentals.length;i++){
            dates[i].push(rentals[i].from)
        }
        for(let i=0;i<rentals.length;i++){
            dates[i].push(rentals[i].to)
        }
        */

        const ctx1 = document.getElementById('revenueRentalsdou').getContext('2d');
        const ctx2 = document.getElementById('revenueRentalsbar').getContext('2d');
        const ctx3 = document.getElementById('rentalRevenueByDate').getContext('2d');
        const ctx4 = document.getElementById('activeRentalsByDate').getContext('2d');

        document.getElementById("revenueRentalsdou").style.display="flex"
        document.getElementById("revenueRentalsbar").style.display="flex"
        document.getElementById("activeRentalsByDate").style.display="flex"
        document.getElementById("rentalRevenueByDate").style.display="flex"

        const revenueRentalsdou = new Chart(ctx1, {
            type: 'doughnut',
            data:{
                labels: ids,
                datasets:[{
                    label: 'Revenue by each Rental',
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
        const revenueRentalsbar = new Chart(ctx2, {
            type: 'bar',
            data:{
                labels: names,
                datasets:[{
                    label: 'Revenue by each Rental',
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
        
        /*const data = {
            labels: labels,
            datasets: [
                {
                label: 'Dataset 1',
                data: Utils.numbers(NUMBER_CFG),
                borderColor: Utils.CHART_COLORS.red,
                backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
                },
                {
                label: 'Dataset 2',
                data: Utils.numbers(NUMBER_CFG),
                borderColor: Utils.CHART_COLORS.blue,
                backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
                }
            ]
        }
        */
        
        /*const x = new Chart(ctx1, {
            type: 'bar',
            data:{
                labels: ids,
                datasets:[{
                    label: 'Revenue by each Rental',
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
        */

        const rentalRevenueByDate = new Chart(ctx3, {
            type: 'line',
            data:{
                labels: dates,
                datasets:[{
                    label: 'Rentals Revenue by Date',
                    data: revenueOnDate,
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

        const activeRentalsByDate = new Chart(ctx4, {
            type: 'line',
            data:{
                labels: dates,
                datasets:[{
                    label: 'Rentals by Date',
                    data: rentalsOnDate,
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