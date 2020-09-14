import { TruckRoute } from '../utils/data'
import putData from '../utils/putData'
import getApiData from '../utils/getApiData'

// ADMIN PAGES METHODS

// Get localStorage 'Trucks routes availables'
const getTruckRoutes = () => localStorage.getItem('routes-availables')

// If no data, create empty array
const resetRoutes = () => {
    if (getTruckRoutes() == null) {
        const emptyArray = '{"routes": []}'
        localStorage.setItem('routes-availables', emptyArray)
    }
}

// Buttons actions
const admin = () => {
    // Create empty array
    resetRoutes()

    const addRoutesButton = document.getElementById('addRoutesButton')
    addRoutesButton.addEventListener('click', saveRoutesOnLocalStorage)
    const getRoutesButton = document.getElementById('get-routes')
    getRoutesButton.addEventListener('click', verifyRoutesExisting)
    const getTrucksButton = document.getElementById('get-trucks')
    getTrucksButton.addEventListener('click', printApiData)
}

// Save Routes on LocalStorage
const saveRoutesOnLocalStorage = () => {
    // Clear p when add new route
    const pElement = document.getElementById("no-routes")
    pElement.innerHTML = ''
    // Get localStorage 'Trucks routes availables' and save in json data
    const origin = document.getElementById('origin').value
    const destination = document.getElementById('destination').value
    let price = parseFloat(document.getElementById('price').value)
    
    const validFields = origin != "" && destination != "" && Number.isInteger(price)
    if (validFields) {
        const jsonData = JSON.parse(getTruckRoutes())
        const newTruckRoute = new TruckRoute(origin, destination, price)
        jsonData.routes.push(newTruckRoute)
        localStorage.setItem('routes-availables', JSON.stringify(jsonData))
        printTable()
    } else {
        alert("Por favor ingrese un precio válido")
    }
}

// Check if routes-availables exist on localStorage
const verifyRoutesExisting = () => {
    const availableRoutes = JSON.parse(getTruckRoutes())
    const pElement = document.getElementById("no-routes")
    if (availableRoutes.routes.length == 0){
        pElement.innerHTML = "No hay rutas existentes, aguegue alguna primero"
    } else {
        printTable()
    }
}

