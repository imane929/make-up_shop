import axios from "axios";

/*
connexion backend express
*/

const api = axios.create({

baseURL: "http://localhost:5000/api"

});


// ajouter token automatiquement
api.interceptors.request.use((req)=>{

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

if(token){

req.headers.Authorization = `Bearer ${token}`;

}

if(userId){

req.headers.userid = userId;

}

return req;

});

export default api;