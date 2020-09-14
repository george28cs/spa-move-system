const Home = () => {
    const view = `
     <section class="home">
        <div class="img-background"></div>
        <div class="seach-bar">
        <div class="search-bar__title">
            <h2>
                Bienvenido a tu app de mudanzas, por favor, selecciona una opción...
            </h2>
        </div>
        <div class="options">
            <a href="#/admin">
                Administrar rutas y camiones
            </a>
        </div>
        <div class="options">
            <a href="#/client">
                Clientes
            </a>
        </div>
        <div class="options">
            <a href="#/orders">
                Órdenes
            </a>
        </div>
        
        </div>
     </section>
    `
    return view
  };
  
  export default Home