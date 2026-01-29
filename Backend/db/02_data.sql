-- Add more addresses for the new restaurants
INSERT INTO address (street, street_number, zip_code, city) VALUES
                                                                ('Maple Avenue', '42', '90210', 'Beverly Hills'),
                                                                ('Sushi Lane', '7', '10001', 'New York'),
                                                                ('Burger Boulevard', '101', '60601', 'Chicago'),
                                                                ('Pizza Plaza', '15', '02108', 'Boston'),
                                                                ('Taco Trail', '88', '78701', 'Austin'),
                                                                ('Pasta Place', '23', '98101', 'Seattle'),
                                                                ('Curry Corner', '56', '94102', 'San Francisco'),
                                                                ('BBQ Street', '99', '37201', 'Nashville'),
                                                                ('Noodle Lane', '12', '33101', 'Miami'),
                                                                ('Steakhouse Drive', '77', '85001', 'Phoenix');

-- Add more cuisines
INSERT INTO cuisine (cuisine_name) VALUES
                                       ('Japanese'),
                                       ('American'),
                                       ('Fusion'),
                                       ('Italian'),
                                       ('Mexican'),
                                       ('Indian'),
                                       ('Thai'),
                                       ('BBQ'),
                                       ('Steakhouse'),
                                       ('Mediterranean');

INSERT INTO categories (cat_name) VALUES
                                      ('Soft Drink'),
                                      ('Alcoholic'),
                                      ('Smoothie'),
                                      ('Coffee'),
                                      ('Tea'),
                                      ('Juice');

-- Users (address_id 1 is Beverly Hills)
INSERT INTO "user" (email, password, first_name, last_name, is_owner, address_id) VALUES
                                                                                      ('owner@eats.com', '$2a$15$z7Yo91URlV13wMMn8j7aGeee8m5hD1SxdZAFVUy/pPbexruiGUjCC', 'Gordon', 'Ramsey', TRUE, 1),
                                                                                      ('foodie@gmail.com', '$2a$15$z7Yo91URlV13wMMn8j7aGeee8m5hD1SxdZAFVUy/pPbexruiGUjCC', 'Alice', 'Wonderland', FALSE, 1),
                                                                                      ('john.doe@email.com', '$2a$15$z7Yo91URlV13wMMn8j7aGeee8m5hD1SxdZAFVUy/pPbexruiGUjCC', 'John', 'Doe', FALSE, 1),
                                                                                      ('jane.smith@email.com', '$2a$15$z7Yo91URlV13wMMn8j7aGeee8m5hD1SxdZAFVUy/pPbexruiGUjCC', 'Jane', 'Smith', FALSE, 1);

-- 10 Restaurants with diverse cuisines
INSERT INTO restaurant (restaurant_name, restaurant_email, phone_number, image_link, address_id, owner_email) VALUES
                                                                                                                  ('Sushi Zen', 'order@sushizen.com', '555-0101', null, 2, 'owner@eats.com'),
                                                                                                                  ('The Big Grill', 'hello@biggrill.com', '555-0202', null, 3, 'owner@eats.com'),
                                                                                                                  ('Bella Italia', 'info@bellaitalia.com', '555-0303', null, 4, 'owner@eats.com'),
                                                                                                                  ('Taco Fiesta', 'orders@tacofiesta.com', '555-0404', null, 5, 'owner@eats.com'),
                                                                                                                  ('Spice Garden', 'contact@spicegarden.com', '555-0505', null, 6, 'owner@eats.com'),
                                                                                                                  ('Thai Paradise', 'hello@thaiparadise.com', '555-0606', null, 7, 'owner@eats.com'),
                                                                                                                  ('Smokey Joe''s BBQ', 'bbq@smokeyjo.com', '555-0707', null, 8, 'owner@eats.com'),
                                                                                                                  ('Ocean Noodles', 'info@oceannoodles.com', '555-0808', null, 9, 'owner@eats.com'),
                                                                                                                  ('Prime Cuts Steakhouse', 'reservations@primecuts.com', '555-0909', null, 10, 'owner@eats.com'),
                                                                                                                  ('Mediterranean Breeze', 'hello@medbreeze.com', '555-1010', null, 1, 'owner@eats.com');

-- Link cuisines to restaurants
INSERT INTO cuisine_restaurant (cuisine, restaurant_id) VALUES
                                                            -- Sushi Zen (1)
                                                            ('Japanese', 1),
                                                            ('Fusion', 1),
                                                            -- The Big Grill (2)
                                                            ('American', 2),
                                                            -- Bella Italia (3)
                                                            ('Italian', 3),
                                                            -- Taco Fiesta (4)
                                                            ('Mexican', 4),
                                                            -- Spice Garden (5)
                                                            ('Indian', 5),
                                                            ('Fusion', 5),
                                                            -- Thai Paradise (6)
                                                            ('Thai', 6),
                                                            -- Smokey Joe's BBQ (7)
                                                            ('BBQ', 7),
                                                            ('American', 7),
                                                            -- Ocean Noodles (8)
                                                            ('Japanese', 8),
                                                            ('Thai', 8),
                                                            -- Prime Cuts Steakhouse (9)
                                                            ('Steakhouse', 9),
                                                            ('American', 9),
                                                            -- Mediterranean Breeze (10)
                                                            ('Mediterranean', 10),
                                                            ('Fusion', 10);

