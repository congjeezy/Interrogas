USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Polls_Delete]    Script Date: 5/6/2022 3:00:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Cong Ha
-- Create date: 4/2/2022
-- Description:	This proc will delete a record from Polls table based on Target id passed.
-- Code Reviewer:Dongyoung Yang
-- MODIFIED BY: Cong Ha
-- MODIFIED DATE: 4/4/2022
-- Code Reviewer: 
-- Note:
-- =============================================

ALTER PROC [dbo].[Polls_Delete] @Id int

AS

/* ------ Test Code ------
	SELECT * FROM Polls

	DECLARE @Id int = 11;

	Execute dbo.Polls_Delete @Id
										
	SELECT * FROM Polls
*/

BEGIN

	DELETE FROM [dbo].[Polls]
		  WHERE Id = @Id

END