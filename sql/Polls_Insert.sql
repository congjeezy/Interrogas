USE [Interrogas]
GO
/****** Object:  StoredProcedure [dbo].[Polls_Insert]    Script Date: 5/6/2022 3:00:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Cong Ha
-- Create date: 4/3/2022
-- Description:	This Proc will add a new record to Polls data table.
-- MODIFIED BY: Cong Ha
-- MODIFIED DATE: 4/4/2022
-- Code Reviewer:Dongyoung Yang
-- Note:
-- =============================================

ALTER PROC [dbo].[Polls_Insert] @PollsterId int
							,@MethodTypeId int
							,@DateTaken datetime2(7)
							,@DatePublished datetime2(7)
							,@Cost decimal(10,2)
							,@ReferenceId int
							,@Objective nvarchar(255)
							,@ElectionYear int
							,@PollContentId int
							,@Id int OUTPUT

AS

/* ------ Test Code ------
	 DECLARE @Id int = 0;

	 DECLARE @PollsterId int = 1
			,@MethodTypeId int = 2
			,@DateTaken datetime2(7) = '2080/04/04'
			,@DatePublished datetime2(7) = '2080/04/04' 
			,@Cost decimal(10,2) = 55
			,@ReferenceId int = 2
			,@Objective nvarchar(100) = 'Insert date test'
			,@ElectionYear int = 2050
			,@PollContentId int = 1

	 EXECUTE dbo.Polls_Insert @PollsterId
							,@MethodTypeId
							,@DateTaken
							,@DatePublished
							,@Cost
							,@ReferenceId
							,@Objective
							,@ElectionYear
							,@PollContentId
							,@Id OUTPUT

	SELECT * 
	FROM Polls
	WHERE Id = @Id
*/

BEGIN

	INSERT INTO [dbo].[Polls]
			   ([PollsterId]
			   ,[MethodTypeId]
			   ,[DateTaken]
			   ,[DatePublished]
			   ,[Cost]
			   ,[ReferenceId]
			   ,[Objective]
			   ,[ElectionYear]
			   ,[PollContentId]
			   ,[DateModified]
			   ,[DateCreated])
		 VALUES
			   (@PollsterId
			   ,@MethodTypeId
			   ,@DateTaken
			   ,@DatePublished
			   ,@Cost
			   ,@ReferenceId
			   ,@Objective
			   ,@ElectionYear
			   ,@PollContentId
			   ,GETUTCDATE()
			   ,GETUTCDATE())
		
		SET @Id = SCOPE_IDENTITY()

END
