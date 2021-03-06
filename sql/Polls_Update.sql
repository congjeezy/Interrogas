USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Polls_Update]    Script Date: 5/6/2022 3:01:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Cong Ha
-- Create date: 4/3/2022
-- Description:	This proc accepts an id and will update column values within target id record
-- MODIFIED BY: Cong Ha
-- MODIFIED DATE: 4/4/2022
-- Code Reviewer: Dongyoung Yang
-- Note:
-- =============================================

ALTER proc [dbo].[Polls_Update] @PollsterId int
							,@MethodTypeId int
							,@DateTaken datetime2(7)
							,@DatePublished datetime2(7)
							,@Cost decimal(10,2)
							,@ReferenceId int
							,@Objective nvarchar(255)
							,@ElectionYear int
							,@PollContentId int
							,@Id int

AS

/* ------ Test Code ------

	 DECLARE @Id int = 23

	 DECLARE @PollsterId int = 6
			,@MethodTypeId int = 2
			,@DateTaken datetime2(7) = '2080/04/04'
			,@DatePublished datetime2(7) = '2080/04/04' 
			,@Cost decimal(10,2) = 55
			,@ReferenceId int = 2
			,@Objective nvarchar(100) = 'Update datemod test'
			,@ElectionYear int = 2050
			,@PollContentId int = 1

	 EXECUTE dbo.Polls_Update @PollsterId
							,@MethodTypeId
							,@DateTaken
							,@DatePublished
							,@Cost
							,@ReferenceId
							,@Objective
							,@ElectionYear
							,@PollContentId
							,@Id 

	SELECT * 
	FROM Polls
	WHERE Id = @Id

*/

BEGIN

	UPDATE [dbo].[Polls]
	   SET [PollsterId] = @PollsterId
		  ,[MethodTypeId] = @MethodTypeId
		  ,[DateTaken] = @DateTaken
		  ,[DatePublished] = @DatePublished
		  ,[Cost] = @Cost
		  ,[ReferenceId] = @ReferenceId
		  ,[Objective] = @Objective
		  ,[ElectionYear] = @ElectionYear
		  ,[PollContentId] = @PollContentId
		  ,[DateModified] = GETUTCDATE()
	 WHERE Id = @Id

END

