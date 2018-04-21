USE tempdb;  
GO  
CREATE TABLE ValueTable ([value] int unique);  
GO 
 
begin try

INSERT INTO ValueTable VALUES(3),(4); 

DECLARE @TransactionName varchar(20) = 'Transaction1';  

BEGIN TRAN @TransactionName  
       INSERT INTO ValueTable VALUES(1), (2), (3);  
ROLLBACK TRAN @TransactionName;  

end try
begin catch

print('Error')

end catch
 

SELECT [value] FROM ValueTable; 

create procedure jj
as
	declare @success integer
	set @success = 2
	select @success;
	set @success = 3
	select @success;
go 

exec jj

create procedure jj
	@success integer
as
	set @success = 2
	select @success;
	set @success = 3
	select @success;
go 
exec jj 0

