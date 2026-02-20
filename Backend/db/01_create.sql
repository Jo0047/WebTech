--sudo docker compose down -v && sudo docker compose up --build --force-recreate -d
-- sudo docker exec -it postgres_db psql -U postgres -d angular_app
-------------------ENUMS--------------------------------
CREATE TYPE order_status AS ENUM (
    'pending',
    'rejected',
    'preparing',
    'ready',
    'dispatched',
    'arrived'
);

CREATE TYPE cuisine AS ENUM (
  'japanese',
  'american',
  'fusion',
  'italian',
  'mexican',
  'indian',
  'thai',
  'bbq',
  'steakhouse',
  'mediterranean'
);

CREATE TYPE cat AS ENUM (
    'soft drink',
    'cocktail',
    'beer',
    'wine',
    'coffee',
    'tea'
);

-------------------TABLES--------------------------------

CREATE TABLE IF NOT EXISTS address (
                                       id SERIAL PRIMARY KEY,

                                       street TEXT NOT NULL,
                                       street_number TEXT NOT NULL,
                                       zip_code TEXT NOT NULL,
                                       city TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "user" (
                                      email TEXT PRIMARY KEY,

                                      password TEXT NOT NULL,
                                      first_name TEXT NOT NULL,
                                      last_name TEXT NOT NULL,
                                      is_owner BOOLEAN DEFAULT FALSE,

                                      FOREIGN KEY (address_id) REFERENCES address(id),
    address_id INT NOT NULL
    );

CREATE TABLE IF NOT EXISTS restaurant (
                                          id SERIAL PRIMARY KEY,

                                          restaurant_name TEXT NOT NULL,
                                          restaurant_email TEXT,
                                          phone_number TEXT,
                                          image_link TEXT,
    cuisines cuisine[],

                                          FOREIGN KEY (address_id) REFERENCES address(id),
    address_id INT NOT NULL,
    FOREIGN KEY (owner_email) REFERENCES "user"(email),
    owner_email TEXT NOT NULL
    );

CREATE TABLE IF NOT EXISTS "order" (
                                       id SERIAL PRIMARY KEY,
                                       status order_status NOT NULL DEFAULT 'pending'
);


CREATE TABLE IF NOT EXISTS drink (
                                     id SERIAL PRIMARY KEY,
                                     drink_name TEXT NOT NULL,

                                     category cat NOT NULL,
                                     ingredients TEXT,
                                     alcoholic BOOLEAN DEFAULT FALSE,
                                     price DECIMAL(10, 2) NOT NULL,
                                     image_link TEXT,

    restaurant_id INT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
    );



CREATE TABLE IF NOT EXISTS review (
                                      id SERIAL PRIMARY KEY,

                                      content TEXT NOT NULL,
                                      rating INT NOT NULL,

                                      restaurant_id INT NOT NULL,
                                      FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
    );

CREATE TABLE IF NOT EXISTS voucher (
                                       id SERIAL PRIMARY KEY,

                                       text TEXT NOT NULL,
                                       discount INT NOT NULL,

                                       restaurant_id INT NOT NULL,
                                       FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)

    );

--------------------------------------JUNCTION TABLES-----------------------------------------


CREATE TABLE IF NOT EXISTS user_order (
                                          PRIMARY KEY (user_email, order_id),

    user_email TEXT NOT NULL,
    order_id INT NOT NULL,

    FOREIGN KEY (user_email) REFERENCES "user"(email),
    FOREIGN KEY (order_id) REFERENCES "order"(id)
    );

CREATE TABLE IF NOT EXISTS order_drinks (
                                            PRIMARY KEY (order_id, drink_id),

    quantity INT DEFAULT 1,
    order_id INT NOT NULL,
    drink_id INT NOT NULL,

    FOREIGN KEY (order_id) REFERENCES "order"(id),
    FOREIGN KEY (drink_id) REFERENCES drink(id)
    );
