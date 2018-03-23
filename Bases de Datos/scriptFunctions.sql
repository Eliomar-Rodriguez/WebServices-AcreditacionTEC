/*
Comunidad de Aplicaciones Móviles
ITCR 2017
Proyecto AcreditacionTEC desarrollado para la Escuela de Administración de Empresas
Eliomar Rodriguez Arguedas

NOTA: TODOS los procesos almacenados estan validados y en caso de realizar la operación de manera exitosa retorna un bit 1, caso contrario retorna bit 0
*/

USE AcreditacionTEC
GO
/*
============================================================
1.	 PROCEDIMIENTOS TABLA DIMENSIONES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas dimensiones
	- nombreDimension: Nombre a asignar a la nueva dimensión
*/ 
CREATE PROCEDURE dbo.insertDimension -- LISTO
	@nombreDimension	VARCHAR(50),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Dimensiones AS D WHERE D.Dimension = @nombreDimension) = 1) -- si existe 1 igual entonces error
			BEGIN
				SET @success = 0 -- error
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Dimensiones (Dimension)  VALUES (@nombreDimension);
				SET @success = 1 -- exito
				SELECT @success
			END;			
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de dimensiones
	- ID_Dimension: ID de la dimensión a editar
	- nombreDimension: Nuevo nombre a asignar a la dimensión
*/ 
CREATE PROCEDURE dbo.editDimension -- LISTO
	@ID_Dimension		INT,
	@nombreDimension	VARCHAR(50),
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Dimensiones AS D WHERE D.ID = @ID_Dimension) = 1)
			BEGIN
				UPDATE dbo.Dimensiones 
				SET Dimension= @nombreDimension
				WHERE ID = @ID_Dimension;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La dimensión que intenta editar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;		
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una dimensión en especifico 
	- ID_Dimension: ID de la dimensión que se desea eliminar
*/
CREATE PROCEDURE dbo.deleteDimension -- LISTO
	@ID_Dimension		INT,
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Dimensiones AS D WHERE D.ID = @ID_Dimension) = 1)
			BEGIN
				DELETE FROM dbo.Dimensiones WHERE ID = @ID_Dimension;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR ('La dimensión que intentas eliminar no existe.',16,1);
				SET @success = 0
				SELECT @success
			END;		
	END;
GO


/*
============================================================
2.	 PROCEDIMIENTOS TABLA COMPONENTES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos componentes
	- Componente: Nombre del componente a registrar
	- ID_Dimension: ID de la dimensión a la que pertenece el componente
*/
CREATE PROCEDURE dbo.insertComponente -- listo
	@Componente			VARCHAR(50),
	@ID_Dimension		INT,
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.Componente = @Componente AND C.ID_Dimension = @ID_Dimension) = 1)
			BEGIN
				RAISERROR('El componente que intenta registrar ya se encuentra registrado.',16,1);
				SET @success = 0 --error
				SELECT @success
			END;
		ELSE
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Dimensiones AS C WHERE C.ID = @ID_Dimension) = 1)
					BEGIN
						INSERT INTO dbo.Componentes (Componente, ID_Dimension)  VALUES (@Componente, @ID_Dimension);
						SET @success = 1 --exito
						SELECT @success
					END;
				ELSE
					BEGIN
						RAISERROR('La dimension que intenta asociar no se encuentra registrada.',16,1);
						SET @success = 0 --error
						SELECT @success
					END;
			END;
	END;
GO

/*
	Procedimiento almacenado encargado de la edición de componentes
	 - ID_Componente: ID del componente a editar
	 - ID_Dimension: ID de la nueva dimensión a asociar
	 - nombreComponente: Nuevo nombre que se le va a asignar al componente
*/
CREATE PROCEDURE dbo.editComponente -- listo
	@ID_Componente		INT,
	@ID_Dimension		INT,
	@nombreComponente	VARCHAR(50),
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.ID = @ID_Componente) = 1) -- existe el componente a editar
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Dimensiones AS C WHERE C.ID = @ID_Dimension) = 1)
					BEGIN
						UPDATE dbo.Componentes 
						SET Componente= @nombreComponente,
							ID_Dimension = @ID_Dimension
						WHERE ID = @ID_Componente;
						SET @success = 1 --success
						SELECT @success
					END;
				ELSE
					BEGIN
						RAISERROR('La dimension que intenta asociar no se encuentra registrada.',16,1);
						SET @success = 0 --error
						SELECT @success
					END;					
			END;
		ELSE
			BEGIN
				RAISERROR('El componente que intenta editar no se encuentra registrado.',16,1);
				SET @success = 0 --error
				SELECT @success
			END;
	END;
GO

/*
	Procedimiento almacenado encargado de la eliminación de un componente en especifico 
	- ID_Componente: ID del componente a eliminar
*/
CREATE PROCEDURE dbo.deleteComponente -- listo
	@ID_Componente		INT,
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.ID = @ID_Componente) = 1)
			BEGIN
				DELETE FROM dbo.Componentes WHERE ID = @ID_Componente;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El componente que deseas eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO


/*NO IMPORTA
============================================================
3.		PROCEDIMIENTOS TABLA SEDES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas sedes enviando el nombre
*/
CREATE PROCEDURE dbo.insertSede --listo
	@nombreSede		VARCHAR(50),
	@success		BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.Sede = @nombreSede) = 1)
			BEGIN
				RAISERROR('La sede que deseas insertar ya se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Sedes(Sede)  VALUES (@nombreSede);
				SET @success = 1
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de componentes y recibe por parámetro el ID del componente a 
	editar, el ID de la nueva dimensión y el nuevo nombre que se le va a asignar
*/
CREATE PROCEDURE dbo.editSede -- listo
	@ID_Sede		INT,
	@nombreSede		VARCHAR(50),
	@success		BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.ID = @ID_Sede) = 1)
			BEGIN
				UPDATE dbo.Sedes 
				SET Sede= @nombreSede
				WHERE ID = @ID_Sede;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La sede que intentas editar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una sede en especifico enviando por parámetro el ID de la sede a eliminar
*/
CREATE PROCEDURE dbo.deleteSede --listo
	@ID_Sede		INT,
	@success		BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.ID = @ID_Sede) = 1)
			BEGIN
				DELETE FROM dbo.Sedes WHERE ID = @ID_Sede;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La sede que intentas eliminar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO


