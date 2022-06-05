CREATE DATABASE Individual;
USE Individual;

CREATE TABLE tbUser(
	_idUser INT PRIMARY KEY AUTO_INCREMENT,
    nameUser VARCHAR(60) NOT NULL,
    emailUser VARCHAR(60) NOT NULL,
	passwordUser VARBINARY (150) NOT NULL, -- for hash blob
    genderUser CHAR(1) CHECK (genderUser in ('M', 'F')),
    ageUser TINYINT NOT NULL,
    rememberUser CHAR(1) CHECK (genderUser in ('M', 'F')),
    CONSTRAINT ct_checkAge CHECK (ageUser > 0 AND ageUser  < 100), -- age between 0 and 100
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
) AUTO_INCREMENT = 100;

CREATE TABLE tbClip(
	_idClip INT PRIMARY KEY AUTO_INCREMENT,
    titleClip VARCHAR(50) NOT NULL,
    descriptionClip VARCHAR(150) NOT NULL,
    thumbnailClip VARCHAR(120) NOT NULL,
    urlClip VARCHAR(120) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
) AUTO_INCREMENT = 200;

CREATE TABLE tbComment(
	_idComment INT AUTO_INCREMENT,
    comment VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkUser INT NOT NULL,
    CONSTRAINT ct_fkUser FOREIGN KEY (fkUser) REFERENCES tbUser(_idUser),
	CONSTRAINT ct_pkComment PRIMARY KEY(_idComment, fkUser)
)AUTO_INCREMENT = 300;

CREATE TABLE tbClipFavorite(
	_idClipFavorite INT,
    fkUser INT,
    fkClip INT,
    CONSTRAINT ct_fkUserClipFavorite FOREIGN KEY(fkUser) REFERENCES tbUser(_idUser),
    CONSTRAINT ct_fkClipFavoriteClip FOREIGN KEY(fkClip) REFERENCES tbClip(_idClip),
    CONSTRAINT ct_pkClipFavorite PRIMARY KEY (_idClipFavorite, fkUser, fkClip),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
) AUTO_INCREMENT = 400;
