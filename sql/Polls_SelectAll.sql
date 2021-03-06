USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Polls_SelectAll]    Script Date: 5/6/2022 3:01:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author: Cong Ha
-- Create date: 4/2/2022
-- Description:	This Proc will return a paginated data table with column data joined from PollMethodTypes and Pollsters
-- Code Reviewer:Dongyoung Yang


-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note:
-- =============================================

ALTER proc [dbo].[Polls_SelectAll] @pageIndex int
								,@pageSize int

AS

/* ------ Test Code ------
	DECLARE @pageIndex int = 0
			,@pageSize int = 5

	EXECUTE dbo.Polls_SelectAll @pageIndex
								,@pageSize
*/

BEGIN
	
	DECLARE @offset int = @pageIndex * @pageSize

	SELECT p.Id
		  ,[PollsterId]
		  ,pl.Name AS PollsterName
		  ,[MethodTypeId]
		  ,pmt.Name AS MethodType
		  ,[DateTaken]
		  ,[DatePublished]
		  ,[Cost]
		  ,[ReferenceId]
		  ,[Objective]
		  ,[ElectionYear]
		  ,[PollContentId]
		  ,TotalCount = COUNT(1) OVER()
	  FROM [dbo].[Polls] as p INNER JOIN PollMethodTypes as pmt
			ON p.MethodTypeId = pmt.Id
			INNER JOIN Pollsters as pl
			ON pl.Id = p.PollsterId
	  
	  ORDER BY p.Id
	  OFFSET @offset ROWS
	  FETCH NEXT @pageSize ROWS ONLY


END





