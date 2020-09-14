const Client = () => {
    const view = `
     <section class="client">
        <div class="select-route">
            <div class="select-route__title">
                <h2>
                    Selecciona la ruta... 
                </h2>   
            </div>
            <div class="">
                <div>
                    <div>
                        <select name="origin" id="origin-dropdown">
                        </select>
                    </div>
                </div>
            </div>
            <div class="">
                <div>
                    <div>
                        <select name="destination" id="destination-dropdown">
                        </select>
                    </div>
                </div>
            </div>
            <button id="select-route">
                Seleccionar ruta
            </button>
        </div>
        <div class="select-trucks">
            <div class="display-trucks" id="display-trucks" style="display: none;">
                Por favor selecciona el tipo de camión y espacio que requieres
            </div>
            <div class="print-trucks" id="print-trucks">

            </div>
        </div>
        <div class="print-selectedTruck" id="printSelectedTruck">
        </div>
        <div class="print-selectSpace" id="setSpaceRequired" style="display: none">
            <label for="lname">Selecciona la cantidad requerida (m<sup>2</sup>):</label>
            <input type="number" name="lname" id="spaceRequired">
            <button id="sendSpace">
                Generar preorden
            </button>
            
            <div id="printPreorder">
            </div>
            <div class"get-order" id="orderForm" style="display: none">
                <div class="client-data" id="registerClient">
                    <label for="client-name">Por favor ingresa tu nombre</label>
                    <input type="text" name="client-name" id="clientName"> <br>
                    <label for="client-lastName">Por favor ingresa tu apellido</label>
                    <input type="text" name="client-lastName" id="clientLastName"><br>
                    <label for="client-mail">Por favor ingresa tu correo</label>
                    <input type="text" name="client-mail" id="clientMail">
                </div>
                <div><br>
                    <button id="getOrder">
                        Agregar orden
                    </button>
                </div>
            </div>
            
        </div>
     </section>
    `
    return view
}
  
  export default Client