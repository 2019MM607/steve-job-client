import Swal from 'sweetalert2';

const baseUrl = 'http://localhost:4000/api/'
//const baseUrl = process.env.API_URL

export const fetchWithtoken = async (payload={}, method = 'GET', endpoint) => {

  const token = localStorage.getItem("token") || '';
  const url = baseUrl + endpoint;

  if (method === 'GET') {
   
    return fetch(url, {
      headers: {
        'auth-token': token
      }

    })
  } else {
    return fetch(url, {
      method,
      headers: {
        'auth-token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

  }

}

export const fetchWithNotoken = async (payload, method = 'GET', endpoint) => {

  const url = baseUrl + endpoint;

  if (method === 'GET') {
    return fetch(url)
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

  }

}






