import axios from "axios"

let baseUrl="https://shoesshop-fj86.onrender.com/api/shoe"
export const getAllShoes = (page,Category) => {
   
    return axios.get(baseUrl+"/?page="+page+"&Category="+Category
    )
}
export const getAmountOfShoes = (Category,txt) => {
    return axios.get(baseUrl+"/amount/?Category="+Category+"&txt="+txt);
}
export const getShoeById = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

export const deleteShoe= (id,token) => {
    const headers={
        "x-access-token":token
    }
    return axios.delete(`${baseUrl}/${id}`,{headers})
}

export const addShoe = (shoe,token) => {
    const headers={
        "x-access-token":token
    }
    return axios.post(baseUrl, shoe,{headers});

}

export const updateShoeInServer = (_id,shoe,token) => {
    const headers = {
        'x-access-token': token,
        
      };
    
      return axios.put(`${baseUrl}/${_id}`, shoe, { headers });

}