/*NO IMPORTA
============================================================
4.		PROCEDIMIENTOS TABLA CARRERAS (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas sedes enviando el nombre y la sede a la que pertenece
*/
CREATE PROCEDURE dbo.insertCarrera -- listo
	@nombreCarrera		VARCHAR(50),
	@ID_Sede			INT,
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.ID = @ID_Sede) = 1) -- existe la sede a asociar
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.Carrera = @nombreCarrera) = 0) -- verifica que no exista la carrera para insertarla
					BEGIN
						INSERT INTO dbo.Carreras(ID_Sede, Carrera)  VALUES (@ID_Sede, @nombreCarrera);
						SET @success = 1
						SELECT @success
					END;
				ELSE
					BEGIN
						RAISERROR('La carrera que desea insertar ya se encuentra registrada.',16,1);	
						SET @success = 0
						SELECT @success
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('La sede que desea asociar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;			
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de carreras y recibe por parámetro el ID de la carrera a 
	editar, el ID de la nueva sede y el nuevo nombre que se le va a asignar
*/
CREATE PROCEDURE dbo.editCarrera -- listo
	@ID_Carrera		INT,
	@nombreCarrera	VARCHAR(50),
	@ID_Sede		INT,
	@success		BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.ID = @ID_Carrera) = 1) -- verifica que exista la carrera que se desea editar
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Sedes AS S WHERE S.ID = @ID_Sede) = 1) -- verifica que la sede exista
					BEGIN
						UPDATE dbo.Carreras 
						SET ID_Sede = @ID_Sede,
							Carrera = @nombreCarrera
						WHERE ID = @ID_Carrera;
						SET @success = 1
						SELECT @success
					END;
				ELSE
					BEGIN
						RAISERROR('La sede que intenta asociar no se encuentra registrada.',16,1);
						SET @success = 0
						SELECT @success
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('La carrera que intenta editar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una carrera en especifico enviando por parámetro el ID de la carrera que se desea eliminar
*/
CREATE PROCEDURE dbo.deleteCarrera -- listo
	@ID_Carrera		INT,
	@success		BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.ID = @ID_Carrera) = 1)
			BEGIN
				DELETE FROM dbo.Carreras WHERE ID = @ID_Carrera;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La carrera que intenta eliminar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO


/*
============================================================
5.		PROCEDIMIENTOS TABLA CYE (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos CYE
	- ID_Componente: ID del componente que tiene relacionado
	- ID_Carrera: ID de la carrera a la que se asignó 
	- Criterio: Criterio impuesto por SINAES que debe ser cumplido
*/
CREATE PROCEDURE dbo.insertCYE -- listo
	@ID_Componente		INT,
	@ID_Carrera			INT,
	@Criterio			VARCHAR(300),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.Criterio = @Criterio) = 0) -- verifica que el CYE no exista
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.ID = @ID_Componente) = 1) -- verifica que exista el componente
					BEGIN
						IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.ID = @ID_Carrera) = 1) -- verifica que exista la carrera
							BEGIN
								INSERT INTO dbo.CYE(ID_Componente, ID_Carrera, Criterio)  VALUES (@ID_Componente, @ID_Carrera, @Criterio);
								SET @success = 1
								SELECT @success
							END;
						ELSE
							BEGIN
								RAISERROR('La carrera que intenta asociar no se encuentra registrada.',16,1);
								SET @success = 0
								SELECT @success
							END;
					END;
				ELSE
					BEGIN
						RAISERROR('El componente que intenta asociar no se encuentra registrado.',16,1);
						SET @success = 0
						SELECT @success
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('El CYE que intenta insertar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de CYE
	- ID_CYE: ID del CYE a editar
	- ID_Componente: ID del componente a asociar
	- ID_Carrera: ID de la carrera a asignar
	- Criterio: Nuevo nombre que se le va a asignar al criterio
*/
CREATE PROCEDURE dbo.editCYE -- listo
	@ID_CYE				INT,
	@ID_Componente		INT,
	@ID_Carrera			INT,
	@Criterio			VARCHAR(300),
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.ID = @ID_CYE) = 1) -- verifica que el CYE exista
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Componentes AS C WHERE C.ID = @ID_Componente) = 1) -- verifica que el componente exista
					BEGIN
						IF ((SELECT COUNT(*) FROM dbo.Carreras AS C WHERE C.ID = @ID_Carrera) = 1) -- verifica que la carrera exista
							BEGIN
								UPDATE dbo.CYE 
								SET ID_Componente = @ID_Componente,
									ID_Carrera = @ID_Carrera,
									Criterio = @Criterio
								WHERE ID = @ID_CYE;
								SET @success = 1
								SELECT @success
							END;
						ELSE
							BEGIN
								RAISERROR('La carrera que intenta asociar no se encuentra registrada.',16,1);
								SET @success = 0
								SELECT @success
							END;
					END;
				ELSE
					BEGIN
						RAISERROR('El componente que intenta asociar no se encuentra registrado.',16,1);
						SET @success = 0
						SELECT @success
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('El CYE que intenta editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de un CYE en especifico
	- ID_CYE: ID del criterio que se desea eliminar
*/
CREATE PROCEDURE dbo.deleteCYE -- listo
	@ID_CYE			INT,
	@success		BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.ID = @ID_CYE) = 1) -- verifica que el CYE exista
			BEGIN
				DELETE FROM dbo.CYE WHERE ID = @ID_CYE;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR ('El CYE que intenta eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO


/*
======================================================================
6.	PROCEDIMIENTOS TABLA AUTOEVALUACIONES ANUALES (con validaciones)
======================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas Autoevaluaciones Anuales
	- ID_Encargado: ID del encargado de dicha autoevaluación
	- Anio: Año en el que se realizará la autoevaluación
	- Nombre: Nombre descriptivo para diferenciar entre autoevaluaciones
*/
CREATE PROCEDURE dbo.insertAutoevaluacionAnual --listo
	@ID_Encargado		INT,
	@Anio				INT,
	@Nombre				VARCHAR(200),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.AutoevaluacionesAnuales AS A WHERE A.Anio = @Anio AND A.ID_Encargado = @ID_Encargado AND A.Nombre = @Nombre) > 0)
			BEGIN
				RAISERROR ('La autoevalución que desea insertar ya se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.AutoevaluacionesAnuales(ID_Encargado, Anio, Nombre)  VALUES (@ID_Encargado, @Anio, @Nombre);
				SET @success = 1
				SELECT @success
			END;
	END;    
GO
/*
	Procedimiento almacenado encargado de la edición de Autoevaluaciones Anuales
	- ID_AutoevalAnual: ID de la Autoevaluación a editar
	- ID_Encargado: ID del nuevo encargado de aplicar dicha autoevaluación
	- Anio: Nuevo año en el que se va a aplicar la autoevaluación
	- Nombre: Nuevo nombre que se le asignará a la autoevaluación
*/
CREATE PROCEDURE dbo.editAutoevaluacionAnual -- listo
	@ID_AutoevalAnual		INT,
	@ID_Encargado			INT,
	@Anio					INT,
	@Nombre					VARCHAR(200),
	@success				BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.AutoevaluacionesAnuales AS A WHERE A.ID = @ID_AutoevalAnual) = 1) -- existe esa autoevaluacion
			BEGIN
				UPDATE dbo.AutoevaluacionesAnuales 
				SET ID_Encargado = @ID_Encargado,
					Anio = @Anio,
					Nombre = @Nombre
				WHERE ID = @ID_AutoevalAnual;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La autoevaluación indicada no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de una Autoevaluación Anual en específico 
	- ID_AutoevalAnual: ID de la Autoevaluación que se desea eliminar
