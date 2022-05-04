using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface IPollsService
    {
        int Add(PollAddRequest model);
        Polls GetById(int id);
        Paged<Polls> GetAllPaginated(int pageIndex, int pageSize);
        Paged<Polls> GetByPollsterId(int id, int pageIndex, int pageSize);
        Paged<Polls> SearchByObjective(string query, int pageIndex, int pageSize);
        void Update(PollUpdateRequest model);
        void DeleteById(int id);
    }
}
