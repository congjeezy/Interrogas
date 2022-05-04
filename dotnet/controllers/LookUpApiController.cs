using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Dynamic;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/lookups")]
    [ApiController]
    public class LookUpApiController : BaseApiController
    {
        private ILookUpService _lookUpService = null;
        private IAuthenticationService<int> _authService = null;

        public LookUpApiController(ILookUpService service
            ,ILogger<LookUpApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _lookUpService = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<ExpandoObject>> GetLookUps(List<string> tableNames)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                ExpandoObject result = _lookUpService.GetLookUps(tableNames);

                if(result == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Resource not found.");
                }
                else
                {
                    response = new ItemResponse<ExpandoObject> { Item = result };
                }
            }
            catch(Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                
            }

            return StatusCode(iCode, response);
        }

    }
}
