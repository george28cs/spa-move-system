import { Client } from '../utils/data'
import getApiData from '../utils/getApiData'
import {Order} from '../utils/data'

const client = () => {
    resetclients()
    resetOrders()
    createOriginDropdrown()
    const selectRoutesButton = document.getElementById('select-route')
    selectRoutesButton.addEventListener('click', assignRouteToUser)
}

const getStoredClients = () => localStorage.getItem('clients')
const getStoredOrders = () => localStorage.getItem('orders')

const resetclients = () => {
    if (getStoredClients() == null) {
        const emptyArray = '{"clients": []}'
        localStorage.setItem('clients', emptyArray)
    }
}
const resetOrders = () => {
    if (getStoredOrders() == null) {
        const emptyArray = '{"orders": []}'
        localStorage.setItem('orders', emptyArray)
    }
}
const getTruckRoutes = () => localStorage.getItem('routes-availables')

const createOriginDropdrown = () => {
    const originDropdown = document.getElementById('origin-dropdown')
    originDropdown.length = 0
    const defaultOriginOption = document.createElement('option')
    defaultOriginOption.text = 'Selecciona el origen'
    originDropdown.add(defaultOriginOption)
    originDropdown.selectedIndex = 0
    createdFirtsOptionDestination()
    const fullList = JSON.parse(getTruckRoutes())
    const fullListRoutes = fullList.routes
    const originsFiltered =  createList(fullListRoutes, "origin")
    for (origin of originsFiltered){
        const option = document.createElement('option')
        option.text = origin
        originDropdown.add(option)
    }
    originDropdown.addEventListener('change', () => createDestinationDropdown(originDropdown, fullList))   
}

const createdFirtsOptionDestination = () =>{
    const destinationDropdown = document.getElementById('destination-dropdown')
    destinationDropdown.length = 0
    const defaultDestinationOption = document.createElement('option')
    defaultDestinationOption.text = 'Selecciona el destino'
    destinationDropdown.add(defaultDestinationOption)
    destinationDropdown.selectedIndex = 0
}

const createList = (fullList, attribute) => {
    const list = []
    for (let i = 0; i < fullList.length; i++){
        if (attribute == "origin"){
            list.push(fullList[i].origin)
        } else if (attribute == "destination"){
            list.push(fullList[i].destination)
        }
    }
    const noRepeatItems = [...new Set(list)]
    return noRepeatItems
}

const createDestinationDropdown = (originDropdown, allRoutes) => {
    const destinationDropdown = document.getElementById('destination-dropdown')
    const index = originDropdown.selectedIndex
    const origin = originDropdown.options[index].value
    const filter_routes  = (routes) => routes.origin == origin
    const destinations = allRoutes.routes.filter( filter_routes )
    let destinationsFiltered = createList(destinations, "destination")
    clearDestinationDropdown()
    for (let i = 0; i < destinationsFiltered.length; i++){
        const option = document.createElement('option')
      	option.text = destinationsFiltered[i]
        destinationDropdown.add(option)
    }
}

const clearDestinationDropdown = () =>{
    const destinationDropdown = document.getElementById('destination-dropdown')
    const OPTIONS = destinationDropdown.options.length
    for (let i = 0; i <= OPTIONS; i++){
        destinationDropdown.remove(i)
    }
    createdFirtsOptionDestination()
}

const assignRouteToUser = () => {
    const destinationDropdown = document.getElementById('destination-dropdown')
    const originDropdown = document.getElementById('origin-dropdown')
    const validateSelectionRoutes = originDropdown.selectedIndex == 0 || 
        destinationDropdown.selectedIndex == 0
    if (validateSelectionRoutes) {
        alert("Por favor secciona todos los campos")
    } else {
        const displayTrucksDiv = document.getElementById('display-trucks')
        displayTrucksDiv.style.display = "block"
        printApiData()
    }
}