*/
CREATE PROCEDURE dbo.deleteAutoevaluacionAnual -- listo
	@ID_AutoevalAnual		INT,
	@success				BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.AutoevaluacionesAnuales AS A WHERE A.ID = @ID_AutoevalAnual) = 1)
			BEGIN
				DELETE FROM dbo.AutoevaluacionesAnuales WHERE ID = @ID_AutoevalAnual;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La autoevaluación indicada no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO


/*
============================================================
7.	PROCEDIMIENTOS TABLA NIVELESIAE (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos Niveles de avance IAE 
	- Nivel: Nombre del nivel de avance IAE
*/
CREATE PROCEDURE dbo.insertNivelIAE -- listo
	@Nivel		VARCHAR(50),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.NivelIAE = @Nivel) = 1) -- existe nivel
			BEGIN
				RAISERROR('El nivel IAE que desea agregar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.NivelesIAE(NivelIAE)  VALUES (@Nivel);
				SET @success = 1
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de Niveles de avance IAE 
	- ID_Nivel: ID del nivel IAE a editar
	- Nivel: Nuevo nombre del nivel IAE
*/
CREATE PROCEDURE dbo.editNivelIAE -- listo
	@ID_Nivel		INT,
	@Nivel			VARCHAR(50),
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.ID = @ID_Nivel) = 1) -- existe nivel
			BEGIN
				UPDATE dbo.NivelesIAE 
				SET NivelIAE = @Nivel
				WHERE ID = @ID_Nivel;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El nivel IAE que desea editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de un nivel de avance IAE en específico 
	- ID_Nivel: ID del nivel a eliminar
*/
CREATE PROCEDURE dbo.deleteNivelIAE -- listo
	@ID_Nivel		INT,
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.ID = @ID_Nivel) = 1) -- existe nivel
			BEGIN
				DELETE FROM dbo.NivelesIAE WHERE ID = @ID_Nivel;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El nivel IAE que desea eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO


/*
============================================================
8.	PROCEDIMIENTOS TABLA VALORACIONES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas valoraciones
	- Valoracion: Nombre de la valoración
*/
CREATE PROCEDURE dbo.insertValoracion -- listo
	@Valoracion		VARCHAR(50),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.Valoracion = @Valoracion) = 1) -- existe valoracion
			BEGIN
				RAISERROR('La valoración que desea insertar ya se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Valoraciones(Valoracion)  VALUES (@Valoracion);
				SET @success = 1
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de una valoración
	- ID_Valoracion:  ID de la valoracion a editar
	- Valoracion: Nombre de la valoración
*/
CREATE PROCEDURE dbo.editValoracion -- listo
	@ID_Valoracion		INT,
	@Valoracion			VARCHAR(50),
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.ID = @ID_Valoracion) = 1) -- existe valoracion
			BEGIN
				UPDATE dbo.Valoraciones 
				SET Valoracion = @Valoracion
				WHERE ID = @ID_Valoracion;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La valoración que desea editar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de una valoración en específico
	- ID_valoracion: ID de la valoración a eliminar
*/
CREATE PROCEDURE dbo.deleteValoracion -- listo
	@ID_Valoracion		INT,
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.ID = @ID_Valoracion) = 1) -- existe valoracion
			BEGIN
				DELETE FROM dbo.Valoraciones WHERE ID = @ID_Valoracion;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La valoración que desea eliminar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO


/*
=======================================================================
9.	PROCEDIMIENTOS TABLA CUMPLIMIENTOS NOMINALES (con validaciones)
=======================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas fechas de cumplimiento nominal
	- FechaCumplimiento: Fecha en la que debe estar cumplido el criterio
*/
CREATE PROCEDURE dbo.insertCumplimientoNominal -- listo
	@FechaCumplimiento		DATE,
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales AS CN WHERE CN.FechaCumplimiento = @FechaCumplimiento) = 1) -- existe ya un CumplNomin
			BEGIN
				RAISERROR('El cumplimiento nominal que desea insertar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN				
				INSERT INTO dbo.CumplimientosNominales(FechaCumplimiento) VALUES (@FechaCumplimiento);
				SET @success = 1
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de un cumplimiento nominal
	- ID_CumpliNominal: ID del cumplimiento nominal a editar
	- FechaCumplimiento: Nueva fecha de dicho cumplimiento
*/
CREATE PROCEDURE dbo.editCumplimientoNominal -- listo
	@ID_CumpliNominal		INT,
	@FechaCumplimiento		DATE,
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales AS CN WHERE CN.ID = @ID_CumpliNominal) = 1) -- existe un CumplNomin
			BEGIN
				UPDATE dbo.CumplimientosNominales 
				SET FechaCumplimiento = @FechaCumplimiento
				WHERE ID = @ID_CumpliNominal;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El cumplimiento nominal que desea editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de un cumplimiento nominal en específico 
	- ID_CumpliNominal: ID del cumplimiento a eliminar
*/
CREATE PROCEDURE dbo.deleteCumplimientoNominal -- listo
	@ID_CumpliNominal		INT,
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales AS CN WHERE CN.ID = @ID_CumpliNominal) = 1) -- existe un CumplNomin
			BEGIN
				DELETE FROM dbo.CumplimientosNominales WHERE ID = @ID_CumpliNominal;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El cumplimiento nominal que desea eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO


