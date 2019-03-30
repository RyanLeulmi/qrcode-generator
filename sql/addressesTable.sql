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

