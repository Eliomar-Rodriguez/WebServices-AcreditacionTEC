/*
Tabla dimensiones, contiene las dimensiones las cuales son parte de los componentes
*/
USE AcreditacionTEC;
GO
CREATE TABLE Dimensiones(
	ID				INT	IDENTITY(1,1)	NOT NULL,
	Dimension		VARCHAR(50)			NOT NULL	UNIQUE,
	CONSTRAINT PK_Dimensiones_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla componentes, contiene los componentes que son parte de un criterio a la hora de su evaluación
*/
USE AcreditacionTEC;
GO
CREATE TABLE Componentes(
	ID				INT	IDENTITY(1,1)	NOT NULL,
	ID_Dimension	INT					NOT NULL,
	Componente		VARCHAR(50)			NOT NULL UNIQUE,
	CONSTRAINT PK_Componentes_ID		PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_Componentes_ID_Dimension	FOREIGN KEY (ID_Dimension) 
		REFERENCES	dbo.Dimensiones (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla sedes, contiene todas las sedes del Tecnológico
*/
USE AcreditacionTEC;
GO
CREATE TABLE Sedes(
	ID		INT	IDENTITY(1,1)		NOT NULL,
	Sede	VARCHAR(50)				NOT NULL	UNIQUE,
	CONSTRAINT PK_Sedes_ID			PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla carreras, contiene todas las carreras del TEC en general
*/
USE AcreditacionTEC;
GO
CREATE TABLE Carreras(
	ID			INT	IDENTITY(1,1)	NOT NULL,
	ID_Sede		INT					NOT NULL,
	Carrera		VARCHAR(50)			NOT NULL	UNIQUE,
	CONSTRAINT PK_Carreras_ID		PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_Carreras_ID_Sede	FOREIGN KEY (ID_Sede) 
		REFERENCES	dbo.Sedes (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla CYE, contiene los criterios y estandares propuestos/inpuestos por SINAES
*/
USE AcreditacionTEC;
GO
CREATE TABLE CYE(
	ID				INT	IDENTITY(1,1)	NOT NULL,
	ID_Componente	INT,
	ID_Carrera		INT,
	Criterio		VARCHAR (300)		NOT NULL	UNIQUE,
	CONSTRAINT PK_CYE_ID			PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_CYE_ID_Componente FOREIGN KEY (ID_Componente) 
		REFERENCES	dbo.Componentes (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_CYE_ID_Carrera FOREIGN KEY (ID_Carrera) 
		REFERENCES	dbo.Carreras (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla autoevaluaciones anuales, dichas evaluaciones se relacionan a una persona quien es el encargado principal 
de dicha evaluación
*/
USE AcreditacionTEC;
GO
CREATE TABLE AutoevaluacionesAnuales(
	ID				INT	IDENTITY(1,1)		NOT NULL,
	ID_Encargado	INT						NOT NULL,
	Anio			INT						NOT NULL,
	Nombre			VARCHAR(200)			NOT NULL,
	CONSTRAINT PK_AutoevaluacionesAnuales_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla NivelesIAE, contiene los niveles IAE
*/
USE AcreditacionTEC;
GO
CREATE TABLE NivelesIAE(
	ID			INT	IDENTITY(1,1)			NOT NULL,
	NivelIAE	VARCHAR(50)					NOT NULL	UNIQUE,
	CONSTRAINT PK_NivelesIAE_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla Valoraciones, contiene las valoraciones las cuales serán en escala de malo hasta excelente
*/
USE AcreditacionTEC;
GO
CREATE TABLE Valoraciones(
	ID			INT	IDENTITY(1,1)			NOT NULL,
	Valoracion	VARCHAR(50)					NOT NULL	UNIQUE,
	Posicion	FLOAT						NOT NULL	UNIQUE,
	CONSTRAINT PK_Valoraciones_ID PRIMARY KEY CLUSTERED (ID)
);
GO
--ALTER TABLE Valoraciones ALTER COLUMN Posicion INTEGER NOT NULL

/*
Tabla CumplimientosNominales, contiene fechas en las que se deben presentar avances o tener listo algún criterio
*/
USE AcreditacionTEC;
GO
CREATE TABLE CumplimientosNominales(
	ID					INT	IDENTITY(1,1)	NOT NULL,
	FechaCumplimiento	DATE				NOT NULL,
	Descripcion			VARCHAR(300)		NOT NULL,
	CONSTRAINT PK_CumplimientosNominales_ID PRIMARY KEY CLUSTERED (ID)
);
GO


/*
Tabla Responsables, contiene las personas que son responsables de que un criterio se cumpla bajo los requisitos de SINAES
*/
USE AcreditacionTEC;
GO
CREATE TABLE Responsables(
	ID			INT	IDENTITY(1,1)	NOT NULL,
	Correo		VARCHAR(100)		NOT NULL	UNIQUE,
	CONSTRAINT PK_Responsables_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla Evidencias, contiene las evidencias que prueban el correcto cumplimiento de un criterio ajustado
*/
USE AcreditacionTEC;
GO
CREATE TABLE Evidencias(
	ID				INT	IDENTITY(1,1)	NOT NULL,
	TipoEvidencia	INT					NOT NULL	UNIQUE,
	Descripcion		VARCHAR(300)		NOT NULL	UNIQUE,
	URL				VARCHAR(500)		NOT NULL,
	CONSTRAINT PK_Evidencias_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla CYEA, tabla principal que contiene todos los CYE ya ajustados
*/
USE AcreditacionTEC;
GO
CREATE TABLE CYEA(
	ID						INT IDENTITY(1,1)	NOT NULL,
	ID_CYE					INT,
	CriterioAjustado		VARCHAR(350)		NOT NULL UNIQUE,
	CONSTRAINT PK_CYEA_ID PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_CYEA_ID_CYE	FOREIGN KEY (ID_CYE) 
		REFERENCES	dbo.CYE (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla Responsabilidad, contiene el tipo de responsabilidad sobre un criterio, ejemplo: carrera, institucional, no aplica, vacio, etc
*/
USE AcreditacionTEC;
GO
CREATE TABLE Responsabilidad(
	ID					INT IDENTITY(1,1),
	Responsabilidad		VARCHAR(50)			NOT NULL UNIQUE,
	CONSTRAINT PK_Responsabilidad_ID PRIMARY KEY CLUSTERED (ID)
);
GO

/*
Tabla ValoracionCriterios, tabla principal que contiene todos los CYE ya ajustados y listos para la autoevaluación
*/
USE AcreditacionTEC;
GO
CREATE TABLE ValoracionCriterios(
	ID						INT IDENTITY(1,1)	NOT NULL,
	ID_CYEA					INT,
	ID_Valoracion			INT,
	ID_NivelIAE				INT,
	ID_Responsabilidad		INT,
	FLOC					DATE				NOT NULL,
	FLA						DATE				NOT NULL,
	IncorporadoIAE			INT					NOT NULL,
	Observaciones			VARCHAR(500)		NOT NULL,

	CONSTRAINT PK_ValoracionCriterios_ID PRIMARY KEY CLUSTERED (ID),

	CONSTRAINT FK_ValoracionCriterios_ID_CYEA	FOREIGN KEY (ID_CYEA) 
		REFERENCES	dbo.CYEA (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_ValoracionCriterios_ID_Valoracion FOREIGN KEY (ID_Valoracion) 
		REFERENCES	dbo.Valoraciones (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_ValoracionCriterios_ID_NivelIAE	FOREIGN KEY (ID_NivelIAE) 
		REFERENCES	dbo.NivelesIAE (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_ValoracionCriterios_ID_Responsabilidad FOREIGN KEY (ID_Responsabilidad) 
		REFERENCES	dbo.Responsabilidad (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla ValoracionCriterios_Responsables, tabla producida por la normalización de la relación entre las tablas ValoracionCriterios y Responsables
*/
USE AcreditacionTEC;
GO
CREATE TABLE ValoracionCriterios_Responsables(
	ID_ValoracionCriterios		INT,
	ID_Responsable				INT,
	TipoResponsabilidad			VARCHAR(250),
	CONSTRAINT FK_ValoracionCriterios_Responsables_ID_ValoracionCriterios	FOREIGN KEY (ID_ValoracionCriterios) 
		REFERENCES	dbo.ValoracionCriterios (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_ValoracionCriterios_Responsables_ID_Responsable	FOREIGN KEY (ID_Responsable) 
		REFERENCES	dbo.Responsables (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla Auto_ValoracionCriterios, tabla que sale producto de la normalización entre las tablas AutoevaluacionesAnuales y ValoracionCriterios y contiene 
cada todos los criterios que se asocian a un usuario administrador encargado de la evaluación de una carrera
*/
USE AcreditacionTEC;
GO
CREATE TABLE Autoeval_ValoracionCriterios(
	ID_Autoeval						INT,
	ID_ValoracionCriterios			INT,
	CONSTRAINT FK_Autoeval_ValoracionCriterios_ID_Autoeval	FOREIGN KEY (ID_Autoeval) 
		REFERENCES	dbo.AutoevaluacionesAnuales (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_Autoeval_ValoracionCriterios_ID_ValoracionCriterios	FOREIGN KEY (ID_ValoracionCriterios) 
		REFERENCES	dbo.ValoracionCriterios (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla CumplimientosNominales_ValoracionCriterios, tabla producida por la normalización de la relación entre las tablas ValoracionCriterios y
CumplimientosNominales
*/
USE AcreditacionTEC;
GO
CREATE TABLE CumplimientosNominales_ValoracionCriterios(
	ID_CumplimNominal				INT,
	ID_ValoracionCriterios			INT,
	CONSTRAINT FK_CumplimientosNominales_ValoracionCriterios_ID_ValoracionCriterios	FOREIGN KEY (ID_ValoracionCriterios) 
		REFERENCES	dbo.ValoracionCriterios (ID) ON DELETE CASCADE ON UPDATE CASCADE,
	
	CONSTRAINT FK_CumplimientosNominales_ValoracionCriterios_ID_CumplimNominal	FOREIGN KEY (ID_CumplimNominal) 
		REFERENCES	dbo.CumplimientosNominales (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO

/*
Tabla ValoracionCriterios_Evidencias, tabla producida por la normalización de la relación entre las tablas ValoracionCriterios y Evidencias
*/
USE AcreditacionTEC;
GO
CREATE TABLE ValoracionCriterios_Evidencias(
	ID_ValoracionCriterios		INT,
	ID_Evidencia				INT,
	CONSTRAINT FK_ValoracionCriterios_Evidencias_ID_ValoracionCriterios	FOREIGN KEY (ID_ValoracionCriterios) 
		REFERENCES	dbo.ValoracionCriterios (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT FK_ValoracionCriterios_Evidencias_ID_Evidencia	FOREIGN KEY (ID_Evidencia) 
		REFERENCES	dbo.Evidencias (ID) ON DELETE CASCADE ON UPDATE CASCADE
);
GO