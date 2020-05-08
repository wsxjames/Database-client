import axios from "axios"
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
    let api="http://uni-app.csse.rose-hulman.edu/students?university="+universityString
    let res = await axios.get(api);
    console.log(res.data.recordset)
    return res.data.recordset
    
    
    
  },
  async getEventSingle() {
    let res = await axios.get("http://localhost:5000/" );
    return res.data;
  }
}