-- Drinks for each restaurant (2-3 drinks per restaurant)
INSERT INTO drink (drink_name, category, ingredients, alcoholic, price, image_link, restaurant_id) VALUES
                                                                                                       -- Sushi Zen (1)
                                                                                                       ('Premium Sake', 'Alcoholic', 'Fermented rice', TRUE, 15.00, null, 1),
                                                                                                       ('Green Tea Soda', 'Soft Drink', 'Matcha, Carbonated water', FALSE, 4.50, null, 1),
                                                                                                       ('Yuzu Lemonade', 'Soft Drink', 'Yuzu juice, Lemon, Sugar', FALSE, 5.50, null, 1),

                                                                                                       -- The Big Grill (2)
                                                                                                       ('Vanilla Milkshake', 'Soft Drink', 'Milk, Vanilla bean, Cream', FALSE, 6.00, null, 2),
                                                                                                       ('Craft Beer', 'Alcoholic', 'Hops, Barley, Yeast', TRUE, 7.50, null, 2),

                                                                                                       -- Bella Italia (3)
                                                                                                       ('Italian Red Wine', 'Alcoholic', 'Sangiovese grapes', TRUE, 12.00, null, 3),
                                                                                                       ('Sparkling Water', 'Soft Drink', 'Carbonated mineral water', FALSE, 3.00, null, 3),
                                                                                                       ('Espresso', 'Coffee', 'Italian coffee beans', FALSE, 4.00, null, 3),

                                                                                                       -- Taco Fiesta (4)
                                                                                                       ('Margarita', 'Alcoholic', 'Tequila, Lime, Triple sec', TRUE, 10.00, null, 4),
                                                                                                       ('Horchata', 'Soft Drink', 'Rice milk, Cinnamon, Vanilla', FALSE, 4.50, null, 4),
                                                                                                       ('Jamaica Water', 'Soft Drink', 'Hibiscus, Sugar, Lime', FALSE, 4.00, null, 4),

                                                                                                       -- Spice Garden (5)
                                                                                                       ('Mango Lassi', 'Smoothie', 'Mango, Yogurt, Cardamom', FALSE, 5.50, null, 5),
                                                                                                       ('Masala Chai', 'Tea', 'Black tea, Spices, Milk', FALSE, 3.50, null, 5),
                                                                                                       ('Rose Sherbet', 'Soft Drink', 'Rose water, Sugar, Lemon', FALSE, 4.00, null, 5),

                                                                                                       -- Thai Paradise (6)
                                                                                                       ('Thai Iced Tea', 'Tea', 'Black tea, Condensed milk, Star anise', FALSE, 4.50, null, 6),
                                                                                                       ('Coconut Water', 'Soft Drink', 'Fresh coconut water', FALSE, 5.00, null, 6),
                                                                                                       ('Lychee Smoothie', 'Smoothie', 'Lychee, Ice, Syrup', FALSE, 6.00, null, 6),

                                                                                                       -- Smokey Joe's BBQ (7)
                                                                                                       ('Sweet Tea', 'Tea', 'Black tea, Sugar, Lemon', FALSE, 3.00, null, 7),
                                                                                                       ('Root Beer', 'Soft Drink', 'Sassafras, Vanilla, Spices', FALSE, 3.50, null, 7),
                                                                                                       ('Bourbon', 'Alcoholic', 'Aged whiskey', TRUE, 11.00, null, 7),

                                                                                                       -- Ocean Noodles (8)
                                                                                                       ('Bubble Tea', 'Tea', 'Black tea, Tapioca pearls, Milk', FALSE, 5.50, null, 8),
                                                                                                       ('Plum Wine', 'Alcoholic', 'Fermented plums', TRUE, 9.00, null, 8),

                                                                                                       -- Prime Cuts Steakhouse (9)
                                                                                                       ('Cabernet Sauvignon', 'Alcoholic', 'Red wine grapes', TRUE, 16.00, null, 9),
                                                                                                       ('Old Fashioned', 'Alcoholic', 'Whiskey, Bitters, Sugar', TRUE, 13.00, null, 9),
                                                                                                       ('Sparkling Water', 'Soft Drink', 'Carbonated water', FALSE, 3.50, null, 9),

                                                                                                       -- Mediterranean Breeze (10)
                                                                                                       ('Greek Wine', 'Alcoholic', 'Assyrtiko grapes', TRUE, 14.00, null, 10),
                                                                                                       ('Mint Lemonade', 'Soft Drink', 'Lemon, Mint, Sugar', FALSE, 4.50, null, 10),
                                                                                                       ('Turkish Coffee', 'Coffee', 'Finely ground coffee', FALSE, 4.00, null, 10);