/*NO IMPORTA
============================================================
10.	PROCEDIMIENTOS TABLA RESPONSABLES (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos responsables enviando el correo del dicha persona
*/
CREATE PROCEDURE dbo.insertResponsable -- listo
	@Correo		VARCHAR(100),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Responsables AS CN WHERE CN.Correo = @Correo) = 1) -- existe un responsable
			BEGIN
				RAISERROR('El responsable que desea insertar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Responsables(Correo)  VALUES (@Correo);
				SET @success = 1
				SELECT @success
			END;
	END;    
GO


/*
	Procedimiento almacenado encargado de la edición de la informacion de responsables, recibe por parámetro el ID del responsable a editar, 
	y el nuevo correo del responsable
*/
CREATE PROCEDURE dbo.editResponsable -- listo
	@ID_Responsable		INT,
	@Correo				VARCHAR(100),
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Responsables AS CN WHERE CN.ID = @ID_Responsable) = 1) -- existe un responsable
			BEGIN
				UPDATE dbo.Responsables 
				SET Correo = @Correo
				WHERE ID = @ID_Responsable;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El responsable que desea editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de un responsable especifico enviando por parámetro el ID del responsable a eliminar
*/
CREATE PROCEDURE dbo.deleteResponsable -- listo
	@ID_Responsable		INT,
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Responsables AS CN WHERE CN.ID = @ID_Responsable) = 1) -- existe un responsable
			BEGIN
				DELETE FROM dbo.Responsables WHERE ID = @ID_Responsable;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El responsable que desea eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO


/*
============================================================
11.	 PROCEDIMIENTOS TABLA EVIDENCIAS (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas evidencias
	- TipoEvidencia: Tipo de evidencia a insertar
	- URL: Dirección en el servidor de archivos para luego cargarlo
	- Descripcion: Breve descripción para poder diferenciar entre evidencias
*/
CREATE PROCEDURE dbo.insertEvidencia -- listo
	@TipoEvidencia		INT,
	@URL				VARCHAR(350),
	@Descripcion		VARCHAR(200),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Evidencias AS E WHERE E.TipoEvidencia = @TipoEvidencia AND E.URL = @URL) = 1) -- existe una evidencia
			BEGIN
				RAISERROR('La evidencia que desea insertar ya se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Evidencias(TipoEvidencia, URL, Descripcion)  VALUES (@TipoEvidencia, @URL, @Descripcion);
				SET @success = 1
				SELECT @success
			END;
	END;    
GO
/*
	Procedimiento almacenado encargado de la edición de una evidencia
	- ID_Evidencia: ID de la evidencia a editar
	- TipoEvidencia: Nuevo tipo de evidencia
	- URL: Nueva dirección en el servidor
*/
CREATE PROCEDURE dbo.editEvidencia -- listo
	@ID_Evidencia		INT,
	@TipoEvidencia		INT,	
	@Descripcion		VARCHAR(200),
	@URL				VARCHAR(350),
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Evidencias AS E WHERE E.ID = @ID_Evidencia) = 1) -- existe una evidencia
			BEGIN
				UPDATE dbo.Evidencias 
				SET TipoEvidencia = @TipoEvidencia,
					Descripcion = @Descripcion,
					URL = @URL
				WHERE ID = @ID_Evidencia;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN			
				RAISERROR('La evidencia que desea editar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de una evidencia específica
	- ID_Evidencia: ID de la evidencia a eliminar
*/
CREATE PROCEDURE dbo.deleteEvidencia -- LISTO
	@ID_Evidencia		INT,
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Evidencias AS E WHERE E.ID = @ID_Evidencia) = 1) -- existe una evidencia
			BEGIN
				DELETE FROM dbo.Evidencias WHERE ID = @ID_Evidencia;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La evidencia que desea eliminar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO


