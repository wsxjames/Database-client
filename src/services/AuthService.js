import axios from "axios"


export default {
  async home() {
    await axios.get("http://localhost:3000/").then((response)=>{
        console.log(response.status)
        return "auth"
    }).catch((error)=>{
        console.log("err")
        console.log(error.status)
        return "unauth"
    })
    
    
    
  },
  async showCurrentUser() {
    let res = await axios.get("http://localhost:3000/currentuser",{ withCredentials: true } );
    return res.data;
  }
}