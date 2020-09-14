const resolveRoutes = (route) => {
  if (route.length <= 1) {
    let validRoute 
    if (route === '/'){
      validRoute = route
    }else {
      validRoute = '/orders/:id'
    }
    return validRoute
  }
  return `/${route}`
};

export default resolveRoutes;

