
// import validate from "validate"
const sql = require("mssql");

const config = {
  user: 'wus4',
  password: 'wushixinJames34',
  server: 'golem.csse.rose-hulman.edu', 
  database: '_S1G8UniAppSys' 
};

export default {
  async getSchools() {
    sql.connect(config, (err)=> {
    
      if (err) console.log(err);
      var request = new sql.Request();
      request.query('select SID, Name from School', function (err, recordset) {
          
          if (err) console.log(err)
          return recordset
          
      });
  });
    
    
    
  },
}