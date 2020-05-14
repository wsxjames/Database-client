import axios from "axios"
import Config from "../config"
var oldPassword=''
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
    if (profileData.password=='') profileData.password=oldPassword
   axios.post(Config.URL+"updateProfile", profileData,{ withCredentials: true })
  },
  async fetchData() {
    let res=await axios.get(Config.URL+"studentprofile",{ withCredentials: true })
    oldPassword=res.data.recordset[0].Password
    console.log(Config.URL)
    return res.data.recordset
  }
}