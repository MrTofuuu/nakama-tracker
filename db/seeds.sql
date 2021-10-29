INSERT INTO departments (name)
VALUES  ('Hero'),
        ('Villain'),
        ('Support'),
        ('SAITAMA');

INSERT INTO roles (title, salary, departments_id)
VALUES  ('Pirate',99999.99,1),
        ('Ninja',50000,2),
        ('Mecha',25000,3),
        ('Demon Slayer',60000,1),
        ('Saiyan',75000,2),
        ('Samurais',80000,3),
        ('Space Cowboys',15000,3),
        ('Kaiju',69000,1),
        ('Bored Bald Person',100,4);

INSERT INTO employees (first_name,last_name,roles_id,manager_id)
VALUES  ('Goku', 'Son',2,null),
        ('Vegeta','The Fourth',2,1),
        ('Luffy','Monkey D.',1,null),
        ('Zoro','Roronoa',1 ,3 ),
        ('Sanji','Vinsmoke',1 ,3 ),
        ('Gohan','Son',2 , 1),
        ('Kafka','Hibino',8 , null),
        ('Tanjiro','Kamado',4 ,null ),
        ('Nezuko','Kamado',4 ,9 ),
        ('Zenitsu','Agatsuma',4 ,9 ),
        ('Spike','Spiegel',7 ,null ),
        ('Faye','Valentine',7 ,12 ),
        ('Saitama','Super Sale',9 ,null );