-- Reviews for each restaurant (varied ratings)
INSERT INTO review (content, rating, restaurant_id) VALUES
                                                        -- Sushi Zen (1) - Average: 5.0
                                                        ('The Sake was incredible!', 5, 1),
                                                        ('Best sushi in town!', 5, 1),
                                                        ('Authentic Japanese experience', 5, 1),

                                                        -- The Big Grill (2) - Average: 4.0
                                                        ('Burger was okay, but the shake was the star.', 4, 2),
                                                        ('Great atmosphere and good food', 4, 2),

                                                        -- Bella Italia (3) - Average: 4.7
                                                        ('Felt like I was in Rome!', 5, 3),
                                                        ('Pasta was perfectly al dente', 5, 3),
                                                        ('Wine selection is excellent', 4, 3),

                                                        -- Taco Fiesta (4) - Average: 4.3
                                                        ('Fresh ingredients and generous portions', 5, 4),
                                                        ('Margaritas are strong!', 4, 4),
                                                        ('Good value for money', 4, 4),

                                                        -- Spice Garden (5) - Average: 4.8
                                                        ('Most authentic Indian food outside of India', 5, 5),
                                                        ('Spice levels are perfect', 5, 5),
                                                        ('Mango lassi is heavenly', 5, 5),
                                                        ('Service could be faster', 4, 5),

                                                        -- Thai Paradise (6) - Average: 4.5
                                                        ('Pad Thai was amazing', 5, 6),
                                                        ('Great curry selection', 4, 6),

                                                        -- Smokey Joe's BBQ (7) - Average: 4.2
                                                        ('Ribs fall off the bone', 5, 7),
                                                        ('A bit too smoky for my taste', 3, 7),
                                                        ('Best BBQ in the city', 5, 7),

                                                        -- Ocean Noodles (8) - Average: 3.8
                                                        ('Decent noodles, nothing special', 4, 8),
                                                        ('Bubble tea was watery', 3, 8),
                                                        ('Good for a quick meal', 4, 8),

                                                        -- Prime Cuts Steakhouse (9) - Average: 4.9
                                                        ('Steak cooked to perfection', 5, 9),
                                                        ('Expensive but worth every penny', 5, 9),
                                                        ('Best steakhouse experience ever', 5, 9),
                                                        ('Wine pairing was spot on', 5, 9),
                                                        ('Small portions for the price', 4, 9),

                                                        -- Mediterranean Breeze (10) - Average: 4.6
                                                        ('Love the mezze platter', 5, 10),
                                                        ('Fresh and healthy options', 5, 10),
                                                        ('Great for vegetarians', 4, 10);

-- Vouchers for each restaurant
INSERT INTO voucher (text, discount, restaurant_id) VALUES
                                                        ('SUSHI20', 20, 1),
                                                        ('GRILL5', 5, 2),
                                                        ('ITALIA15', 15, 3),
                                                        ('TACO10', 10, 4),
                                                        ('SPICE25', 25, 5),
                                                        ('THAI10', 10, 6),
                                                        ('BBQ15', 15, 7),
                                                        ('NOODLE5', 5, 8),
                                                        ('STEAK20', 20, 9),
                                                        ('MED10', 10, 10);

-- Sample orders
INSERT INTO "order" (status) VALUES
                                 ('dispatched'),
                                 ('ready'),
                                 ('preparing');

-- Link orders to users
INSERT INTO user_order (user_email, order_id) VALUES
                                                  ('foodie@gmail.com', 1),
                                                  ('john.doe@email.com', 2),
                                                  ('jane.smith@email.com', 3);

-- Order details
INSERT INTO order_drinks (quantity, order_id, drink_id) VALUES
                                                            (3, 1, 2),  -- Alice orders 3 Green Tea Sodas
                                                            (2, 2, 7),  -- John orders 2 Sparkling Waters
                                                            (1, 2, 6),  -- John orders 1 Italian Red Wine
                                                            (2, 3, 11), -- Jane orders 2 Margaritas
                                                            (1, 3, 12); -- Jane orders 1 Horchata

-- Query to verify all restaurants with cuisines and ratings
SELECT
    r.id,
    r.restaurant_name,
    r.restaurant_email,
    r.phone_number,
    r.image_link,
    r.address_id,
    r.owner_email,
    COALESCE(
            ARRAY_AGG(DISTINCT cr.cuisine) FILTER (WHERE cr.cuisine IS NOT NULL),
            ARRAY[]::TEXT[]
    ) AS cuisines,
    COALESCE(AVG(rev.rating), 0) AS average_rating,
    COUNT(DISTINCT rev.id) AS review_count
FROM
    restaurant r
        LEFT JOIN
    cuisine_restaurant cr ON r.id = cr.restaurant_id
        LEFT JOIN
    review rev ON r.id = rev.restaurant_id
GROUP BY
    r.id,
    r.restaurant_name,
    r.restaurant_email,
    r.phone_number,
    r.image_link,
    r.address_id,
    r.owner_email
ORDER BY
    r.restaurant_name;