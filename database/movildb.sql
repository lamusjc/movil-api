
CREATE TABLE users (
                users_id INT AUTO_INCREMENT NOT NULL,
                users_firstname VARCHAR(50) NOT NULL,
                users_lastname VARCHAR(50) NOT NULL,
                users_username VARCHAR(50) NOT NULL,
                users_password VARCHAR(50) NOT NULL,
                PRIMARY KEY (users_id)
);


CREATE TABLE note (
                note_id INT AUTO_INCREMENT NOT NULL,
                users_id INT NOT NULL,
                note_title VARCHAR(100) NOT NULL,
                note_description VARCHAR(500) NOT NULL,
                note_date_created DATETIME NOT NULL,
                note_position INT NOT NULL,
                note_favorite BOOLEAN NOT NULL,
                note_file LONGBLOB,
                PRIMARY KEY (note_id)
);


ALTER TABLE note ADD CONSTRAINT users_note_fk
FOREIGN KEY (users_id)
REFERENCES users (users_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;