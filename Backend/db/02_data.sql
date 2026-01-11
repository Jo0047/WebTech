-- Addresses
INSERT INTO "Address" (street, street_number, city, zip_code) VALUES
                                                                  ('Main Street', '12A', 'Berlin', '10115'),
                                                                  ('Second Street', '34B', 'Munich', '80331'),
                                                                  ('Third Avenue', '56C', 'Hamburg', '20095');

-- Drinks
INSERT INTO "Drink" (name, ingredients, alcoholic, price) VALUES
                                                              ('Mojito', 'Rum, Mint, Sugar, Lime, Soda', TRUE, 7.50),
                                                              ('Lemonade', 'Lemon, Water, Sugar', FALSE, 2.50),
                                                              ('Beer', 'Barley, Hops, Water, Yeast', TRUE, 3.00),
                                                              ('Coca Cola', 'Carbonated Water, Sugar, Caramel', FALSE, 2.00);

-- Users
INSERT INTO "User" (email, name, address_id) VALUES
                                                 ('alice@example.com', 'Alice', 1),
                                                 ('bob@example.com', 'Bob', 2),
                                                 ('charlie@example.com', 'Charlie', 3);

-- Restaurants
INSERT INTO "Restaurant" (name, address_id) VALUES
                                                ('Italian Bistro', 1),
                                                ('Sushi House', 2),
                                                ('Burger Joint', 3);

-- Orders
INSERT INTO "UserOrder" (user_email, restaurant_id) VALUES
                                                        ('alice@example.com', 1),
                                                        ('bob@example.com', 2),
                                                        ('charlie@example.com', 3);

-- Order items
INSERT INTO "Order_Items" (order_id, drink_id, quantity) VALUES
                                                             (1, 1, 2),  -- Alice ordered 2 Mojitos
                                                             (1, 2, 1),  -- Alice ordered 1 Lemonade
                                                             (2, 3, 3),  -- Bob ordered 3 Beers
                                                             (3, 4, 1);  -- Charlie ordered 1 Coca Cola
-- Italian Bistro offers Mojito and Lemonade
INSERT INTO "Restaurant_Drinks" (restaurant_id, drink_id) VALUES
                                                              (1, 1),
                                                              (1, 2);

-- Sushi House offers Beer and Lemonade
INSERT INTO "Restaurant_Drinks" (restaurant_id, drink_id) VALUES
                                                              (2, 2),
                                                              (2, 3);

-- Burger Joint offers Beer and Coca Cola
INSERT INTO "Restaurant_Drinks" (restaurant_id, drink_id) VALUES
                                                              (3, 3),
                                                              (3, 4);
