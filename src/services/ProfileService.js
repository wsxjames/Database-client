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
  async updateData(profileData) {
   axios.post("http://localhost:3000/updateProfile", profileData,{ withCredentials: true })
  },
  async fetchData() {
    let res=await axios.get("http://localhost:3000/studentprofile",{ withCredentials: true })
    return res.data.recordset
  }
}