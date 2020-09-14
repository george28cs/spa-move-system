const Administrator = async () => {
    const view = `
     <section class="administrator">
        <div class="add-route">
            <div class="admin-header">
                <h2>Agregar rutas ...
                </h2>
            </div>
            <div class="">
                <div>
                    <div>
                        <label>Origen</label>
                        <input value="Escribe el origen" id="origin">
                        
                    </div>
                </div>
            </div>
            <div class="">
                <div>
                    <div>        
                        <label>Destino</label>
                        <input value="Escribe el destino" id="destination">
                    </div>
                </div>
            </div>
            
            <div>
                <div>
                    <label>Precio</label>
                    <input value="Escribe el precio" id="price">
                    
                </div>
            </div>

            <button id="addRoutesButton">
                Agregar Ruta
            </button>
            <p id="no-routes"></p>
            <div class="print-routes" id="print-routes">
                
            </div>
        </div>

        <div class="get-routes">
            <div>
                Administración de rutas
            </div>
            <button id="get-routes">
                Ver Rutas disponibles
            </button>
            </div>
        </div>
        <div class="get-trucks">
            <div>
                Administración de Camiones
            </div>
            <button id="get-trucks">
                Ver/editar Camiones
            </button>
            <div class="print-trucks" id="print-trucks">
            </div>
        </div>
    </section>
    `
    return view
}
  
export default Administrator