/*
=================================================================
12.	PROCEDIMIENTOS TABLA ValoracionCriterios (con validaciones)
=================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevas Valoraciones de Criterios
	- ID_CYEA: ID del CYEA a valorar
	- ID_Valoracion: ID de la valoración que se le asignará a la evaluación del criterio ajustado
	- ID_NivelIAE: ID del nivel de avance IAE seleccionado
	- ID_Responsabilidad: ID de responsabilidad encargada de velar porque el criterio se cumpla (administrativa, carrera X, etc)
	- FLOC: Fecha límite original para cumplimiento del criterio
	- FLA: Fecha límite ajustada para cumplimiento del criterio
	- IncorporadoIAE: Si o no en caso de que el criterio esté incorporado en IAE o no
	- Observaciones: En caso de querer especificar con un comentario algo relacionado al cumplimiento del criterio lo puede hacer agregando la observación
*/
CREATE PROCEDURE dbo.insertValoracionCriterios -- LISTO
	@ID_CYEA				INT,
	@ID_Valoracion			INT,
	@ID_NivelIAE			INT,
	@ID_Responsabilidad		INT,
	@FLOC					DATE,
	@FLA					DATE,
	@IncorporadoIAE			INT,
	@Observaciones			VARCHAR(500),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA AS C WHERE C.ID = @ID_CYEA) = 1) -- existe el CYEA
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.ID = @ID_Valoracion) = 1) -- existe la valoracion
					BEGIN
						IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.ID = @ID_NivelIAE) = 1) -- existe el nivel IAE
							BEGIN
								IF ((SELECT COUNT(*) FROM dbo.Responsabilidad AS Resp WHERE Resp.ID = @ID_Responsabilidad) = 1) -- existe la Responsabilidad elegida
									BEGIN
										IF ((SELECT COUNT(*) FROM dbo.ValoracionCriterios AS VC WHERE 
																	VC.ID_CYEA = @ID_CYEA AND
																	VC.ID_Valoracion = @ID_Valoracion AND
																	VC.ID_NivelIAE = @ID_NivelIAE AND
																	VC.ID_Responsabilidad = @ID_Responsabilidad AND
																	VC.FLOC = @FLOC AND
																	VC.FLA = @FLA AND
																	VC.IncorporadoIAE = @IncorporadoIAE AND
																	VC.Observaciones = 	@Observaciones) = 1) -- existe un CYEA
											BEGIN
												RAISERROR('La valoración de criterio que desea agregar ya se encuentra registrada.',16,1);
												SET @success = 0
												SELECT @success
											END
										ELSE
											BEGIN												
												INSERT INTO dbo.ValoracionCriterios(ID_CYEA, ID_Valoracion, ID_NivelIAE,ID_Responsabilidad, FLOC, FLA, IncorporadoIAE, Observaciones)  VALUES 
													(@ID_CYEA, @ID_Valoracion, @ID_NivelIAE, @ID_Responsabilidad, @FLOC, @FLA, @IncorporadoIAE, @Observaciones);
												SET @success = 1
												SELECT @success
											END;
									END;
								ELSE
									BEGIN
										RAISERROR('La Responsabilidad que desea agregar no se encuentra registrada.',16,1);
										SET @success = 0
										SELECT @success
									END;								
							END;
						ELSE
							BEGIN
								RAISERROR('El nivel IAE que desea agregar no se encuentra registrado.',16,1);
								SET @success = 0
								SELECT @success
							END;
					END;
				ELSE
					BEGIN
						RAISERROR('La valoración que desea agregar no se encuentra registrada.',16,1);
						SET @success = 0
						SELECT @success
					END;
			END
		ELSE
			BEGIN
				RAISERROR('El CYEA que desea agregar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de un CYEA
	- ID_ValoracionCriterios: ID de la valoración de criterio a editar
	- ID_CYEA: ID del nuevo criterio ajustado a valorar
	- ID_Valoracion: ID de la nueva valoración que se le asignará a la evaluación del criterio ajustado
	- ID_NivelIAE: ID del nuevo nivel de avance IAE seleccionado
	- ID_Responsabilidad: ID de la nueva responsabilidad encargada de velar porque el criterio se cumpla (administrativa, carrera X, etc)
	- FLOC: Nueva fecha límite original para cumplimiento del criterio
	- FLA: Nueva fecha límite ajustada para cumplimiento del criterio
	- IncorporadoIAE: Si o no en caso de que el criterio esté incorporado en IAE o no
	- Observaciones: En caso de querer especificar con un comentario algo relacionado al cumplimiento del criterio lo puede hacer agregando la observación

*/
CREATE PROCEDURE dbo.editValoracionCriterios -- listo
	@ID_ValoracionCriterios	INT,
	@ID_CYEA				INT,
	@ID_Valoracion			INT,
	@ID_NivelIAE			INT,
	@ID_Responsabilidad		INT,
	@FLOC					DATE,
	@FLA					DATE,
	@IncorporadoIAE			INT,
	@Observaciones			VARCHAR(500),
	@success				BIT		OUTPUT
AS
	BEGIN		
		IF ((SELECT COUNT(*) FROM dbo.ValoracionCriterios AS Va WHERE Va.ID = @ID_ValoracionCriterios) = 1) -- existe el valoracion criterio a editar
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.CYEA AS C WHERE C.ID = @ID_CYEA) = 1) -- existe el CYEA
					BEGIN
						IF ((SELECT COUNT(*) FROM dbo.Valoraciones AS V WHERE V.ID = @ID_Valoracion) = 1) -- existe una valoracion
							BEGIN
								IF ((SELECT COUNT(*) FROM dbo.NivelesIAE AS N WHERE N.ID = @ID_NivelIAE) = 1) -- existe un nivel IAE
									BEGIN
										IF ((SELECT COUNT(*) FROM dbo.Responsabilidad AS Resp WHERE Resp.ID = @ID_Responsabilidad) = 1) -- existe la responsabilidad
											BEGIN
												UPDATE dbo.ValoracionCriterios 
													SET ID_CYEA = @ID_CYEA,
													ID_Valoracion = @ID_Valoracion,
													ID_NivelIAE = @ID_NivelIAE,
													ID_Responsabilidad = @ID_Responsabilidad,
													FLOC = @FLOC,
													FLA = @FLA,
													IncorporadoIAE = @IncorporadoIAE,
													Observaciones = @Observaciones
												WHERE ID = @ID_CYEA;	
												SET @success = 1
												SELECT @success									
											END;
										ELSE
											BEGIN
												RAISERROR('La responsabilidad que desea agregar no se encuentra registrada.',16,1);
												SET @success = 0
												SELECT @success
											END;
									END
								ELSE
									BEGIN
										RAISERROR('El nivel IAE que desea agregar no se encuentra registrado.',16,1);
										SET @success = 0
										SELECT @success
									END;
							END
						ELSE
							BEGIN
								RAISERROR('La valoración que desea agregar no se encuentra registrada.',16,1);
								SET @success = 0
								SELECT @success
							END;
					END
				ELSE
					BEGIN
						RAISERROR('El CYEA que desea agregar no se encuentra registrado.',16,1);
						SET @success = 0
						SELECT @success
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('La valoración criterio que desea agregar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;	
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una valoración de criterio específico 
	- ID_ValoracionCriterio: ID de la Valoración de criterio a eliminar
*/
CREATE PROCEDURE dbo.deleteValoracionCriterios -- listo
	@ID_ValoracionCriterios		INT,
	@success					BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.ValoracionCriterios AS VC WHERE VC.ID = @ID_ValoracionCriterios) = 1) -- existe la valoracion de criterio
			BEGIN
				DELETE FROM dbo.ValoracionCriterios WHERE ID = @ID_ValoracionCriterios;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('La valroación de criterio que desea eliminar no se encuentra registrada.',16,1);
				SET @success = 0
				SELECT @success
			END;	
	END;
GO


