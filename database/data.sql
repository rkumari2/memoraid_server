DROP TABLE IF EXISTS flashcards;
DROP TABLE IF EXISTS subjects; 
DROP TABLE IF EXISTS tokens; 
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE tokens (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token VARCHAR(50) UNIQUE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE subjects (
    id INT GENERATED ALWAYS AS IDENTITY, 
    user_id INT NOT NULL, 
    subject VARCHAR(1000) NOT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE flashcards (
    id INT GENERATED ALWAYS AS IDENTITY, 
    -- user_id INT NOT NULL, 
    subject_id INT NOT NULL, 
    question VARCHAR(1000) NOT NULL, 
    answer VARCHAR(1000) NOT NULL,
    PRIMARY KEY (id),
    -- FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

CREATE TABLE scores (
    id INT GENERATED ALWAYS AS IDENTITY, 
    user_id INT NOT NULL,
    date VARCHAR (12) NOT NULL, 
    totalScore DECIMAL(5, 1) NOT NULL,
    rightAnswer INT NOT NULL, 
    totalQuestions INT NOT NULL, 
    subject VARCHAR (1000) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


