CREATE TABLE Customer
	(cid INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	 cname CHAR(80) NOT NULL,
	 email CHAR(40) NOT NULL, UNIQUE (email), 
	 address CHAR(200),
	 password CHAR(16) NOT NULL)

CREATE TABLE City
	(cityid INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	 title CHAR(50) NOT NULL,
	 state CHAR(2) NOT NULL)


CREATE TABLE Flight
	(fid INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	 fnumber INTEGER,
     	 fdate DATE NOT NULL,
   	 ftime TIME NOT NULL,
         price REAL NOT NULL,
         class INTEGER NOT NULL,
         capacity INTEGER NOT NULL,
         available INTEGER NOT NULL,
     	 orig INTEGER NOT NULL,
         dest INTEGER NOT NULL,
	 FOREIGN KEY (orig) REFERENCES City(cityid) ON DELETE CASCADE,
	 FOREIGN KEY (dest) REFERENCES City(cityid) ON DELETE CASCADE)


CREATE TABLE Reservation
	(ordernum INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
	 cid INTEGER NOT NULL,
	 dfid INTEGER NOT NULL,
	 rfid INTEGER,
	 qty INTEGER NOT NULL,
	 cardnum CHAR(16) NOT NULL,
	 cardmonth INTEGER NOT NULL, 
	 cardyear INTEGER NOT NULL,
	 order_date DATE,
	 FOREIGN KEY (cid) REFERENCES Customer(cid) ON DELETE CASCADE,
	 FOREIGN KEY (dfid) REFERENCES Flight(fid) ON DELETE CASCADE,
	 FOREIGN KEY (rfid) REFERENCES Flight(fid) ON DELETE CASCADE)

-- The following three SQL queries are used to initialize the database triggers:

-- After a reservation is created, this trigger sets the order date

CREATE TRIGGER reservation_date
	AFTER INSERT ON Reservation
	REFERENCING NEW AS N
	FOR EACH ROW
	MODE DB2SQL
		UPDATE Reservation
		SET order_date = CURRENT DATE
		WHERE ordernum=N.ordernum

-- After an reservation is created, update the number of tickets available for the departure flight

CREATE TRIGGER reservation_davail
	AFTER INSERT ON Reservation
	REFERENCING NEW AS N
	FOR EACH ROW
	MODE DB2SQL
		UPDATE Flight X
		SET available  = ((SELECT available
				   FROM Flight F
				   WHERE F.fid=N.dfid)-N.qty)
		WHERE X.fid=N.dfid

-- After an reservation is created, update the number of tickets available for the return flight

CREATE TRIGGER reservation_ravail
	AFTER INSERT ON Reservation
	REFERENCING NEW AS N
	FOR EACH ROW
	MODE DB2SQL
		UPDATE Flight X
		SET available  = ((SELECT available
				   FROM Flight F
				   WHERE F.fid=N.rfid)-N.qty)
		WHERE X.fid=N.rfid


select * from flights where origin='' and destination='' and start='' and return='' ;