/*
===============================================================================
13.	PROCEDIMIENTOS TABLA ValoracionCriterios_RESPONSABLES (con validaciones)
===============================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción datos nuevos en esta tabla intermedia ValoracionCriterios_Responsables
	- ID_ValoracionCriterios: ID de la valoración de criterio que se va a relacionar con el responsable
	- ID_Responsable: ID del responsable de velar que la valoración criterio esté lista
	- TipoResponsabilidad: Tipo de responsabilidad que se tiene en el cumplimiento del criterio, puede ser desde asistente hasta reponsable directo
*/
CREATE PROCEDURE dbo.insertValoracionCriterios_Responsables -- listo
	@ID_ValoracionCriterios			INT,
	@ID_Responsable					INT,
	@TipoResponsabilidad			VARCHAR(250),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.ValoracionCriterios_Responsables AS CR WHERE CR.ID_ValoracionCriterios = @ID_ValoracionCriterios AND CR.ID_Responsable = @ID_Responsable AND CR.TipoResponsabilidad = @TipoResponsabilidad) = 1) -- existe el registro
			BEGIN 
				RAISERROR('El dato que desea insertar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE -- no existe el registro
			BEGIN
				INSERT INTO dbo.ValoracionCriterios_Responsables(ID_ValoracionCriterios, ID_Responsable, TipoResponsabilidad)  VALUES (@ID_ValoracionCriterios, @ID_Responsable, @TipoResponsabilidad);
				SET @success = 1
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de los datos de la tabla intermedia ValoracionCriterios_Responsables
	- ID_ValoracionCriterios_Old: ID de la valoración de criterio que se tenía relacionada con el responsable
	- ID_Responsable_Old: ID del responsable que se tenía relacionado a cumplir con el criterio
	- TipoResponsabilidad_Old: Tipo de responsabilidad que se tenía en el cumplimiento del criterio, puede ser desde asistente hasta reponsable directo

	- ID_ValoracionCriterios: ID de la nueva valoración de criterio que se va a relacionar con el responsable
	- ID_Responsable: ID del nuevo responsable de velar que la valoración criterio esté lista
	- TipoResponsabilidad: Nuevo tipo de responsabilidad que se tiene en el cumplimiento del criterio, puede ser desde asistente hasta reponsable directo

*/
CREATE PROCEDURE dbo.editValoracionCriterios_Responsables -- listo
	@ID_ValoracionCriterios_Old		INT,
	@ID_Responsable_Old				INT,
	@TipoResponsabilidad_Old		VARCHAR(250),

	@ID_ValoracionCriterios			INT,
	@ID_Responsable					INT,
	@TipoResponsabilidad			VARCHAR(250),
	@success					BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.ValoracionCriterios_Responsables AS CR WHERE CR.ID_ValoracionCriterios = @ID_ValoracionCriterios_Old AND CR.ID_Responsable = @ID_Responsable_Old AND CR.TipoResponsabilidad = @TipoResponsabilidad_Old) = 1) -- existe el registro
			BEGIN 
				UPDATE dbo.ValoracionCriterios_Responsables 
				SET ID_ValoracionCriterios = @ID_ValoracionCriterios,
					ID_Responsable = @ID_Responsable,
					TipoResponsabilidad = @TipoResponsabilidad
				WHERE ID_ValoracionCriterios= @ID_ValoracionCriterios_Old AND ID_Responsable = @ID_Responsable_Old AND TipoResponsabilidad = @TipoResponsabilidad_Old;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una relación en la tabla intermedia ValoracionCriterios_Responsables
	- ID_ValoracionCriterios: ID de la Valoración de criterio relacionada con el responsable de cumplir dicho criterio
	- ID_Responsable: Id del responsable
*/
CREATE PROCEDURE dbo.deleteValoracionCriterios_Responsables -- listo
	@ID_ValoracionCriterios		INT,
	@ID_Responsable				INT,
	@TipoResponsabilidad		INT,
	@success					BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.ValoracionCriterios_Responsables AS CR WHERE CR.ID_ValoracionCriterios = @ID_ValoracionCriterios AND CR.ID_Responsable = @ID_Responsable AND CR.TipoResponsabilidad = @TipoResponsabilidad) = 1) -- existe el registro
			BEGIN 
				DELETE FROM dbo.ValoracionCriterios_Responsables WHERE ID_ValoracionCriterios = @ID_ValoracionCriterios AND ID_Responsable = @ID_Responsable AND TipoResponsabilidad = @TipoResponsabilidad;
				SET @success = 1
				SELECT @success
			END;
		ELSE	
			BEGIN
				RAISERROR('El dato que desea eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO


/*
==============================================================================
14.	  PROCEDIMIENTOS TABLA Autoeval_ValoracionCriterios (con validaciones)
==============================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción datos nuevos en esta tabla intermedia entre AutoevaluacionAnual y ValoracionCriterios
	- ID_ValoracionCriterio: ID de la Valoración de un criterio X
	- ID_Autoeval: ID de la autoevaluación a la cual pertenece dicha evaluación de criterio
*/
CREATE PROCEDURE dbo.insertAutoeval_ValoracionCriterios
	@ID_ValoracionCriterio		INT,
	@ID_Autoeval				INT,
	@success					BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Autoeval_ValoracionCriterios AS AV WHERE AV.ID_ValoracionCriterios = @ID_ValoracionCriterio AND AV.ID_Autoeval = @ID_Autoeval) = 1) -- existe el registro
			BEGIN 
				RAISERROR('El dato que desea insertar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN			
				INSERT INTO dbo.Autoeval_ValoracionCriterios(ID_Autoeval, ID_ValoracionCriterios)  VALUES (@ID_Autoeval, @ID_ValoracionCriterio);
				SET @success = 1
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de los datos de la tabla intermedia Autoeval_ValoracionCriterios
	- ID_ValoracionCriterio_Old: ID de la Valoración anterior de un criterio X
	- ID_Autoeval_Old: ID de la autoevaluación anterior a la cual pertenece dicha evaluación de criterio

	- ID_ValoracionCriterio: Nuevo ID de la Valoración de un criterio X
	- ID_Autoeval: Nuevo ID de la autoevaluación a la cual pertenece dicha evaluación de criterio
*/
CREATE PROCEDURE dbo.editAutoeval_ValoracionCriterios -- listo
	@ID_ValoracionCriterio_Old		INT,
	@ID_Autoeval_Old				INT,

	@ID_ValoracionCriterio			INT,
	@ID_Autoeval					INT,
	@success						BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Autoeval_ValoracionCriterios AS AV WHERE AV.ID_ValoracionCriterios = @ID_ValoracionCriterio_Old  AND AV.ID_Autoeval = @ID_Autoeval_Old) = 1) -- existe el registro
			BEGIN
				UPDATE dbo.Autoeval_ValoracionCriterios 
				SET ID_ValoracionCriterios = @ID_ValoracionCriterio,
					ID_Autoeval = @ID_Autoeval
				WHERE ID_ValoracionCriterios = @ID_ValoracionCriterio_Old AND ID_Autoeval = @ID_Autoeval_Old;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO
