/*
	Datos de prueba para validaciones
*/

SELECT * FROM Sedes
INSERT INTO Sedes (Sede) VALUES ('San Carlos'),('Alajuela'),('Limon'),('Cartago');

SELECT * FROM Carreras
INSERT INTO Carreras (ID_Sede,Carrera) VALUES 
											(1,'Turismo Rural Sostenible'), (2, 'Ingenieria en Computacion'),(2, 'Ingenieria en Electronica'),
											(2, 'Administracion de Empresas'),(4, 'Ingenieria en Electronica'),(4, 'Ingenieria en Computacion'),
											(1,'Ingenieria en Computacion'),(1,'Ingenieria en Electronica'),(1,'Agronomia'),(1,'Administracion de Empresas');

SELECT * FROM CYE
INSERT INTO CYE (ID_Componente,ID_Carrera,Criterio) VALUES (4,9,'CYE3');

SELECT * FROM Componentes

SELECT * FROM CYEA
INSERT INTO CYEA (ID_CYE,CriterioAjustado) VALUES (1,'CYEA1'),(2,'CYEA2'),(3,'CYEA3');

SELECT * FROM Responsables
INSERT INTO Responsables (Correo) VALUES ('rodriguez.elio.97@gmail.com');

SELECT * FROM Valoraciones
INSERT INTO Valoraciones(Valoracion) VALUES ('Excelente'),('Bueno'),('Aceptable'),('Deficiente'),('Mal');

SELECT * FROM NivelesIAE
INSERT INTO NivelesIAE(NivelIAE) VALUES ('Excelente'),('Bueno'),('Aceptable'),('Deficiente'),('Mal');

SELECT * FROM Responsabilidad
INSERT INTO Responsabilidad(Responsabilidad) VALUES ('Administrativa'),('Recursos humanos'),('Agronomia'),('Computacion'),('Comedor');


SELECT * FROM ValoracionCriterios
INSERT INTO ValoracionCriterios (ID_CYEA,ID_Valoracion,ID_Responsabilidad,FLOC,FLA,IncorporadoIAE,Observaciones) VALUES (1,4,3,4,'2018/4/20','2018/4/29',0,'Bien compas');
