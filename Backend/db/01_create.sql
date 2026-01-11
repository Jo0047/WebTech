CREATE TABLE IF NOT EXISTS "Address" (
                                         id SERIAL PRIMARY KEY,
                                         street TEXT NOT NULL,
                                         street_number TEXT NOT NULL,
                                         city TEXT NOT NULL,
                                         zip_code TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Drink" (
                                       id SERIAL PRIMARY KEY,
                                       name TEXT NOT NULL,
                                       ingredients TEXT,
                                       alcoholic BOOLEAN DEFAULT FALSE,
                                       price DECIMAL(10, 2) NOT NULL -- Added price
    );

CREATE TABLE IF NOT EXISTS "User" (
                                      email TEXT PRIMARY KEY,
                                      name TEXT NOT NULL,
                                      address_id INT NOT NULL,
                                      FOREIGN KEY (address_id) REFERENCES "Address"(id)
    );

CREATE TABLE IF NOT EXISTS "Restaurant" (
                                            id SERIAL PRIMARY KEY,
                                            name TEXT NOT NULL,
                                            address_id INT NOT NULL,
                                            FOREIGN KEY (address_id) REFERENCES "Address"(id)
    );
CREATE TABLE IF NOT EXISTS "Restaurant_Drinks" (
                                                   restaurant_id INT NOT NULL,
                                                   drink_id INT NOT NULL,
                                                   PRIMARY KEY (restaurant_id, drink_id),
    FOREIGN KEY (restaurant_id) REFERENCES "Restaurant"(id),
    FOREIGN KEY (drink_id) REFERENCES "Drink"(id)
    );

CREATE TABLE IF NOT EXISTS "UserOrder" (
                                           id SERIAL PRIMARY KEY,
                                           user_email TEXT NOT NULL,
                                           restaurant_id INT NOT NULL,
                                           timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                           FOREIGN KEY (user_email) REFERENCES "User"(email),
    FOREIGN KEY (restaurant_id) REFERENCES "Restaurant"(id)
    );

CREATE TABLE IF NOT EXISTS "Order_Items" (
                                             order_id INT NOT NULL,
                                             drink_id INT NOT NULL,
                                             quantity INT DEFAULT 1,
                                             PRIMARY KEY (order_id, drink_id),
    FOREIGN KEY (order_id) REFERENCES "UserOrder"(id),
    FOREIGN KEY (drink_id) REFERENCES "Drink"(id)
    );