import axios from "axios"
import Config from '../config'

export default {
  async home() {
    await axios.get().then((response)=>{
        console.log(response.status)
        return "auth"
    }).catch((error)=>{
        console.log("err")
        console.log(error.status)
        return "unauth"
    })
    
    
    
  },
  async showCurrentUser() {
    let res = await axios.get(Config.URL+"currentuser",{ withCredentials: true } );
    return res.data;
  }
}