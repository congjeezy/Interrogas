USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Polls_SelectById]    Script Date: 5/6/2022 3:01:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Cong Ha
-- Create date: 4/2/2022
-- Description:	This proc will return a joined data table when passed an id.
-- MODIFIED BY: 
-- MODIFIED DATE: 
-- Code Reviewer: 
-- Note:
-- =============================================

ALTER PROC [dbo].[Polls_SelectById] @Id int

AS

/* ------ Test Code ------

	DECLARE @Id int = 3

	Execute dbo.Polls_SelectById @Id

	SELECT * FROM Polls
	SELECT * FROM Pollsters
	SELECT * FROM PollMethodTypes

*/

BEGIN

	SELECT p.Id
		  ,p.PollsterId
		  ,pl.Name as PollsterName
		  ,p.MethodTypeId
		  ,pmt.Name as MethodType
		  ,[DateTaken]
		  ,[DatePublished]
		  ,[Cost]
		  ,[ReferenceId]
		  ,[Objective]
		  ,[ElectionYear]
		  ,[PollContentId]
	  FROM [dbo].[Polls] AS p inner join PollMethodTypes AS pmt
		ON p.MethodTypeId = pmt.Id
		inner join Pollsters as pl
		ON pl.Id = p.PollsterId
	  WHERE p.Id = @Id

END

