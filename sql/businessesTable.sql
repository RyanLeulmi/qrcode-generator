create table businesses(name VARCHAR(150) not null,
    address VARCHAR(150) not null unique primary key,
    description VARCHAR(3000) not null,
    website VARCHAR(150) not null,
    image VARCHAR(200) not null,
    ownersImage VARCHAR(200) not null
    );

