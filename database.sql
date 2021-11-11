CREATE DATABASE kittenbook;
USE kittenbook;

CREATE TABLE usuarios (
    nombre_usuario VARCHAR(255),
	nombre VARCHAR(255),
	apelllido VARCHAR(255),
	hash_password VARCHAR(255) NOT NULL,
	PRIMARY KEY (nombre_usuario)
);

CREATE TABLE notas (
    id_nota INT AUTO_INCREMENT,
	nombre_usuario VARCHAR(255) NOT NULL,
	titulo VARCHAR(255),
	contenido LONGTEXT,
	PRIMARY KEY (id_nota),
	FOREIGN KEY (nombre_usuario) REFERENCES usuarios(nombre_usuario)
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
    id_curso INT AUTO_INCREMENT,
	nombre_usuario VARCHAR(255) NOT NULL,
	clave_materia CHAR(8) NOT NULL,
	estado VARCHAR(255),
	semestre_cursada TINYINT(255),
	calificacion TINYINT(100),
	periodo_cursada VARCHAR(255),
	PRIMARY KEY (id_curso),
	FOREIGN KEY (nombre_usuario) REFERENCES usuarios(nombre_usuario),
	FOREIGN KEY (clave_materia) REFERENCES materias(clave_materia)
);

CREATE TABLE horario (
    id_clase INT AUTO_INCREMENT,
	nombre_usuario VARCHAR(255) NOT NULL,
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
	PRIMARY KEY (id_clase),
	FOREIGN KEY (clave_materia) REFERENCES materias(clave_materia),
    FOREIGN KEY (nombre_usuario) REFERENCES usuarios(nombre_usuario)
);

CREATE TABLE tareas (
    id_tarea INT AUTO_INCREMENT,
	nombre_usuario VARCHAR(255) NOT NULL,
	clave_materia CHAR(8) NOT NULL,
	tiempo_creacion TIMESTAMP,
	tiempo_inicio TIMESTAMP,
	tiempo_finalizacion TIMESTAMP,
	titulo VARCHAR(255),
	descripcion LONGTEXT,
	estado VARCHAR(255),
	PRIMARY KEY (id_tarea),
	FOREIGN KEY (nombre_usuario) REFERENCES usuarios(nombre_usuario),
	FOREIGN KEY (clave_materia) REFERENCES horario(clave_materia)
);

SHOW TABLES;