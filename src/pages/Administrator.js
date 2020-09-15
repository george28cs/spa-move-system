const Administrator = async () => {
    const view = `
     <section class="administrator">
        <div class="add-route">
            <div class="admin-header">
                <h2>Agregar rutas ...
                </h2>
            </div>
            <div class="routes">
                <div class="route-forms">
                    <label class="routes-label">Origen</label> <br>
                    <input class="routes-input" value="Escribe el origen" id="origin">
                </div>
            
                <div class="route-forms">        
                    <label class="routes-label">Destino</label> <br>
                    <input class="routes-input" value="Escribe el destino" id="destination">
                </div>
                        
                <div class="route-forms">
                    <label class="routes-label">Precio</label><br>
                    <input class="routes-input" value="Escribe el precio" id="price">
                </div>
                <button class="add-routes" id="addRoutesButton">
                Agregar ruta
                </button>
            </div>
            <div class="print-routes-section">
                <p id="no-routes" class="no-routes"></p>
                <div class="print-routes" id="print-routes">
            </div>
                
            </div>
        </div>
        <div class="manage-routes">
            <div class="get-routes">
                <div class="admin-routes-tittle">
                    Administración de rutas
                </div>
                <button id="get-routes" class="routes-button">
                    Ver Rutas disponibles
                </button>
            </div>
            <div class="get-trucks">
                <div class="admin-routes-tittle">
                    Administración de Camiones
                </div>
                <button id="get-trucks" class="routes-button">
                    Ver/editar Camiones
                </button>
                <div class="print-trucks" id="print-trucks">
                </div>
            </div>
        </div>
        
    </section>
    `
    return view
}
  
export default Administrator