/*
	Procedimiento almacenado encargado de la eliminación de una relacion en la tabla intermedia Autoeval_ValoracionCriterios
	- ID_ValoracionCriterio: ID de la Valoración de un criterio X
	- ID_Autoeval: ID de la autoevaluación a la cual pertenece dicha evaluación de criterio
*/
CREATE PROCEDURE dbo.deleteAutoeval_ValoracionCriterios -- listo
	@ID_ValoracionCriterio		INT,
	@ID_Autoeval				INT,
	@success					BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Autoeval_ValoracionCriterios AS AV WHERE AV.ID_ValoracionCriterios = @ID_ValoracionCriterio AND AV.ID_Autoeval = @ID_Autoeval) = 1) -- existe el registro
			BEGIN
				DELETE FROM dbo.Autoeval_ValoracionCriterios WHERE ID_ValoracionCriterios = @ID_ValoracionCriterio AND ID_Autoeval = @ID_Autoeval;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO


/*
=========================================================================================
15.	 PROCEDIMIENTOS TABLA CumplimientosNominales_ValoracionCriterios (con validaciones)
=========================================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción datos nuevos en esta tabla intermedia CumplimientosNominales_ValoracionCriterios
	- ID_CumplimNominal: ID de la fecha de cumplimiento nominal del criterio
	- ID_ValoracionCriterio: ID de la valoración que se le asignó al criterio
*/
CREATE PROCEDURE dbo.insertCumplimNominal_ValoracionCriterios -- listo
	@ID_CumplimNominal			INT,
	@ID_ValoracionCriterio		INT,
	@success					BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales_ValoracionCriterios AS CNV WHERE CNV.ID_ValoracionCriterios = @ID_ValoracionCriterio AND CNV.ID_CumplimNominal = @ID_CumplimNominal) = 1) -- existe el registro
			BEGIN
				RAISERROR('El dato que desea insertar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.CumplimientosNominales_ValoracionCriterios(ID_CumplimNominal, ID_ValoracionCriterios)  VALUES (@ID_CumplimNominal, @ID_ValoracionCriterio);
				SET @success = 1
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de los datos de la tabla intermedia CumplimientosNominales_ValoracionCriterios
	- ID_CumplimNominal_Old: ID anterior de la fecha de cumplimiento nominal del criterio
	- ID_ValoracionCriterio_Old: ID anterior de la valoración que se le asignó al criterio

	- ID_CumplimNominal: ID nuevo de la fecha de cumplimiento nominal del criterio
	- ID_ValoracionCriterio: ID nuevo de la valoración que se le asignará al criterio
*/
CREATE PROCEDURE dbo.editCumplimNominal_ValoracionCriterios -- LISTO
	@ID_CumplimNominal_Old			INT,
	@ID_ValoracionCriterio_Old		INT,

	@ID_CumplimNominal				INT,
	@ID_ValoracionCriterio			INT,
	@success						BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales_ValoracionCriterios AS CV WHERE CV.ID_ValoracionCriterios = @ID_ValoracionCriterio_Old AND CV.ID_CumplimNominal = @ID_CumplimNominal_Old) = 1) -- existe el registro
			BEGIN
				UPDATE dbo.CumplimientosNominales_ValoracionCriterios 
				SET ID_CumplimNominal = @ID_CumplimNominal,
					@ID_ValoracionCriterio = @ID_ValoracionCriterio
				WHERE ID_ValoracionCriterios = @ID_ValoracionCriterio_Old AND ID_CumplimNominal = @ID_CumplimNominal_Old;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una relacion en la tabla intermedia CumplimientosNominales_ValoracionCriterios
	- ID_CumplimNominal: ID de la fecha de cumplimiento nominal del criterio a eliminar
	- ID_ValoracionCriterio: ID de la valoración que se le asignará al criterio a eliminar
*/
CREATE PROCEDURE dbo.deleteCumplimNominal_ValoracionCriterios -- LISTO
	@ID_CumplimNominal			INT,
	@ID_ValoracionCriterio		INT,
	@success					BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CumplimientosNominales_ValoracionCriterios AS CN WHERE CN.ID_ValoracionCriterios = @ID_ValoracionCriterio AND CN.ID_CumplimNominal = @ID_CumplimNominal) = 1) -- existe el registro
			BEGIN
				DELETE FROM dbo.CumplimientosNominales_ValoracionCriterios WHERE ID_ValoracionCriterios = @ID_ValoracionCriterio AND ID_CumplimNominal = @ID_CumplimNominal;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
============================================================================
16.	PROCEDIMIENTOS TABLA ValoracionCriterios_Evidencias (con validaciones)
============================================================================
*/
/*
	Procedimiento almacenado encargado de la inserción datos nuevos en esta tabla intermedia ValoracionCriterios_Evidencias
	- ID_ValoracionCriterios: ID de la valoración de criterio a insertar
	- ID_Evidencia: ID de la evidencia a relacionar con el criterio
*/
CREATE PROCEDURE dbo.insertValoracionCriterios_Evidencia -- LISTO
	@ID_ValoracionCriterios			INT,
	@ID_Evidencia					INT,
	@success						BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.ValoracionCriterios_Evidencias AS VE WHERE VE.ID_ValoracionCriterios = @ID_ValoracionCriterios AND VE.ID_Evidencia = @ID_Evidencia) = 1) -- existe el registro
			BEGIN
				RAISERROR('El dato que desea insertar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.ValoracionCriterios_Evidencias(ID_ValoracionCriterios, ID_Evidencia)  VALUES (@ID_ValoracionCriterios, @ID_Evidencia);
				SET @success = 1
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de los datos de la tabla intermedia ValoracionCriterios_Evidencias
	- ID_ValoracionCriterios_Old: ID de la anterior valoración de criterio
	- ID_Evidencia_Old: ID de la anterior evidencia a relacionar con el criterio valorado

	- ID_ValoracionCriterios: ID de la nueva valoración de criterio
	- ID_Evidencia: ID de la nueva evidencia a relacionar con el criterio valorado
*/
CREATE PROCEDURE dbo.editValoracionCriterios_Evidencia
	@ID_ValoracionCriterios_Old		INT,
	@ID_Evidencia_Old	INT,

	@ID_ValoracionCriterios			INT,
	@ID_Evidencia		INT,
	@success			BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.ValoracionCriterios_Evidencias AS VE WHERE VE.ID_ValoracionCriterios = @ID_ValoracionCriterios_Old AND VE.ID_Evidencia = @ID_Evidencia_Old) = 1) -- existe el registro
			BEGIN
				UPDATE dbo.ValoracionCriterios_Evidencias 
				SET ID_ValoracionCriterios = @ID_ValoracionCriterios,
					ID_Evidencia = @ID_Evidencia
				WHERE ID_ValoracionCriterios = @ID_ValoracionCriterios_Old AND ID_Evidencia = @ID_Evidencia_Old;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN	
				RAISERROR('El dato que desea editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de una relacion en la tabla intermedia ValoracionCriterios_Evidencias
	- ID_ValoracionCriterios: ID de la valoración de criterio relacionada a una evidencia que se quiere eliminar
	- ID_Evidencia: ID de la evidencia relacionada con el criterio que se desea eliminar
*/
CREATE PROCEDURE dbo.deleteValoracionCriterios_Evidencia
	@ID_ValoracionCriterios			INT,
	@ID_Evidencia					INT,
	@success						BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.ValoracionCriterios_Evidencias AS VE WHERE VE.ID_ValoracionCriterios = @ID_ValoracionCriterios AND VE.ID_Evidencia = @ID_Evidencia) = 1) -- existe el registro
			BEGIN
				DELETE FROM dbo.ValoracionCriterios_Evidencias WHERE ID_ValoracionCriterios = @ID_ValoracionCriterios AND ID_Evidencia = @ID_Evidencia;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO

