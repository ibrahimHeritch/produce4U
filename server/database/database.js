const mysql = require('mysql');
const util = require('util');
const conn = mysql.createConnection({
    host: "database-1.cwsrx6jlceko.us-east-1.rds.amazonaws.com",
    user: "producedev",
    password: "freshtomatoes"

});

const tables = ["test(id int NOT NULL AUTO_INCREMENT, value varchar(20), PRIMARY KEY(id))",
                `address(
                id INT NOT NULL AUTO_INCREMENT,
                address_line_one VARCHAR(100) DEFAULT NULL,
                address_line_two VARCHAR(100) DEFAULT NULL,
                city  VARCHAR(40) DEFAULT NULL,
                state VARCHAR(40) DEFAULT NULL,
                country VARCHAR(40) DEFAULT NULL,
                zip_code VARCHAR(5) DEFAULT NULL,
                latitude DECIMAL(11, 7) DEFAULT NULL ,
                longitude DECIMAL(11, 7) DEFAULT NULL,
                PRIMARY KEY (id)
                )`,
                `user(username VARCHAR(26) NOT NULL, password varchar(120) NOT NULL,
                  first_name VARCHAR(40) NOT NULL,
                  last_name VARCHAR(40) NOT NULL,
                  email VARCHAR(100) NOT NULL,
                  account_type ENUM ('USER','PRODUCER','ADMIN') NOT NULL,
                  profile_picture VARCHAR(100) DEFAULT NULL,
                  date_joined DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                  is_banned BOOLEAN NOT NULL DEFAULT 0,
                  token VARCHAR(30) DEFAULT NULL,
                  address_id INT DEFAULT NULL,
                  PRIMARY KEY (username),
                  FOREIGN KEY (address_id) REFERENCES address(id)
                )`,
                `producer(
                  username VARCHAR(26) NOT NULL,
                  farm_name VARCHAR(100) DEFAULT NULL,
                  description VARCHAR(250) DEFAULT NULL,
                  PRIMARY KEY (username),
                  FOREIGN KEY (username) REFERENCES user(username)
                )`,
                `product(
                  id INT NOT NULL AUTO_INCREMENT,
                  owner_username VARCHAR(26) NOT NULL,
                  name VARCHAR(180) NOT NULL,
                  description VARCHAR(250),
                  quantity INT DEFAULT 0,
                  price DECIMAL(11,7) DEFAULT 0.0,
                  rating DECIMAL(11,7) DEFAULT 5.0,
                  product_type ENUM('VEGETABLE','FRUITS','BREAD','JUICES','TEA','OTHER') NOT NULL,
                  pricing_type ENUM('Lb','Oz','Pc','Dz','Pkg') NOT NULL,
                  picture VARCHAR(100) DEFAULT NULL,
                  date_harversted DATETIME DEFAULT NULL,
                  PRIMARY KEY (id),
                  FOREIGN KEY (owner_username) REFERENCES user(username)
                )`,
                `reservation(
                  id INT NOT NULL AUTO_INCREMENT,
                  product_name VARCHAR(180) NOT NULL,
                  producer_name VARCHAR(100) NOT NULL,
                  pickup_datetime DATETIME NOT NULL,
                  reserver VARCHAR(26) NOT NULL,
                  order_status ENUM('INCOMPLETE','CONFIRMED','COMPLETED','CANCELLED') NOT NULL,
                  item_id INT NOT NULL,
                  quantity DECIMAL(10,2) NOT NULL,
                  price DECIMAL(10,2) NOT NULL,
                  PRIMARY KEY (id),
                  FOREIGN KEY (item_id) REFERENCES product(id),
                  FOREIGN KEY (reserver) REFERENCES user(username)
                )`,
                ];

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
