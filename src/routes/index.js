// Templates
import Header from '../templates/Header'
import Administrator from '../pages/Administrator'
import Home from '../pages/Home'
import Error404 from '../pages/Error404'
import Orders from '../pages/Orders'
import Client from '../pages/Client'

// Utils
import getHash from '../utils/getHash'
import resolveRoutes from '../utils/resolveRoutes'

// Scipts
import admin from '../scripts/admin'
import client from '../scripts/client'
import orders from '../scripts/orders'

const routes = {
    '/': Home,
    '/client': Client,
    '/admin': Administrator,
    '/orders': Orders,
};

const router = async () => {
  
  const header = null || document.getElementById('header')
  const content = null || document.getElementById('content')
  header.innerHTML = await Header()
  let hash = getHash()
  let route = await resolveRoutes(hash)
  let render = routes[route] ? routes[route] : Error404
  content.innerHTML = await render()

  if (render == Administrator) {
    admin()
  }
  if (render == Client) {
    client()
  }
  if (render == Orders){
    orders()
  }
}
export default router