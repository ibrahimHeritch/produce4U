const mysql = require('mysql');
const util = require('util');
const conn = mysql.createConnection({
    host: "database-1.cwsrx6jlceko.us-east-1.rds.amazonaws.com",
    user: "producedev",
    password: "freshtomatoes"
});

const tables = ["test(id int NOT NULL AUTO_INCREMENT, value varchar(20), PRIMARY KEY(id))"];

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
    console.log(" Database Setup Completed");

  }

  static async executeQuery(qry){
    try {
      const result = await query(qry);
      console.log(qry + "\nGave Result:");
      console.log(result);
      return result;

    }catch (err){
      console.log(err);
    }
  }




}

module.exports = Database;
