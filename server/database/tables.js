const tables = [
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
                `user(
                  username VARCHAR(26) NOT NULL,
                  first_name VARCHAR(40) NOT NULL,
                  last_name VARCHAR(40) NOT NULL,
                  email VARCHAR(100) NOT NULL,
                  password VARCHAR(60) NOT NULL,
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
                `message(
                  id INT NOT NULL AUTO_INCREMENT,
                  from_user VARCHAR(26) NOT NULL,
                  to_user VARCHAR(26) NOT NULL,
                  message VARCHAR(250),
                  picture VARCHAR(100) DEFAULT NULL,
                  send_datetime DATETIME NOT NULL,
                  PRIMARY KEY (id),
                  FOREIGN KEY (from_user) REFERENCES user(username),
                  FOREIGN KEY (to_user) REFERENCES user(username)
                )`,
                `report(
                  id INT NOT NULL AUTO_INCREMENT,
                  from_user VARCHAR(26) NOT NULL,
                  message VARCHAR(250),
                  time_reported DATETIME NOT NULL,
                  PRIMARY KEY (id),
                  FOREIGN KEY (from_user) REFERENCES user(username)
                )`,
                `
                follow(
                  username VARCHAR(26) NOT NULL,
                  producer VARCHAR(26) NOT NULL,
                  FOREIGN KEY (username) REFERENCES user(username),
                  FOREIGN KEY (producer) REFERENCES user(username),
                  PRIMARY KEY (username,producer)
                )`,
                `review(
                  id INT NOT NULL AUTO_INCREMENT,
                  author_username VARCHAR(26) NOT NULL,
                  text VARCHAR(250),
                  producer_reply VARCHAR(250),
                  product_id INT NOT NULL,
                  rating DECIMAL(11,7) DEFAULT 5.0,
                  picture VARCHAR(100) DEFAULT NULL,
                  FOREIGN KEY (author_username) REFERENCES user(username),
                  FOREIGN KEY (product_id) REFERENCES product(id),
                  PRIMARY KEY (id)
                )`,
                ];

module.exports = tables;
