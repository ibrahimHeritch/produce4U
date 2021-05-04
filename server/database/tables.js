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
                  isBan BOOLEAN DEFAULT FALSE,
                  PRIMARY KEY (username),
                  FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
                )`,
                `producer(
                  username VARCHAR(26) NOT NULL,
                  farm_name VARCHAR(100) DEFAULT NULL,
                  description VARCHAR(250) DEFAULT NULL,
                  PRIMARY KEY (username),
                  FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE
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
                  FOREIGN KEY (owner_username) REFERENCES user(username) ON DELETE CASCADE
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
                  FOREIGN KEY (item_id) REFERENCES product(id) ON DELETE CASCADE,
                  FOREIGN KEY (reserver) REFERENCES user(username) ON DELETE CASCADE
                )`,
                `message(
                  id INT NOT NULL AUTO_INCREMENT,
                  from_user VARCHAR(26) NOT NULL,
                  to_user VARCHAR(26) NOT NULL,
                  message VARCHAR(250),
                  picture VARCHAR(100) DEFAULT NULL,
                  send_datetime DATETIME NOT NULL,
                  PRIMARY KEY (id),
                  FOREIGN KEY (from_user) REFERENCES user(username) ON DELETE CASCADE,
                  FOREIGN KEY (to_user) REFERENCES user(username) ON DELETE CASCADE
                )`,
                `report(
                  id INT NOT NULL AUTO_INCREMENT,
                  from_user VARCHAR(26) NOT NULL,
                  message VARCHAR(250),
                  time_reported DATETIME NOT NULL,
                  PRIMARY KEY (id),
                  FOREIGN KEY (from_user) REFERENCES user(username) ON DELETE CASCADE
                )`,
                `follow(
                  username VARCHAR(26) NOT NULL,
                  producer VARCHAR(26) NOT NULL,
                  FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE,
                  FOREIGN KEY (producer) REFERENCES user(username) ON DELETE CASCADE,
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
                  FOREIGN KEY (author_username) REFERENCES user(username) ON DELETE CASCADE,
                  FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
                  PRIMARY KEY (id)
                )`,
              `subscription(
                username VARCHAR(26) NOT NULL,
                subscription VARCHAR(1000) NOT NULL,
                FOREIGN KEY (username) REFERENCES user(username) ON DELETE CASCADE,
                PRIMARY KEY (username)
              )`,
              `
              chat(
                first_user VARCHAR(26) NOT NULL,
                second_user VARCHAR(26) NOT NULL,
                unread_messages INT DEFAULT 0,
                is_blocked BOOLEAN DEFAULT FALSE,
                FOREIGN KEY (first_user) REFERENCES user(username) ON DELETE CASCADE,
                FOREIGN KEY (second_user) REFERENCES user(username) ON DELETE CASCADE,
                PRIMARY KEY (first_user, second_user)
              )
              `,
                ];

module.exports = tables;
