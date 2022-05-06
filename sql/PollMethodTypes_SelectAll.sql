USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[PollMethodTypes_SelectAll]    Script Date: 5/6/2022 3:00:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




-- =============================================
-- Author: Cong Ha
-- Create date: 4/1/2022
-- Description:	This proc will list all polling methods in dbo.PollMethodTypes.
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER proc [dbo].[PollMethodTypes_SelectAll]

AS

/* ------ Test Code ------

	Execute PollMethodTypes_SelectAll

*/

BEGIN

	SELECT [Id]
		  ,[Name]
	  FROM [dbo].[PollMethodTypes]

END




