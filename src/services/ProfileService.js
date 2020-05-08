import axios from "axios"
import Config from "../config"

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
  async updateData(profileData) {
   axios.post(Config.URL
    +"updateProfile", profileData,{ withCredentials: true })
  },
  async fetchData() {
    let res=await axios.get(Config.URL+"studentprofile",{ withCredentials: true })
    console.log(Config.URL)
    return res.data.recordset
  }
}