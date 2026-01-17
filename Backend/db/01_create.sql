CREATE TABLE IF NOT EXISTS "Address" (
                                         id SERIAL PRIMARY KEY,
                                         street TEXT NOT NULL,
                                         street_number TEXT NOT NULL,
                                         city TEXT NOT NULL,
                                         zip_code TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Cuisine" (
                                         name TEXT PRIMARY KEY,
);


CREATE TABLE IF NOT EXISTS "Categories" (
                                            name TEXT PRIMARY KEY,
);


CREATE TABLE IF NOT EXISTS "Drink" (
                                       id SERIAL PRIMARY KEY,
                                       name TEXT NOT NULL,
    <--  FOREIGN KEY  qrestaurantID
    <-- category TEXT NOT NULL
    <-- photo
                                       ingredients TEXT,
                                       alcoholic BOOLEAN DEFAULT FALSE,
                                       price DECIMAL(10, 2) NOT NULL -- Added price
    );

CREATE TABLE IF NOT EXISTS "User" (
                                      email TEXT PRIMARY KEY,
    <--   password, TEXT NOT NULL
                                      name TEXT NOT NULL,
                                      address_id INT NOT NULL,
                                      FOREIGN KEY (address_id) REFERENCES "Address"(id)
    );

CREATE TABLE IF NOT EXISTS "Review" (
                                        id SERIAL PRIMARY KEY,
                                        text TEXT NOT NULL,
                                        rating NOT NULL
                                        FOREIGN KEY restaurantID
);

CREATE TABLE IF NOT EXISTS "Voucher" (
                                         id SERIAL PRIMARY KEY,
                                         text TEXT NOT NULL,
                                         discount NUMBER NOT NULL
                                         FOREIGN KEY restaurantID
);


<--SELECT user where email =email ....  user.email = restaurants = ownerEmail. -->
CREATE TABLE IF NOT EXISTS "Restaurant" (
                                            id SERIAL PRIMARY KEY,
    <-- FOREIGN KEY ownerEmail,
    <-- restaurant_email
    <-- phone_number
    <-- rating TEXT 1-5
                                            name TEXT NOT NULL,
                                            address_id INT NOT NULL,
                                            FOREIGN KEY (address_id) REFERENCES "Address"(id)
    );

CREATE TABLE IF NOT EXISTS "CuisineRestaurants" (
                                                    cuisine TEXT NOT NULL,
                                                    restaurant_id INT NOT NULL,
                                                    FOREIGN KEY (cuisine) REFERENCES "User"(email),
    FOREIGN KEY (restaurant_id) REFERENCES "Restaurant"(id)
    );

CREATE TABLE IF NOT EXISTS "UserOrder" (
                                           id SERIAL PRIMARY KEY,
                                           timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    <-- status:  preparing → ready → dispatched
                                           FOREIGN KEY (user_email) REFERENCES "User"(email),
    FOREIGN KEY (order_id) REFERENCES "Order_Items"(order_id)
    );

CREATE TABLE IF NOT EXISTS "Order_Items" (
                                             order_id INT NOT NULL,
                                             drink_id INT NOT NULL,
                                             quantity INT DEFAULT 1,
                                             PRIMARY KEY (order_id, drink_id),
    FOREIGN KEY (order_id) REFERENCES "UserOrder"(id),
    FOREIGN KEY (drink_id) REFERENCES "Drink"(id)
    );