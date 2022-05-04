using Microsoft.AspNetCore.Http;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public interface IFileService
    {
        Paged<Files> Pagination(int pageIndex, int pageSize);
        Paged<Files> SearchPagination(string fileName,int pageIndex, int pageSize);
        Paged<Files> CreatedByPagination(int pageIndex, int pageSize, int createdBy);
        Paged<Files> FileTypePagination(int typeId, int pageIndex, int pageSize);
        Task<List<FileBase>> UploadFile(List<IFormFile> files, int userId);
        void UpdateStatusId(int id, int statusId);
        Paged<Files> GetDeletedPagination(int pageIndex, int pageSize);
        ElectionMetadata RetrieveData(IFormFile pdfFile);

    }
}