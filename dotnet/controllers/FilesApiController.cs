using Amazon;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Sabio.Models;
using Sabio.Models.AppSettings;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/files")]
    [ApiController]
    public class FilesApiController : BaseApiController
    {
        private IFileService _service = null;
        private AWSStorageConfig _awsStorageConfig;
        private IAuthenticationService<int> _authService;
        public FilesApiController(IOptions<AWSStorageConfig> awsStorageConfig, IFileService service, ILogger<FilesApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _awsStorageConfig = awsStorageConfig.Value;
            _authService = authService;
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Files>>> Pagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("createdBy")]
        public ActionResult<ItemResponse<Paged<Files>>> CreatedByPagination( int pageIndex, int pageSize, int createdBy)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.CreatedByPagination(pageIndex, pageSize, createdBy);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("upload")]
        public async Task<ActionResult<ItemsResponse<FileBase>>> UploadFileToS3(List<IFormFile> files)
        {
            int code = 201;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                List<FileBase> output = await _service.UploadFile(files, userId);
                response = new ItemsResponse<FileBase> { Items = output };
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("searchPaginate")]
        public ActionResult<ItemResponse<Paged<Files>>> SearchPagination(string fileName, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.SearchPagination(fileName, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("filetype")]
        public ActionResult<ItemResponse<Paged<Files>>> FileTypePagination(int typeId, int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.FileTypePagination(typeId, pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("deleted")]
        public ActionResult<ItemResponse<Paged<Files>>> GetDeletedPagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Files> paged = _service.GetDeletedPagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Files Record Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Files>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> UpdateStatusId(int id, int statusId)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.UpdateStatusId(id, statusId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpPost("extract")]
        public ActionResult<ItemResponse<ElectionMetadata>> UploadPdf(IFormFile files)
        {

            int code = 200;
            BaseResponse response = null;
            try
            {
                    
                    ElectionMetadata data = _service.RetrieveData(files);
                    if(data == null)
                    {
                        code = 500;
                        response = new ErrorResponse("File could not be read");
                   
                    }
                    else
                    {
                       response = new ItemResponse<ElectionMetadata> { Item = data };
                    }
                
                             
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

    }
}
