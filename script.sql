USE qrcode_app;
CREATE TABLE businesses(name VARCHAR(150) not null,
    address VARCHAR(150) not null unique primary key,
    description VARCHAR(3000) not null,
    website VARCHAR(150) not null,
    image VARCHAR(200) not null,
    ownersImage VARCHAR(200) not null
    );

CREATE TABLE addresses(
    neighborhood VARCHAR(200),
    postcode VARCHAR(30),
    city VARCHAR(150) NOT NULL,
    province VARCHAR(150),
    longitude TINYINT NOT NULL,
    latitude TINYINT NOT NULL,
    business VARCHAR(150) NOT NULL,
    id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    FOREIGN KEY(business) REFERENCES businesses(address)
    ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE products(
    name VARCHAR(150) NOT NULL,
    description VARCHAR(3000) NOT NULL,
    image VARCHAR(200) NOT NULL,
    business VARCHAR(150) NOT NULL,
    id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    FOREIGN KEY(business) REFERENCES businesses(address)
    ON DELETE CASCADE ON UPDATE CASCADE
    );

