-- ============================================
-- DUMMY DATA INSERTION SCRIPT
-- ============================================

-- Note: First fix some issues in your schema
-- 1. Remove trailing commas in cuisine and categories CREATE statements
-- 2. Fix FOREIGN KEY syntax
-- 3. Change NUMBER to NUMERIC in voucher table
-- 4. Fix drink primary key (should be id, not drink_name for foreign key references)

-- ============================================
-- 1. INSERT ADDRESSES
-- ============================================
INSERT INTO address (street, street_number, zip_code, city) VALUES
                                                                ('Hauptstraße', 12, 1010, 'Vienna'),
                                                                ('Marienplatz', 5, 80331, 'Munich'),
                                                                ('Ringstraße', 34, 1015, 'Vienna'),
                                                                ('Stephansplatz', 1, 1010, 'Vienna'),
                                                                ('Kärntner Straße', 22, 1010, 'Vienna'),
                                                                ('Praterstraße', 45, 1020, 'Vienna'),
                                                                ('Währinger Straße', 78, 1090, 'Vienna'),
                                                                ('Landstraßer Hauptstraße', 12, 1030, 'Vienna'),
                                                                ('Mariahilfer Straße', 99, 1060, 'Vienna'),
                                                                ('Neubaugasse', 15, 1070, 'Vienna');

