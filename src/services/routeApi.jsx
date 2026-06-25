import axios from "axios"



const api = axios.create({

baseURL:"http://127.0.0.1:8000/api"

})



export const calculateRoute = (data)=>{

return api.post(
"/route/",
data
)

}