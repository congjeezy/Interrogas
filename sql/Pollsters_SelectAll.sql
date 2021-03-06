USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Pollsters_SelectAll]    Script Date: 5/6/2022 3:06:05 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Cong Ha
-- Create date: 4/15/2022
-- Description:	This proc will list all pollster in dbo.Pollsters.
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER PROC [dbo].[Pollsters_SelectAll]

AS

/* ------ Test Code ------

	Execute dbo.Pollsters_SelectAll

*/

BEGIN

	SELECT [Id]
		  ,[Name]
		  ,[LogoUrl]
		  ,[SiteUrl]
		  ,[Location]
		  ,[DateCreated]
		  ,[DateModified]
	  FROM [dbo].[Pollsters]

END