const printApiData = async () => {
    const data = await getApiData()
    const divPrintTable = document.getElementById('print-trucks')
    divPrintTable.textContent = ''
    const table = document.createElement('table')
    table.setAttribute('id', 'view-Trucks');
    const header =  document.createElement('thead')
    const headingRow = document.createElement('tr')
    // Insert Table Headers
   
        //// Truck type
    const headingCell1 = document.createElement('td')
    const headingText1 = document.createTextNode('Tipo del camión')
    headingCell1.appendChild(headingText1)
    headingRow.appendChild(headingCell1)
        // Available Space
    const headingCell2 = document.createElement('td')
    const headingText2 = document.createTextNode('Espacio disponible')
    headingCell2.appendChild(headingText2)
    headingRow.appendChild(headingCell2)
 
        // Edit Button
    const headingCell3 = document.createElement('td')
    const headingText3 = document.createTextNode('Seleccionar camión')
    headingCell3.appendChild(headingText3)
    headingRow.appendChild(headingCell3)
        //Append headers
    header.appendChild(headingRow)
    table.appendChild(header)
    // Create table Body
    const tblBody = document.createElement('tbody')
    // Generate table content
    const TABLE_ROWS = data.length
    const TABLE_COLS = 3
    for (let i = 0; i < TABLE_ROWS; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j <= TABLE_COLS; j++) {            
            if (j == 0){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${data[i].truck_type}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j== 1){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${data[i].available_space} m2`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j == 2){
                const cell = document.createElement('td')
                const btn = document.createElement('button')
                btn.className = 'select-truck'
                const textButton = document.createTextNode('Seleccionar')
                btn.appendChild(textButton)
                cell.appendChild(btn)
                row.appendChild(cell)
            }
        }
        tblBody.appendChild(row)
    }
    table.appendChild(tblBody)
    divPrintTable.appendChild(table)
    table.setAttribute('border', '2')
    const selectTruckButton = document.getElementsByClassName('select-truck')
    setActionButton(selectTruckButton, data)
}

const setActionButton = (buttons, data) =>{
    for (let i = 0; i < buttons.length; i++){
        buttons[i].onclick = function () { 
            const cell = this.parentElement
            const row = cell.parentElement
            const truckSelected = row.childNodes[0].outerText
            clientSelectTruck(truckSelected, data)
        }
    }
}
const clientSelectTruck = (truck, allTrucks) => {
    const stringTruck= truck.toString()
    const filter_truck  = (truck) => truck.truck_type == stringTruck
    const selectedTruck = allTrucks.filter( filter_truck )
    const divPrintSelected = document.getElementById('printSelectedTruck')
    const divGetSpaceRequired = document.getElementById('setSpaceRequired')
    const sendSpaceButton = document.getElementById('sendSpace')
    divGetSpaceRequired.style.display = "block"
    divPrintSelected.innerHTML = `Has seleccionado el camión de ${selectedTruck[0].truck_type}`
    sendSpaceButton.addEventListener('click', () => viewPreorder(selectedTruck))
}

const checkSpace = (spaceRequired, totalTruckSpace) =>{
    const spaceUserRequired = parseFloat(spaceRequired)
    const spaceAvailable = parseFloat(totalTruckSpace[0].available_space)
    return spaceAvailable >= spaceUserRequired
}
const viewPreorder = (selectedTruck) => {
    const spaceRequiredInput = document.getElementById('spaceRequired').value
    if (spaceRequiredInput == ""){
        alert("Por favor ingrese un valor válido")
    } else {
        const checkSpaceOnTruck = checkSpace(spaceRequiredInput, selectedTruck)
        if(checkSpaceOnTruck){
            let origin = document.getElementById('origin-dropdown')
            let destination = document.getElementById('destination-dropdown')
            const originIndex = origin.selectedIndex
            const destinationIndex = destination.selectedIndex
            origin = origin.options[originIndex].value
            destination = destination.options[destinationIndex].value

            const fullList = JSON.parse(getTruckRoutes())
            const fullListRoutes = fullList.routes
            const filterRoute = route => route.origin == origin && route.destination == destination
            const selectedRoute = fullListRoutes.filter(filterRoute)
            const truckPrice = parseFloat(selectedTruck[0].sqr_meter_price) * parseFloat(spaceRequiredInput)
            const routePrice = selectedRoute[0].price
            const totalPrice = truckPrice + routePrice
            const preorderDiv = document.getElementById('printPreorder')
            preorderDiv.innerHTML = `
            <br>Origen: ${origin}
            <br>Destino: ${destination}
            <br>Tipo de camión: ${selectedTruck[0].truck_type}
            <br>Espacio seleccionado: ${spaceRequiredInput} m<sup>2</sup>
            <br>Precio: $${totalPrice} pesos
            `
            const OrderData = {
                origin,
                destination,
                space: spaceRequiredInput,
                price: totalPrice,
            }
            enableGetOrderButton(OrderData)
        } else {
            alert("Por favor seleccione un camión de mayor espacio")
       }
    }
}

const enableGetOrderButton = data => {
    const getOrderDiv = document.getElementById('orderForm')
    const getOrderButton = document.getElementById('getOrder')
    getOrderDiv.style.display = "block"
    getOrderButton.addEventListener('click', () => getOrder(data))
}
const getOrder = data => {
    const clientName = document.getElementById('clientName').value
    const clientLastName = document.getElementById('clientLastName').value
    const clientMail = document.getElementById('clientMail').value
    const checkMail = validateMail(clientMail)
    if (clientName == "" || clientLastName == "" || clientMail == ""){
        alert("Por favor rellena todos los campos")
    }
    else if (!checkMail) {
        alert('Por favor ingresa un correo válido')
    } else {
        const id = `A${new Date().valueOf()}MX`
        const newClient = new Client(clientName, clientLastName, clientMail)
        const newOrder = new Order(id, clientMail, data.origin, data.destination, data.space, data.price)
        console.log(newOrder)
        storageClientAndOrder(newClient, newOrder)
    }
}

const validateMail = mail => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (mail.match(mailformat)) return true
    return false
}

const storageClientAndOrder = (client, order) => {
    const jsonClientsData = JSON.parse(getStoredClients())
    const jsonOrdersData = JSON.parse(getStoredOrders())
    jsonClientsData.clients.push(client)
    jsonOrdersData.orders.push(order)
    localStorage.setItem('clients', JSON.stringify(jsonClientsData))
    localStorage.setItem('orders', JSON.stringify(jsonOrdersData))
    window.location.href = "#/orders/"
}
export default client