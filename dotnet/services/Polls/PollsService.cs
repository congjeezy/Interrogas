using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class PollsService : IPollsService
    {
        IDataProvider _data = null;
        ILookUpService _lookUpService = null;
        public PollsService(IDataProvider data, ILookUpService lookUpService)
        {
            _data = data;
            _lookUpService = lookUpService;
        }

        public int Add(PollAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[Polls_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);

                    SqlParameter idOut = new SqlParameter("Id", System.Data.SqlDbType.Int);
                    idOut.Direction = System.Data.ParameterDirection.Output;
                    collection.Add(idOut);
                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["Id"].Value;

                    int.TryParse(oId.ToString(), out id);
                });

            return id;
        }

        public Polls GetById(int id)
        {
            string procName = "[dbo].[Polls_SelectById]";

            Polls poll = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);

            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                poll = MapPolls(reader, ref startingIndex);
            });

            return poll;
        }

        public Paged<Polls> GetAllPaginated(int pageIndex, int pageSize)
        {
            List<Polls> list = null;
            Paged<Polls> pagedList = null;
            int totalCount = 0;

            string procName = "[dbo].[Polls_SelectAll]";

            _data.ExecuteCmd(procName,
                (param) =>
                {
                    param.AddWithValue("@pageIndex", pageIndex);
                    param.AddWithValue("@pageSize", pageSize);
                }, 
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Polls poll = MapPolls(reader, ref startingIndex);                    
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Polls>();
                    }

                    list.Add(poll);
                });
            if (list != null)
            {
                pagedList = new Paged<Polls>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<Polls> GetByPollsterId(int id, int pageIndex, int pageSize)
        {
            List<Polls> list = null;
            Paged<Polls> pagedList = null;
            int totalCount = 0;

            string procName = "[dbo].[Polls_SelectByPollsterId]";

            _data.ExecuteCmd(procName,
                (param) =>
                {
                    param.AddWithValue("@PollsterId", id);
                    param.AddWithValue("@pageIndex", pageIndex);
                    param.AddWithValue("@pageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Polls poll = MapPolls(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Polls>();
                    }

                    list.Add(poll);
                });
            if (list != null)
            {
                pagedList = new Paged<Polls>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public Paged<Polls> SearchByObjective(string query, int pageIndex, int pageSize)
        {
            List<Polls> list = null;
            Paged<Polls> pagedList = null;
            int totalCount = 0;

            string procName = "[dbo].[Polls_Search]";

            _data.ExecuteCmd(procName,
                (param) =>
                {
                    param.AddWithValue("@Query", query);
                    param.AddWithValue("@pageIndex", pageIndex);
                    param.AddWithValue("@pageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Polls poll = MapPolls(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Polls>();
                    }

                    list.Add(poll);
                });
            if (list != null)
            {
                pagedList = new Paged<Polls>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;
        }

        public void Update(PollUpdateRequest model)
        {
            string procName = "[dbo].[Polls_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection collection)
                {
                    AddCommonParams(model, collection);
                    collection.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }

        public void DeleteById(int id)
        {
            string procName = "[dbo].[Polls_Delete]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate(SqlParameterCollection collection)
                {
                    collection.AddWithValue("@Id", id);
                },
                returnParameters: null);
        }

        private Polls MapPolls(IDataReader reader, ref int startingIndex)
        {
            Polls aPoll = new Polls();

            aPoll.Id = reader.GetSafeInt32(startingIndex++);
            aPoll.Pollster = _lookUpService.MapLookUp(reader, ref startingIndex);
            aPoll.MethodType = _lookUpService.MapLookUp(reader, ref startingIndex);
            aPoll.DateTaken = reader.GetSafeDateTime(startingIndex++);
            aPoll.DatePublished = reader.GetSafeDateTime(startingIndex++);
            aPoll.Cost = reader.GetSafeDecimal(startingIndex++);
            aPoll.ReferenceId = reader.GetSafeInt32(startingIndex++);
            aPoll.Objective = reader.GetSafeString(startingIndex++);
            aPoll.ElectionYear = reader.GetSafeInt32(startingIndex++);
            aPoll.PollContentId = reader.GetSafeInt32(startingIndex++);
            
            return aPoll;
        }

        private static void AddCommonParams(PollAddRequest model, SqlParameterCollection collection)
        {
            collection.AddWithValue("@PollsterId", model.PollsterId);
            collection.AddWithValue("@MethodTypeId", model.MethodTypeId);
            collection.AddWithValue("@DateTaken", model.DateTaken);
            collection.AddWithValue("@DatePublished", model.DatePublished);
            collection.AddWithValue("@Cost", model.Cost);
            collection.AddWithValue("@ReferenceId", model.ReferenceId);
            collection.AddWithValue("@Objective", model.Objective);
            collection.AddWithValue("@ElectionYear", model.ElectionYear);
            collection.AddWithValue("@PollContentId", model.PollContentId);
        }

    }

}
