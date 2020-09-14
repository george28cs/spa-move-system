const API = 'https://my-json-server.typicode.com/george28cs/json-faker-server/trucks/'

const putData = async (id, data) => {
    const myInit = { method: 'PUT',
        headers:{
          "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data)
    }

  const apiURl = id ? `${API}${id}` : API

  try {
    const response = await fetch(apiURl, myInit)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Fetch Error', error)
  }
}

export default putData