// Generate dynamic table
const printTable = () => {
    // Get LocalStorage Data
    const availableRoutes = JSON.parse(getTruckRoutes())
    // get div & clear 
    const divPrintTable = document.getElementById('print-routes')
    divPrintTable.textContent = ''
    // Create table elements
    const table = document.createElement('table')
    table.setAttribute('id', 'routesTable');
    const header =  document.createElement('thead')
    const headingRow = document.createElement('tr')
    // Insert Table Headers
        //ID
    const headingCell0 = document.createElement('td')
    const headingText0 = document.createTextNode('ID')
    headingCell0.appendChild(headingText0)
    headingRow.appendChild(headingCell0)

        //Origin
    const headingCell1 = document.createElement('td')
    const headingText1 = document.createTextNode('Origen')
    headingCell1.appendChild(headingText1)
    headingRow.appendChild(headingCell1)
        //// Destination
    const headingCell2 = document.createElement('td')
    const headingText2 = document.createTextNode('Destino')
    headingCell2.appendChild(headingText2)
    headingRow.appendChild(headingCell2)
        // Price
    const headingCell3 = document.createElement('td')
    const headingText3 = document.createTextNode('Precio')
    headingCell3.appendChild(headingText3)
    headingRow.appendChild(headingCell3)
        // Eliminar
     const headingCell4 = document.createElement('td')
     const headingText4 = document.createTextNode('Eliminar')
     headingCell4.appendChild(headingText4)
     headingRow.appendChild(headingCell4)
        //Append headers
    header.appendChild(headingRow)
    table.appendChild(header)
    // Create table Body
    const tblBody = document.createElement('tbody')
    // Generate table content
    const TABLE_ROWS = availableRoutes.routes.length
    const TABLE_COLS = 4
    for (let i = 0; i < TABLE_ROWS; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j <= TABLE_COLS; j++) {
            if (j == 0){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${i+1}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }else if (j == 1){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${availableRoutes.routes[i].origin}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            } else if (j ==2 ){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${availableRoutes.routes[i].destination}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            } else if (j == 3){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`$${availableRoutes.routes[i].price}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            } else if (j == 4) {
                const cell = document.createElement('td')
                const btn = document.createElement('button')
                const textButton = document.createTextNode('Eliminar')
                btn.className = 'remove-routes'
                btn.appendChild(textButton)
                cell.appendChild(btn)
                row.appendChild(cell)
            }
        }
        tblBody.appendChild(row)
    } 
    table.appendChild(tblBody)
    // Print table & set style
    divPrintTable.appendChild(table)
    table.setAttribute('border', '2')
    const removeRoutesButton = document.getElementsByClassName('remove-routes')
    setActionToRemoveButton(removeRoutesButton)
}

// Set action to each Remove routes button
const setActionToRemoveButton = buttons => {
        for (let i = 0; i < buttons.length; i++){
            buttons[i].onclick = function () { 
            const cell = this.parentElement
            const row = cell.parentElement
            const idToDelete = row.childNodes[0].outerText
            deleteRoute(idToDelete)
        }
    }
}

// Set action to Edit truck inventory button
const setActionToEditButton = buttons => {  
    for (let i = 0; i < buttons.length; i++){
        buttons[i].onclick = function () { 
            const cell = this.parentElement
            const row = cell.parentElement
            const tdElements = row.childNodes
            buttons[i].textContent = "Guardar"
            for (let j = 1; j < tdElements.length - 1; j++){
                tdElements[j].setAttribute('contentEditable', true)
            }
            buttons[i].onclick = function (){
                const id = i+1
                const truck_type = tdElements[1].textContent
                const total_space = tdElements[2].textContent
                const available_space = tdElements[3].textContent
                const sqr_meter_price = tdElements[4].textContent
                const total = tdElements[5].textContent
                const data = {
                    id: id,
                    truck_type: truck_type,
                    total_space: total_space,
                    available_space: available_space,
                    sqr_meter_price: sqr_meter_price,
                    total: total
                }
                putDataAPI(id, data)
                buttons[i].textContent = "Editar"
                for (let j = 1; j < tdElements.length - 1; j++){
                    tdElements[j].setAttribute("contentEditable", false)
                    printApiData()
                }
            }
        }
    }
}

// Delete existing routes
const deleteRoute = (id) => {
    const routeIndex = parseInt(id - 1)
    const existingTruckRoutes = JSON.parse(getTruckRoutes())
    existingTruckRoutes.routes.splice(routeIndex, 1)
    localStorage.setItem('routes-availables', JSON.stringify(existingTruckRoutes))
    if (existingTruckRoutes.routes.length != 0){
        printTable()
    } else {
        const divPrintTable = document.getElementById('print-routes')
        divPrintTable.textContent = ''
        resetRoutes()
    }
}

// PUT data API
const putDataAPI = async (id, data) => {
    const updateData = await putData(id, data)
}

// Get API trucks data
const printApiData = async () => {
    // Get API data
    const data = await getApiData() 
    // Create table & clear if exist
    const divPrintTable = document.getElementById('print-trucks')
    divPrintTable.textContent = '';
    const table = document.createElement('table')
    table.setAttribute('id', 'view-Trucks');
    const header =  document.createElement('thead')
    const headingRow = document.createElement('tr')
    // Insert Table Headers
        //Id
    const headingCell1 = document.createElement('td')
    const headingText1 = document.createTextNode('Item')
    headingCell1.appendChild(headingText1)
    headingRow.appendChild(headingCell1)
        //// Truck type
    const headingCell2 = document.createElement('td')
    const headingText2 = document.createTextNode('Modelo del camión')
    headingCell2.appendChild(headingText2)
    headingRow.appendChild(headingCell2)
        // Total Space
    const headingCell3 = document.createElement('td')
    const headingText3 = document.createTextNode('Espacio total')
    headingCell3.appendChild(headingText3)
    headingRow.appendChild(headingCell3)
        // Available Space
    const headingCell4 = document.createElement('td')
    const headingText4 = document.createTextNode('Espacio Disponible')
    headingCell4.appendChild(headingText4)
    headingRow.appendChild(headingCell4)
        // Square meter Price
    const headingCell5 = document.createElement('td')
    const headingText5 = document.createTextNode('Precio M2')
    headingCell5.appendChild(headingText5)
    headingRow.appendChild(headingCell5)
        // Truck total 
    const headingCell6 = document.createElement('td')
    const headingText6 = document.createTextNode('# De vehículos')
    headingCell6.appendChild(headingText6)
    headingRow.appendChild(headingCell6)
        // Edit Button
    const headingCell7 = document.createElement('td')
    const headingText7 = document.createTextNode('Editar')
    headingCell7.appendChild(headingText7)
    headingRow.appendChild(headingCell7)
        //Append headers
    header.appendChild(headingRow)
    table.appendChild(header)
    // Create table Body
    const tblBody = document.createElement('tbody')
    // Generate table content
    const TABLE_ROWS = data.length
    const TABLE_COLS = 8
    for (let i = 0; i < TABLE_ROWS; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j <= TABLE_COLS; j++) {            
            if (j == 0){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${data[i].id}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }     
            if (j == 1){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${data[i].truck_type}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j==2){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${data[i].total_space}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j== 3){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${data[i].available_space}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j==4) {
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`$${data[i].sqr_meter_price}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j == 5){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${data[i].total}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j == 6){
                const cell = document.createElement('td')
                const btn = document.createElement('button')
                btn.className = 'view-trucks'
                const textButton = document.createTextNode('Editar')
                btn.appendChild(textButton)
                cell.appendChild(btn)
                row.appendChild(cell)
            }
        }
        tblBody.appendChild(row)
    }
    
    // Print table & set style
    table.appendChild(tblBody)
    divPrintTable.appendChild(table)
    table.setAttribute('border', '2')
    const editTrucksButtons = document.getElementsByClassName('view-trucks')
    setActionToEditButton(editTrucksButtons)
}

export default admin