/*
===============================================================
17.	PROCEDIMIENTOS TABLA Responsabilidad (con validaciones)
===============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción datos nuevos en esta tabla Responsabilidad
	- Responsabilidad: Tipo de responsabilidad que se tiene sobre el cumplimiento de un criterio específico
*/
CREATE PROCEDURE dbo.insertResponsabilidad -- LISTO
	@Responsabilidad	VARCHAR(50),
	@success			BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Responsabilidad AS Resp WHERE Resp.Responsabilidad = @Responsabilidad) = 1) -- existe el registro
			BEGIN
				RAISERROR('El dato que desea insertar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
		ELSE
			BEGIN
				INSERT INTO dbo.Responsabilidad(Responsabilidad)  VALUES (@Responsabilidad);
				SET @success = 1
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de los datos de la tabla Responsabilidad
	- ID_Responsabilidad: ID de la responsabilidad a editar
	- Responsabilidad: Nueva descripción de la responsabilidad
*/
CREATE PROCEDURE dbo.editResponsabilidad
	@ID_Responsabilidad			INT,
	@Responsabilidad			VARCHAR(50),
	@success					BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Responsabilidad AS Resp WHERE Resp.ID = @ID_Responsabilidad) = 1) -- existe el registro
			BEGIN
				UPDATE dbo.Responsabilidad 
				SET Responsabilidad = @Responsabilidad
				WHERE ID = @ID_Responsabilidad;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN	
				RAISERROR('El dato que desea editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación en la tabla Responsabilidad
	- ID_Responsabilidad: ID de la responsabilidad a eliminar
*/
CREATE PROCEDURE dbo.deleteResponsabilidad
	@ID_Responsabilidad			INT,
	@success					BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.Responsabilidad AS Resp WHERE Resp.ID = @ID_Responsabilidad) = 1) -- existe el registro
			BEGIN
				DELETE FROM dbo.Responsabilidad WHERE ID = @ID_Responsabilidad;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR('El dato que desea eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO

/*
============================================================
18.		PROCEDIMIENTOS TABLA CYEA (con validaciones)
============================================================
*/
/*
	Procedimiento almacenado encargado de la inserción de nuevos CYEA
	- ID_CYE: ID del CYE que tiene relacionado 
	- CriterioAjustado: Criterio impuesto por SINAES ajustado a una sede y a una carrera en específico
*/
CREATE PROCEDURE dbo.insertCYEA -- listo
	@ID_CYE					INT,
	@CriterioAjustado		VARCHAR(350),
	@success				BIT		OUTPUT
AS 
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA AS C WHERE C.CriterioAjustado = @CriterioAjustado) = 0) -- verifica que el CYEA no exista
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.ID = @ID_CYE) = 1) -- verifica que exista el CYE
					BEGIN
						INSERT INTO dbo.CYEA(ID_CYE, CriterioAjustado)  VALUES (@ID_CYE, @CriterioAjustado);
						SET @success = 1
						SELECT @success
					END;
				ELSE
					BEGIN
						RAISERROR('El CYE que intenta asociar no se encuentra registrado.',16,1);
						SET @success = 0
						SELECT @success
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('El CYEA que intenta insertar ya se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la edición de CYEA
	- ID_CYEA: ID del CYEA a editar
	- ID_CYE: ID del CYE que tiene relacionado 
	- CriterioAjustado: Nuevo criterio impuesto por SINAES pero ajustado a una sede y a una carrera en específico
*/
CREATE PROCEDURE dbo.editCYEA -- listo
	@ID_CYEA				INT,
	@ID_CYE					INT,
	@CriterioAjustado		VARCHAR(300),
	@success				BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA AS C WHERE C.ID = @ID_CYEA) = 1) -- verifica que el CYEA exista
			BEGIN
				IF ((SELECT COUNT(*) FROM dbo.CYE AS C WHERE C.ID = @ID_CYE) = 1) -- verifica que el CYE exista
					BEGIN
						UPDATE dbo.CYEA
						SET ID_CYE = @ID_CYE,
							CriterioAjustado = @CriterioAjustado
						WHERE ID = @ID_CYEA;
						SET @success = 1
						SELECT @success
					END;
				ELSE
					BEGIN
						RAISERROR('El CYE que intenta asociar no se encuentra registrado.',16,1);
						SET @success = 0
						SELECT @success
					END;
			END;
		ELSE
			BEGIN
				RAISERROR('El CYEA que intenta editar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;
GO
/*
	Procedimiento almacenado encargado de la eliminación de un CYEA en específico
	- ID_CYEA: ID del criterio que se desea eliminar
*/
CREATE PROCEDURE dbo.deleteCYEA -- listo
	@ID_CYEA			INT,
	@success		BIT		OUTPUT
AS
	BEGIN
		IF ((SELECT COUNT(*) FROM dbo.CYEA AS C WHERE C.ID = @ID_CYEA) = 1) -- verifica que el CYEA exista
			BEGIN
				DELETE FROM dbo.CYE WHERE ID = @ID_CYEA;
				SET @success = 1
				SELECT @success
			END;
		ELSE
			BEGIN
				RAISERROR ('El CYEA que intenta eliminar no se encuentra registrado.',16,1);
				SET @success = 0
				SELECT @success
			END;
	END;	
GO
