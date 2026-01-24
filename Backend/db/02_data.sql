-- IDs will be 1, 2, and 3
INSERT INTO address (street, street_number, zip_code, city) VALUES
                                                                ('Maple Avenue', '42', '90210', 'Beverly Hills'),
                                                                ('Sushi Lane', '7', '10001', 'New York'),
                                                                ('Burger Boulevard', '101', '60601', 'Chicago');

INSERT INTO cuisine (cuisine_name) VALUES
                                       ('Japanese'), ('American'), ('Fusion');

INSERT INTO categories (cat_name) VALUES
                                      ('Soft Drink'), ('Alcoholic'), ('Smoothie');

-- address_id 1 is Beverly Hills
INSERT INTO "user" (email, password, first_name, last_name, is_owner, address_id) VALUES
                                                                                      ('owner@eats.com', 'secure_pass_789', 'Gordon', 'Ramsey', TRUE, 1),
                                                                                      ('foodie@gmail.com', 'yum_yum_123',
                                                                                       'Alice', 'Wonderland', FALSE, 1);

-- restaurant_id 1: Sushi Zen (Address 2)
-- restaurant_id 2: The Big Grill (Address 3)
INSERT INTO restaurant (restaurant_name, restaurant_email, phone_number, address_id, owner_email) VALUES
                                                                                                      ('Sushi Zen', 'order@sushizen.com', '555-0101', 2, 'owner@eats.com'),
                                                                                                      ('The Big Grill', 'hello@biggrill.com', '555-0202', 3, 'owner@eats.com');

-- Linking Cuisines to Restaurants
INSERT INTO cuisine_restaurant (cuisine, restaurant_id) VALUES
                                                            ('Japanese', 1),
                                                            ('American', 2),
                                                            ('Fusion', 1);

-- Drinks for Sushi Zen (ID 1) and Big Grill (ID 2)
INSERT INTO drink (drink_name, category, ingredients, alcoholic, price, restaurant_id) VALUES
                                                                                           ('Premium Sake', 'Alcoholic', 'Fermented rice', TRUE, 15.00, 1),
                                                                                           ('Green Tea Soda', 'Soft Drink', 'Matcha, Carbonated water', FALSE, 4.50, 1),
                                                                                           ('Vanilla Milkshake', 'Soft Drink', 'Milk, Vanilla bean, Cream', FALSE, 6.00, 2);

INSERT INTO review (content, rating, restaurant_id) VALUES
                                                        ('The Sake was incredible!', 5, 1),
                                                        ('Burger was okay, but the shake was the star.', 4, 2);

INSERT INTO voucher (text, discount, restaurant_id) VALUES
                                                        ('SUSHI20', 20, 1),
                                                        ('GRILL5', 5, 2);

-- 1. Create the order shell (order_id will be 1)
INSERT INTO "order" (status) VALUES ('dispatched');

-- 2. Link the order to the user
INSERT INTO user_order (user_email, order_id) VALUES
    ('foodie@gmail.com', 1);

-- 3. Alice orders 3 Green Tea Sodas (drink_id 2)
INSERT INTO order_drinks (quantity, order_id, drink_id) VALUES
    (3, 1, 2);

SELECT
    u.first_name,
    o.id AS order_no,
    o.status,
    d.drink_name,
    od.quantity,
    r.restaurant_name
FROM "user" u
         JOIN user_order uo ON u.email = uo.user_email
         JOIN "order" o ON uo.order_id = o.id
         JOIN order_drinks od ON o.id = od.order_id
         JOIN drink d ON od.drink_id = d.id
         JOIN restaurant r ON d.restaurant_id = r.id;

