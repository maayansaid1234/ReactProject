
import axios from "axios"

let baseUrl="https://shoesshop-fj86.onrender.com/api/order"
export const addOrder = (order,token) => {
    const headers={
        "x-access-token":token
    }
    return axios.post(baseUrl,order,{headers})
}

export const deleteOrder = (id,token) => {
    const headers={
        "x-access-token":token
    }
    return axios.delete(`${baseUrl}/${id}`,"",{headers})
}

export const getAllOrders= (token) => {
    const headers={
        "x-access-token":token
    }
    return axios.get(`${baseUrl}`,{headers})
}


export const getAllOrdersByUser= (token) => {
const headers={
    "x-access-token":token
}
    return axios.get(`${baseUrl}`,{headers})
}

export const updateOrder= (id,order,token) => {
    const headers={
        "x-access-token":token
    }
    return axios.put(`${baseUrl}/${id}`,order,{headers})
}