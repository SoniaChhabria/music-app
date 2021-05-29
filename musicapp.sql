CREATE TABLE Album (
	albumId INTEGER PRIMARY KEY AUTOINCREMENT
	,albumName VARCHAR(50)
	);

INSERT INTO Album (albumName)
VALUES ('Memories')
	,('See You Again')
	,('On My Way')
	,('Deluxe')
	,('Sugar & Brownies')
	,('Princesses Don''t Cry');


CREATE TABLE Song (
	songId INTEGER PRIMARY KEY AUTOINCREMENT
	,albumId INTEGER NOT NULL
	,songName VARCHAR(500)
	,duration FLOAT
	,audioURL VARCHAR(1000)
	,artistName VARCHAR(1000)
	,FOREIGN KEY (albumId) REFERENCES Album(albumId)
	);

INSERT INTO Song (
	albumId
	,songName
	,duration
	,audioURL
	,artistName
	)
VALUES (
	1
	,'Memories'
	,3.09
	,'https://www.wonderplugin.com/wp-content/uploads/2014/03/In-the-Moment-of-Inspiration.mp3'
	,'Maroon 5'
	)
	,(
	2
	,'See You Again'
	,3.50
	,'https://www.wonderplugin.com/wp-content/uploads/2014/03/In-the-Moment-of-Inspiration.mp3'
	,'Wiz Khalifa, Charlie Puth'
	)
	,(
	3
	,'On My Way'
	,3.14
	,'https://www.wonderplugin.com/wp-content/uploads/2014/03/In-the-Moment-of-Inspiration.mp3'
	,'Alan Walker, Sabrina Carpenter, Farruko'
	)
	,(
	4
	,'Perfect'
	,4.23
	,'https://www.wonderplugin.com/wp-content/uploads/2014/03/In-the-Moment-of-Inspiration.mp3'
	,'Ed Sheeran'
	)
	,(
	5
	,'Sugar & Brownies'
	,3.18
	,'https://www.wonderplugin.com/wp-content/uploads/2014/03/In-the-Moment-of-Inspiration.mp3'
	,'Dharia'
	)
	,(
	6
	,'Princesses Don''t Cry'
	,3.32
	,'https://www.wonderplugin.com/wp-content/uploads/2014/03/In-the-Moment-of-Inspiration.mp3'
	,'Carys'
	);


CREATE TABLE Playlist (
	userEmail VARCHAR(100) NOT NULL
	,playlistId INTEGER NOT NULL
	,playListName VARCHAR(500)
	,createdDate DATE
	,PRIMARY KEY (
		userEmail
		,playlistId
		)
	);

CREATE TABLE PlaylistSongMapping (
	userEmail VARCHAR(100) NOT NULL
	,playlistId INTEGER NOT NULL
	,songId INTEGER NOT NULL
	,createdDate DATE
	,FOREIGN KEY (songId) REFERENCES Song(songId)
	,FOREIGN KEY (
		userEmail
		,playlistId
		) REFERENCES Playlist(userEmail, playlistId)
	);
