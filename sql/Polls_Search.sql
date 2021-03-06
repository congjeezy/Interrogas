USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Polls_Search]    Script Date: 5/6/2022 3:01:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



-- =============================================
-- Author: Cong Ha
-- Create date: 4/3/2022
-- Description:	This Proc will return a paginated record set based on search query in the Objective column.
-- Code Reviewer:Dongyoung Yang

-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER PROC [dbo].[Polls_Search] @Query nvarchar(100)
							,@pageIndex int
							,@pageSize int

AS

/* ------ Test Code ------
	DECLARE @Query nvarchar(100) = 'test';

	DECLARE @pageIndex int = 0
			,@pageSize int = 5

	Execute dbo.Polls_Search  @Query
							,@pageIndex
							,@pageSize
*/

BEGIN

	DECLARE @offset int = @pageIndex * @pageSize

	SELECT p.[Id]
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

	  WHERE (Objective LIKE '%' + @Query + '%' OR
			 p.Id LIKE '%' + @Query + '%' OR
			 pl.Name LIKE '%' + @Query + '%' OR
			 pl.Id LIKE '%' + @Query + '%' OR
			 pmt.Name LIKE '%' + @Query + '%' OR
			 DateTaken LIKE '%' + @Query + '%')
	  ORDER BY Id
	  OFFSET @offset ROWS
	  FETCH NEXT @pageSize ROWS ONLY

END


