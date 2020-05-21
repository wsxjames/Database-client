import axios from "axios"
import Config from "../config"
// import validate from "validate"

// const constraint={
//   GPA:{
//     if(validate.isNumber())
//   }
// }

export default {
  async getStudents(university) {
    let universityStringTrimmed = (university+"").trim()
    console.log("test="+universityStringTrimmed)
    let universityString=universityStringTrimmed.split(' ').join('+')
    // let api="http://localhost:3000/students?university="+universityString
    let api=Config.URL+"students?university="+universityString
    let res = await axios.get(api,{ withCredentials: true});
    console.log(res.data.recordset)
    return res.data.recordset
    
    
    
  },
  async getEventSingle() {
    let res = await axios.get("http://localhost:5000/" );
    return res.data;
  }
}