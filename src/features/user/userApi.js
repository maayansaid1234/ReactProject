import axios from "axios"

let baseUrl="https://shoesshop-fj86.onrender.com/api/user"
export const login = (data) => {
    return axios.post(baseUrl+"/login",data)
}

export const addUser = (data) => {
    return axios.post(baseUrl,data)
}

