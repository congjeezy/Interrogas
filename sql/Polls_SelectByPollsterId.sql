USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Polls_SelectByPollsterId]    Script Date: 5/6/2022 3:01:31 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO





-- =============================================
-- Author: Cong Ha
-- Create date: 4/2/2022
-- Description:	This proc will return a record based on PollsterId passed, record will contain columns from joined reference tables.
-- Code Reviewer:Dongyoung Yang

-- MODIFIED BY: Cong Ha
-- MODIFIED DATE: 4/4/2022
-- Code Reviewer: 
-- Note: 
-- =============================================

ALTER proc [dbo].[Polls_SelectByPollsterId] @PollsterId int
										,@pageIndex int
										,@pageSize int

AS

/* ------ Test Code ------
	DECLARE @PollsterId int = 1;

	DECLARE @pageIndex int = 0
			,@pageSize int = 5

	Execute dbo.Polls_SelectByPollsterId @PollsterId
										,@pageIndex
										,@pageSize

	SELECT * FROM Polls
	SELECT * FROM Pollsters
	SELECT * FROM PollMethodTypes
*/

BEGIN

	DECLARE @offset int = @pageIndex * @pageSize

	SELECT p.Id
		  ,pl.Id as PollsterId
		  ,pl.Name as PollsterName
		  ,[MethodTypeId]
		  ,pmt.Name as MethodType
		  ,[DateTaken]
		  ,[DatePublished]
		  ,[Cost]
		  ,[ReferenceId]
		  ,[Objective]
		  ,[ElectionYear]
		  ,[PollContentId]
		  ,TotalCount = COUNT(1) OVER()
	  FROM dbo.Pollsters AS pl INNER JOIN Polls AS p
		ON p.PollsterId = pl.Id
		INNER JOIN PollMethodTypes as pmt
		ON p.MethodTypeId = pmt.Id
	  WHERE pl.Id = @PollsterId
	  
	  ORDER BY p.Id
	  OFFSET @offset ROWS
	  FETCH NEXT @pageSize ROWS ONLY

END