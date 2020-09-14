const Orders = () => {
  const view = `
    <div class="orders">
    <div class="orders__title">
      <h2>
          Consulta tus órdenes
      </h2>
    </div>
      <div>
        <div>
          Por favor ingresa tu correo para consultar las órdenes generadas
        </div>
        <div>
          <label for="client-mail">Correo:</label>
          <input type="text" name="client-mail" id="clientMail"> <br>
          <div>
            <button id="getOrders">
              Obtener órdenes
            </button>
            <div class="client-orders" id="clientOrders">
            </div>
          </div>
        </div>
      </div>
    </div>
  `
  return view
}
  
  export default Orders