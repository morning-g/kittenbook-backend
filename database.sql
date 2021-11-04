CREATE DATABASE kittenbook;
USE kittenbook;

CREATE TABLE usuarios (
	nombre VARCHAR(255),
	apelllido VARCHAR(255),
	correo_electronico VARCHAR(255),
	hash_password CHAR(64) NOT NULL,
	PRIMARY KEY (correo_electronico)
);

CREATE TABLE notas (
	correo_electronico_usuario VARCHAR(255) NOT NULL,
	id_nota INT AUTO_INCREMENT,
	titulo VARCHAR(255),
	contenido LONGTEXT,
	PRIMARY KEY (id_nota),
	FOREIGN KEY (correo_electronico_usuario) REFERENCES usuarios(correo_electronico)
);

CREATE TABLE materias (
	clave_materia CHAR(8),
	nombre_materia VARCHAR(255),
	es_materia_especializada BOOL,
	especialidad VARCHAR(255),
	creditos_materia TINYINT(10),
	carrera_materia VARCHAR(255),
	PRIMARY KEY (clave_materia)
);

CREATE TABLE historial (
	correo_electronico_usuario VARCHAR(255) NOT NULL,
	id_curso INT AUTO_INCREMENT,
	clave_materia CHAR(8) NOT NULL,
	estado VARCHAR(255),
	semestre_cursada TINYINT(255),
	calificacion TINYINT(100),
	periodo_cursada VARCHAR(255),
	PRIMARY KEY (id_curso),
	FOREIGN KEY (correo_electronico_usuario) REFERENCES usuarios(correo_electronico),
	FOREIGN KEY (clave_materia) REFERENCES materias(clave_materia)
);

CREATE TABLE horario (
	correo_electronico_usuario VARCHAR(255) NOT NULL,
	clave_materia CHAR(8),
	grupo VARCHAR(10),
	docente VARCHAR(255),
	aula VARCHAR(255),
	hora_inicio TIME,
	hora_termino TIME,
	lunes BOOL,
	martes BOOL,
	miercoles BOOL,
	jueves BOOL,
	viernes BOOL,
	PRIMARY KEY (clave_materia),
	FOREIGN KEY (clave_materia) REFERENCES materias(clave_materia)
);

CREATE TABLE lista_tareas (
	correo_electronico_usuario VARCHAR(255) NOT NULL,
	id_tarea INT AUTO_INCREMENT,
	tiempo_creacion TIMESTAMP NOT NULL,
	tiempo_inicio TIMESTAMP,
	tiempo_finalizacion TIMESTAMP,
	titulo VARCHAR(255) NOT NULL,
	descripcion LONGTEXT,
	estado VARCHAR(255) NOT NULL,
	clave_materia VARCHAR(255),
	PRIMARY KEY (id_tarea),
	FOREIGN KEY (correo_electronico_usuario) REFERENCES usuarios(correo_electronico),
	FOREIGN KEY (clave_materia) REFERENCES horario(clave_materia)
);

SHOW TABLES;