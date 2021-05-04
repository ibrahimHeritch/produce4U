const mysql = require('mysql');
const util = require('util');
const tables = require('./tables.js')
const conn = mysql.createConnection({
  host: "database-1.cwsrx6jlceko.us-east-1.rds.amazonaws.com",
  user: "producedev",
  password: "freshtomatoes"
});



const query = util.promisify(conn.query).bind(conn);

class Database{


  static init(){
    var query = "CREATE DATABASE IF NOT EXISTS produce;";
    this.executeQuery(query);
    this.executeQuery("USE produce;");
    var x;
    for( x in tables){
        this.executeQuery("CREATE TABLE IF NOT EXISTS " + tables[x]+";");
    }
    console.log("Setting up Database");

  }

  static async executeQuery(qry){
    try {
      const result = await query(qry);
      //console.log(qry + "\nGave Result:");
      //console.log(result);
      return {error: "ALL OK", result:result};

    }catch (err){
      //console.log(err);
      return{error: err.sqlMessage,result:[]};
    }
  }

  static async executeInsertQueries(qrys){
    try {
      for( var x in qrys){
          await query(qrys[x]);
      }

    }catch (err){
      console.log(err.sqlMessage);
      return(err.sqlMessage);
    }
    return("ALL OK");
  }




}

module.exports = Database;
