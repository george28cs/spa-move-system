const orders = () =>{
    const getOrdersButton = document.getElementById('getOrders')
    getOrdersButton.addEventListener('click', loadClientsOrders)
}

const getStoredOrders = () => localStorage.getItem('orders')

const loadClientsOrders =() => {
    let allOrders = JSON.parse(getStoredOrders())
    allOrders = allOrders.orders
    const clientMail = document.getElementById('clientMail').value
    if (validateMail(clientMail)) {
        const clientStoredOrders= checkIfMailHaveOrders(clientMail, allOrders)
        if (clientStoredOrders){
            printClientOrders(clientStoredOrders)
        } else {
            printNoOrders()
        }
    } else {
        alert('Por favor ingrese un correo válido')
    }
}

const validateMail = (mail) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (mail.match(mailformat)) return true
    return false
}

const checkIfMailHaveOrders = (mail, orders) => {
    const mailFilter = order => order.clientmail == mail
    const clientOrders = orders.filter(mailFilter)
    if (clientOrders.length > 0){
        return clientOrders
    } else {
        return false
    }
}

const printClientOrders = (orders) => {
    const divClientOrders = document.getElementById('clientOrders')
    divClientOrders.textContent = ""

    const table = document.createElement('table')
    table.setAttribute('id', 'viewOrders');
    const header =  document.createElement('thead')
    const headingRow = document.createElement('tr')
    // Insert Table Headers  
        // ID
    const headingCell0 = document.createElement('td')
    const headingText0 = document.createTextNode('Orden ID')
    headingCell0.appendChild(headingText0)
    headingRow.appendChild(headingCell0)
        // Origin
    const headingCell1 = document.createElement('td')
    const headingText1 = document.createTextNode('Origen')
    headingCell1.appendChild(headingText1)
    headingRow.appendChild(headingCell1)
        // Destination
    const headingCell2 = document.createElement('td')
    const headingText2 = document.createTextNode('Destino')
    headingCell2.appendChild(headingText2)
    headingRow.appendChild(headingCell2)
        // Space
    const headingCell3 = document.createElement('td')
    const headingText3 = document.createTextNode('Espacio seleccionado')
    headingCell3.appendChild(headingText3)
    headingRow.appendChild(headingCell3)
        // Price
    const headingCell4 = document.createElement('td')
    const headingText4 = document.createTextNode('Precio')
    headingCell4.appendChild(headingText4)
    headingRow.appendChild(headingCell4)
        // Delete 
    const headingCell5 = document.createElement('td')
    const headingText5 = document.createTextNode('Precio')
    headingCell5.appendChild(headingText5)
    headingRow.appendChild(headingCell5)
        //Append headers
    header.appendChild(headingRow)
    table.appendChild(header)
    // Create table Body
    const tblBody = document.createElement('tbody')
    // Generate table content
    const TABLE_ROWS = orders.length
    const TABLE_COLS = 5

    for (let i = 0; i < TABLE_ROWS; i++) {
        const row = document.createElement('tr')
        for (let j = 0; j <= TABLE_COLS; j++) {            
            if (j == 0) {
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${orders[i].id}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j == 1) {
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${orders[i].origin}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j== 2) {
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${orders[i].destination}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j== 3){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`${orders[i].space} metro cuadrado`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j== 4){
                const cell = document.createElement('td')
                const textCell = document.createTextNode(`$${orders[i].price}`)
                cell.appendChild(textCell)
                row.appendChild(cell)
            }
            if (j == 5){
                const cell = document.createElement('td')
                const btn = document.createElement('button')
                btn.className = 'delete-order'
                const textButton = document.createTextNode('Eliminar orden')
                btn.appendChild(textButton)
                cell.appendChild(btn)
                row.appendChild(cell)
            }
        }
        tblBody.appendChild(row)
    }
    table.appendChild(tblBody)
    divClientOrders.appendChild(table)
    table.setAttribute('border', '2')
    const deleteOrdersButton = document.getElementsByClassName('delete-order')
    setActionButton(deleteOrdersButton, orders)
}

const printNoOrders = () => {
    const divClientOrders = document.getElementById('clientOrders')
    divClientOrders.textContent = ""
    divClientOrders.innerHTML = "No existen órdenes para el correo seleccionado"
}

const setActionButton= (targetButtons) => {
    for (let i = 0; i < targetButtons.length; i++){
        targetButtons[i].onclick = function () { 
            const cell = this.parentElement
            const row = cell.parentElement
            const idSelected = row.childNodes[0].outerText
            deleteOrder(idSelected)
        }
    }
}

const deleteOrder = orderID => {
    let allOrders = JSON.parse(getStoredOrders())
    allOrders = allOrders.orders
    
    let filterOrderToDelete = order => order.id != orderID
    const orders = allOrders.filter(filterOrderToDelete)
    let emptyArray = '{"orders": []}'
    const newOrders = JSON.parse(emptyArray)
    for(let i = 0; i <orders.length; i++ ){
        newOrders.orders.push(orders[i])
    }
    localStorage.setItem('orders', JSON.stringify(newOrders))
    loadClientsOrders()
}
export default orders