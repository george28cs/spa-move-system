const API = 'https://my-json-server.typicode.com/george28cs/json-faker-server/trucks/'

const getApiData = async () => {
  const apiURl = API
  try {
    const response = await fetch(apiURl)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Fetch Error', error)
  }
}

export default getApiData