-- ============================================
-- 2. INSERT USERS (with hashed passwords)
-- Note: In production, use bcrypt. These are example hashes.
-- Password for all users: "password123"
-- ============================================
INSERT INTO "user" (email, password, first_name, last_name, is_owner, address_id) VALUES
                                                                                      ('john.doe@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'John', 'Doe', FALSE, 1),
                                                                                      ('jane.smith@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Jane', 'Smith', FALSE, 2),
                                                                                      ('owner1@restaurant.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Marco', 'Rossi', TRUE, 3),
                                                                                      ('owner2@restaurant.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Lisa', 'Mueller', TRUE, 4),
                                                                                      ('owner3@restaurant.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Ahmed', 'Hassan', TRUE, 5),
                                                                                      ('customer1@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Anna', 'Schmidt', FALSE, 6),
                                                                                      ('customer2@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Peter', 'Wagner', FALSE, 7),
                                                                                      ('owner4@restaurant.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Sofia', 'Garcia', TRUE, 8),
                                                                                      ('customer3@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Michael', 'Brown', FALSE, 9),
                                                                                      ('customer4@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890', 'Emma', 'Wilson', FALSE, 10);

-- ============================================
-- 3. INSERT CUISINES
-- ============================================
INSERT INTO cuisine (cuisine_name) VALUES
                                       ('Italian'),
                                       ('Chinese'),
                                       ('Japanese'),
                                       ('Mexican'),
                                       ('Indian'),
                                       ('French'),
                                       ('Thai'),
                                       ('Greek'),
                                       ('American'),
                                       ('Mediterranean');

-- ============================================
-- 4. INSERT CATEGORIES (for drinks)
-- ============================================
INSERT INTO categories (cat_name) VALUES
                                      ('Soft Drinks'),
                                      ('Alcoholic Beverages'),
                                      ('Coffee & Tea'),
                                      ('Juices'),
                                      ('Cocktails'),
                                      ('Beer'),
                                      ('Wine'),
                                      ('Smoothies');

-- ============================================
-- 5. INSERT RESTAURANTS
-- ============================================
INSERT INTO restaurant (restaurant_name, restaurant_email, phone_number, address_id, owner_email) VALUES
                                                                                                      ('La Bella Italia', 'info@labellaitalia.com', '+43 1 1234567', 3, 'owner1@restaurant.com'),
                                                                                                      ('The Golden Dragon', 'contact@goldendragon.com', '+43 1 2345678', 4, 'owner2@restaurant.com'),
                                                                                                      ('Spice Palace', 'hello@spicepalace.com', '+43 1 3456789', 5, 'owner3@restaurant.com'),
                                                                                                      ('Tapas & Wine Bar', 'reservations@tapasbar.com', '+43 1 4567890', 8, 'owner4@restaurant.com');

-- ============================================
-- 6. INSERT CUISINE_RESTAURANT (Junction Table)
-- ============================================
INSERT INTO cuisine_restaurant (cuisine, restaurant_id) VALUES
                                                            ('Italian', 1),
                                                            ('Mediterranean', 1),
                                                            ('Chinese', 2),
                                                            ('Japanese', 2),
                                                            ('Indian', 3),
                                                            ('Thai', 3),
                                                            ('Mediterranean', 4),
                                                            ('French', 4);

-- ============================================
-- 7. INSERT DRINKS
-- Note: If drink uses drink_name as PK, we don't need id
-- But for order_drinks FK, you should change drink to use id as PK
-- I'll assume you'll fix the schema to use id
-- ============================================
-- Assuming you fix the schema to add an id column to drink:
-- ALTER TABLE drink ADD COLUMN id SERIAL PRIMARY KEY;
-- ALTER TABLE drink DROP CONSTRAINT drink_pkey;

INSERT INTO drink (drink_name, category, ingredients, alcoholic, price, restaurant_id) VALUES
-- Restaurant 1: La Bella Italia
('Espresso', 'Coffee & Tea', 'Coffee beans', FALSE, 2.50, 1),
('Cappuccino', 'Coffee & Tea', 'Coffee, Milk, Foam', FALSE, 3.50, 1),
('House Red Wine', 'Wine', 'Red grapes', TRUE, 4.50, 1),
('Limoncello', 'Alcoholic Beverages', 'Lemon, Alcohol, Sugar', TRUE, 5.00, 1),
('San Pellegrino', 'Soft Drinks', 'Sparkling water', FALSE, 2.00, 1),

-- Restaurant 2: The Golden Dragon
('Green Tea', 'Coffee & Tea', 'Green tea leaves', FALSE, 2.00, 2),
('Jasmine Tea', 'Coffee & Tea', 'Jasmine tea leaves', FALSE, 2.50, 2),
('Tsingtao Beer', 'Beer', 'Barley, Hops, Water', TRUE, 4.00, 2),
('Lychee Juice', 'Juices', 'Lychee, Water, Sugar', FALSE, 3.50, 2),
('Sake', 'Alcoholic Beverages', 'Rice, Water, Koji', TRUE, 6.00, 2),

-- Restaurant 3: Spice Palace
('Mango Lassi', 'Smoothies', 'Mango, Yogurt, Sugar', FALSE, 4.00, 3),
('Masala Chai', 'Coffee & Tea', 'Tea, Spices, Milk', FALSE, 3.00, 3),
('Kingfisher Beer', 'Beer', 'Barley, Hops, Water', TRUE, 4.50, 3),
('Fresh Lime Soda', 'Soft Drinks', 'Lime, Soda, Sugar', FALSE, 2.50, 3),
('Rose Milk', 'Soft Drinks', 'Milk, Rose syrup', FALSE, 3.50, 3),

-- Restaurant 4: Tapas & Wine Bar
('Sangria', 'Cocktails', 'Red wine, Fruit, Brandy', TRUE, 7.00, 4),
('Spanish Red Wine', 'Wine', 'Tempranillo grapes', TRUE, 5.50, 4),
('Mojito', 'Cocktails', 'Rum, Mint, Lime, Soda', TRUE, 8.00, 4),
('Cava', 'Wine', 'Spanish sparkling wine', TRUE, 6.50, 4),
('Fresh Orange Juice', 'Juices', 'Oranges', FALSE, 3.00, 4);

-- ============================================
-- 8. INSERT ORDERS
-- ============================================
INSERT INTO "order" (status) VALUES
                                 ('pending'),
                                 ('preparing'),
                                 ('ready'),
                                 ('dispatched'),
                                 ('arrived'),
                                 ('pending'),
                                 ('rejected'),
                                 ('preparing'),
                                 ('ready'),
                                 ('arrived');

-- ============================================
-- 9. INSERT USER_ORDER (Junction Table)
-- ============================================
INSERT INTO user_order (user_email, order_id) VALUES
                                                  ('john.doe@example.com', 1),
                                                  ('jane.smith@example.com', 2),
                                                  ('customer1@example.com', 3),
                                                  ('customer2@example.com', 4),
                                                  ('customer3@example.com', 5),
                                                  ('customer4@example.com', 6),
                                                  ('john.doe@example.com', 7),
                                                  ('jane.smith@example.com', 8),
                                                  ('customer1@example.com', 9),
                                                  ('customer2@example.com', 10);

-- ============================================
-- 10. INSERT ORDER_DRINKS (Junction Table)
-- Note: This assumes drink has an id column (1-20 based on insert order)
-- ============================================
INSERT INTO order_drinks (order_id, drink_id, quantity) VALUES
-- Order 1
(1, 1, 2),  -- 2x Espresso
(1, 3, 1),  -- 1x House Red Wine

-- Order 2
(2, 6, 1),  -- 1x Green Tea
(2, 8, 2),  -- 2x Tsingtao Beer
(2, 9, 1),  -- 1x Lychee Juice

-- Order 3
(3, 11, 2), -- 2x Mango Lassi
(3, 12, 1), -- 1x Masala Chai

-- Order 4
(4, 16, 1), -- 1x Sangria
(4, 17, 1), -- 1x Spanish Red Wine
(4, 20, 2), -- 2x Fresh Orange Juice

-- Order 5
(5, 2, 3),  -- 3x Cappuccino
(5, 5, 1),  -- 1x San Pellegrino

-- Order 6
(6, 13, 1), -- 1x Kingfisher Beer
(6, 15, 2), -- 2x Rose Milk

-- Order 7
(7, 18, 1), -- 1x Mojito
(7, 19, 1), -- 1x Cava

-- Order 8
(8, 7, 2),  -- 2x Jasmine Tea
(8, 10, 1), -- 1x Sake

-- Order 9
(9, 4, 2),  -- 2x Limoncello
(9, 3, 1),  -- 1x House Red Wine

-- Order 10
(10, 14, 3), -- 3x Fresh Lime Soda
(10, 11, 1); -- 1x Mango Lassi

-- ============================================
-- 11. INSERT REVIEWS
-- ============================================
INSERT INTO review (content, rating, restaurant_id) VALUES
                                                        ('Amazing Italian food! The pasta was perfect.', 5, 1),
                                                        ('Great atmosphere and excellent service.', 4, 1),
                                                        ('Best Chinese food in Vienna!', 5, 2),
                                                        ('Good food but a bit slow service.', 3, 2),
                                                        ('Authentic Indian cuisine, loved the curry!', 5, 3),
                                                        ('Spicy and delicious, will come again.', 4, 3),
                                                        ('Perfect tapas and amazing wine selection.', 5, 4),
                                                        ('Cozy place, good for dates.', 4, 4),
                                                        ('Decent food, reasonable prices.', 3, 1),
                                                        ('The drinks were excellent!', 5, 2);

-- ============================================
-- 12. INSERT VOUCHERS
-- Note: Changed NUMBER to NUMERIC
-- ============================================
INSERT INTO voucher (text, discount, restaurant_id) VALUES
                                                        ('10% off on your first order!', 10.00, 1),
                                                        ('Happy Hour: 20% off all drinks', 20.00, 1),
                                                        ('Weekend Special: 15% discount', 15.00, 2),
                                                        ('Lunch Deal: Buy 2 get 1 free drink', 33.33, 2),
                                                        ('Student Discount: 10% off', 10.00, 3),
                                                        ('Family Meal: 25% off orders over €50', 25.00, 3),
                                                        ('Date Night: 15% off for couples', 15.00, 4),
                                                        ('Group Discount: 20% off for 6+ people', 20.00, 4),
                                                        ('Early Bird: 10% off before 6 PM', 10.00, 1),
                                                        ('Birthday Special: 30% off on your birthday', 30.00, 3);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check data in all tables
SELECT 'Addresses' as table_name, COUNT(*) as count FROM address
UNION ALL
SELECT 'Users', COUNT(*) FROM "user"
UNION ALL
SELECT 'Cuisines', COUNT(*) FROM cuisine
UNION ALL
SELECT 'Categories', COUNT(*) FROM categories
UNION ALL
SELECT 'Restaurants', COUNT(*) FROM restaurant
UNION ALL
SELECT 'Drinks', COUNT(*) FROM drink
UNION ALL
SELECT 'Orders', COUNT(*) FROM "order"
UNION ALL
SELECT 'Reviews', COUNT(*) FROM review
UNION ALL
SELECT 'Vouchers', COUNT(*) FROM voucher
UNION ALL
SELECT 'Cuisine-Restaurant', COUNT(*) FROM cuisine_restaurant
UNION ALL
SELECT 'User-Order', COUNT(*) FROM user_order
UNION ALL
SELECT 'Order-Drinks', COUNT(*) FROM order_drinks;