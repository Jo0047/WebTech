-- -------------------ADDRESSES--------------------------------
INSERT INTO address (street, street_number, zip_code, city) VALUES
                                                                ('Baker Street', '221B', 'NW1 6XE', 'London'),
                                                                ('Main Street', '123', '10001', 'New York'),
                                                                ('Sunset Blvd', '456', '90028', 'Los Angeles'),
                                                                ('Champs-Élysées', '12', '75008', 'Paris');

-- -------------------USERS--------------------------------
INSERT INTO "user" (email, password, first_name, last_name, is_owner, address_id) VALUES
                                                                                      ('owner@eats.com', '$2a$15$z7Yo91URlV13wMMn8j7aGeee8m5hD1SxdZAFVUy/pPbexruiGUjCC', 'Gordon', 'Ramsey', TRUE, 1),
                                                                                      ('foodie@gmail.com', '$2a$15$z7Yo91URlV13wMMn8j7aGeee8m5hD1SxdZAFVUy/pPbexruiGUjCC', 'Alice', 'Wonderland', FALSE, 2),
                                                                                      ('john.doe@email.com', '$2a$15$z7Yo91URlV13wMMn8j7aGeee8m5hD1SxdZAFVUy/pPbexruiGUjCC', 'John', 'Doe', FALSE, 3),
                                                                                      ('jane.smith@email.com', '$2a$15$z7Yo91URlV13wMMn8j7aGeee8m5hD1SxdZAFVUy/pPbexruiGUjCC', 'Jane', 'Smith', FALSE, 4);

-- -------------------RESTAURANTS--------------------------------
INSERT INTO restaurant (restaurant_name, restaurant_email, phone_number, image_link, cuisines, address_id, owner_email) VALUES
                                                                                                                            ('Sushi Paradise', 'contact@sushiparadise.com', '+44 20 7946 0958', null, ARRAY['japanese', 'fusion']::cuisine[], 1, 'owner@eats.com'),
                                                                                                                            ('Burger Queen', 'hello@burgerqueen.com', '+1 212 555 0198', null, ARRAY['american', 'fusion']::cuisine[], 2, 'owner@eats.com'),
                                                                                                                            ('Pasta Heaven', 'info@pastaheaven.com', '+33 1 44 55 66 77', 'http://localhost:3000/restaurant/image/Bar.jpg', ARRAY['italian', 'mediterranean']::cuisine[], 4, 'owner@eats.com');

-- -------------------DRINKS--------------------------------
INSERT INTO drink (drink_name, category, ingredients, alcoholic, price, image_link, restaurant_id) VALUES
                                                                                                       ('Coca-Cola', 'soft drink', 'Carbonated water, sugar, caffeine', FALSE, 2.50, null, 1),
                                                                                                       ('Green Tea', 'tea', 'Green tea leaves, water', FALSE, 2.00, null, 1),
                                                                                                       ('Sake', 'wine', 'Rice wine', TRUE, 6.50, null, 1),
                                                                                                       ('Plum Wine', 'wine', 'Plum wine', TRUE, 7.00, null, 1),
                                                                                                       ('Yuzu Soda', 'soft drink', 'Carbonated water, yuzu juice', FALSE, 3.00, null, 1),
                                                                                                       ('Matcha Latte', 'coffee', 'Matcha powder, milk', FALSE, 3.50, null, 1),
                                                                                                       ('Shochu', 'cocktail', 'Distilled spirit', TRUE, 5.50, null, 1),
                                                                                                       ('Margarita', 'cocktail', 'Tequila, triple sec, lime juice', TRUE, 8.00, null, 2),
                                                                                                       ('Espresso', 'coffee', 'Coffee beans, water', FALSE, 3.00, null, 3),
                                                                                                       ('Chardonnay', 'wine', 'Grapes', TRUE, 12.50, null, 3);

-- -------------------ORDERS--------------------------------
INSERT INTO "order" (status) VALUES
                                 ('pending'),
                                 ('preparing'),
                                 ('ready'),
                                 ('dispatched'),
                                 ('pending'),
                                 ('ready'),
                                 ('preparing'),
                                 ('dispatched'),
                                 ('ready');

-- -------------------USER_ORDERS--------------------------------
INSERT INTO user_order (user_email, order_id) VALUES
                                                  ('foodie@gmail.com', 1),
                                                  ('john.doe@email.com', 2),
                                                  ('jane.smith@email.com', 3),
                                                  ('foodie@gmail.com', 5),
                                                  ('john.doe@email.com', 6),
                                                  ('jane.smith@email.com', 7),
                                                  ('foodie@gmail.com', 8),
                                                  ('john.doe@email.com', 9);

-- -------------------ORDER_DRINKS--------------------------------
INSERT INTO order_drinks (order_id, drink_id, quantity) VALUES
                                                            (1, 1, 2),
                                                            (1, 3, 1),
                                                            (2, 2, 1),
                                                            (3, 4, 2),
                                                            (5, 5, 2),
                                                            (5, 6, 1),
                                                            (6, 3, 1),
                                                            (6, 7, 2),
                                                            (7, 1, 1),
                                                            (7, 2, 2),
                                                            (8, 5, 1),
                                                            (8, 6, 1),
                                                            (9, 3, 1),
                                                            (9, 7, 1);

-- -------------------REVIEWS--------------------------------
INSERT INTO review (content, rating, restaurant_id) VALUES
                                                        ('Amazing sushi, very fresh!', 5, 1),
                                                        ('Burgers were great but service was slow.', 4, 2),
                                                        ('Pasta was delicious and authentic!', 5, 3),
                                                        ('Sake selection was excellent!', 5, 1),
                                                        ('Matcha latte was perfect and creamy!', 4, 1);

-- -------------------VOUCHERS--------------------------------
INSERT INTO voucher (text, discount, restaurant_id) VALUES
                                                        ('SUSHI10', 10, 1),
                                                        ('DISCOUNT10', 10, 2),
                                                        ('VOUCHER20', 20, 3);
