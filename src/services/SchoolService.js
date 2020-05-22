import axios from "axios"
import Config from "../config"
// import validate from "validate"

// const constraint={
//   GPA:{
//     if(validate.isNumber())
//   }
// }

export default {
  async getSchools(gender, isFirstApplicant, gradYear, GPA, highSchool, stdTestType, stdTestScore, testLocation, testCity, activityType, compRank) {
    // console.log("test=",GPA)
    // let GPANumber=parseFloat(GPA)
    let isFirstApplicantValue=isFirstApplicant?1:0
    // let api="http://localhost:3000/schools?"
    let api=Config.URL+"schools?"
    if (gender!="") api+="gender="+gender;
    if (isFirstApplicant!="") api+="&isFirstApplicant="+isFirstApplicantValue;
    if (gradYear!="") api+="&gradYear="+gradYear;
    if (GPA!="") api+="&GPA="+GPA;
    if (highSchool!="") api+="&highSchool="+highSchool;
    if (stdTestType!="") api+="&stdTestType="+stdTestType;
    if (stdTestScore!="") api+="&stdTestScore="+stdTestScore/100;
    if (testLocation!="") api+="&testLocation="+testLocation;
    if (testCity!="") api+="&testCity="+testCity;
    if (activityType!="") api+="&activityType="+activityType;
    if (compRank!="") api+="&compRank="+compRank;


    // let api="http://localhost:3000/schools?gender="+gender+"&isFirstApplicant="+isFirstApplicantValue+"&gradYear"+gradYear+"&GPA="+GPA+"&highSchool="+highSchool+"&stdTestType="+stdTestType+"&stdTestScore="+stdTestScore+"&testLocation="+testLocation+"&testCity="+testCity+"&activityType="+activityType+"&compRank="+compRank
    // console.log(api);
    // if (GPANumber&&(GPANumber>=0&&GPANumber<=4)){
    //   let res = await axios.get(api);
    //   console.log(res.data.recordset)
    //   return res.data.recordset
    // }else{
    //   console.log("fail!!")
    // }
    console.log(api)
    let res = await axios.get(api,{ withCredentials: true });
    console.log(res.data.recordset)
    return res.data.recordset
    
    
    
  },
  async getEventSingle() {
    let res = await axios.get("http://localhost:5000/",{ withCredentials: true }  );
    return res.data;
  },
  async getAllUniversities(){
    let res=await axios.get(Config.URL+"alluniversities",{ withCredentials: true })
    console.log(res.data.recordset)
    return res.data.recordset
  },
  async getSortedUniversities(type, isDesc){
    let res=await axios.get(Config.URL+"alluniversities?type="+type+"&isDesc="+isDesc,{ withCredentials: true })
    console.log(res.data.recordset)
    return res.data.recordset
  },
  async getPercentage(studentData){

    let res=await axios.post(Config.URL+"percentage", studentData,{ withCredentials: true })
    console.log(res.data.recordset)
    return res.data.recordset
  }
}