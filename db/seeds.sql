INSERT INTO departments (name)
VALUES  ('Hero'),
        ('Villain'),
        ('Support'),
        ('SAITAMA');

INSERT INTO roles (title, salary, departments_id)
VALUES  ('Pirate',99999.99,1),
        ('Ninja',50000.00,2),
        ('Mecha',25000.00,3),
        ('Demon Slayer',60000.00,1),
        ('Saiyan',75000.00,2),
        ('Samurais',80000.00,3),
        ('Space Cowboys',15000.00,3),
        ('Kaiju',69000.00,1),
        ('Bored Bald Person',100.00,4);

INSERT INTO employees (first_name,last_name,roles_id,manager_id)
VALUES  ('Goku', 'Son',5,null),
        ('Vegeta','The Fourth',5,1),
        ('Luffy','Monkey D.',1,null),
        ('Zoro','Roronoa',1 ,3 ),
        ('Sanji','Vinsmoke',1 ,3 ),
        ('Gohan','Son',5 , 1),
        ('Tanjiro','Kamado',4 ,null ),
        ('Kafka','Hibino',8 , null),
        ('Nezuko','Kamado',4 ,7 ),
        ('Zenitsu','Agatsuma',4 ,7 ),
        ('Spike','Spiegel',7 ,null ),
        ('Faye','Valentine',7 ,12 ),
        ('Saitama','Super Sale',9 ,null );