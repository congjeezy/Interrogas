using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using Sabio.Models.Domain.LookUps;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class LookUpService : ILookUpService
    {
        IDataProvider _data = null;
        public LookUpService(IDataProvider data)
        {
            _data = data;
        }

        public ExpandoObject GetLookUps(List<string> tableNames)
        {
            ExpandoObject result = null;

            for (int i = 0; i < tableNames.Count; i++)
            {
                if (result == null)
                {
                    result = new ExpandoObject();
                }

                if (tableNames[i] == "Institutions")
                {
                    ((IDictionary<String, Object>)result).TryAdd(tableNames[i],
                        GetLookUpInstitution(tableNames[i]));
                }
                else if (tableNames[i] == "States")
                {
                    ((IDictionary<String, Object>)result).TryAdd(tableNames[i],
                        GetLookUpState(tableNames[i]));
                }
                else
                {
                    ((IDictionary<String, Object>)result).TryAdd(tableNames[i],
                        GetLookUp(tableNames[i]));
                }

            }
            return result;

        }

        public List<LookUp> GetLookUp(string tableName)
        {

            string procName = $"dbo.{tableName}_SelectAll";

            List<LookUp> list = null;

            _data.ExecuteCmd(procName
                , null
                , delegate (IDataReader reader, short set)
                 {
                     LookUp lookUp = new LookUp();
                     int startingIndex = 0;

                     lookUp.Id = reader.GetSafeInt32(startingIndex++);
                     lookUp.Name = reader.GetSafeString(startingIndex++);

                     if (list == null)
                     {
                         list = new List<LookUp>();
                     }
                     list.Add(lookUp);
                 });

            return list;
        }

        public List<Institution> GetLookUpInstitution(string tableName)
        {

            string procName = $"dbo.{tableName}_SelectAll";

            List<Institution> list = null;

            _data.ExecuteCmd(procName
                , null
                , delegate (IDataReader reader, short set)
                {
                    Institution lookUp = new Institution();
                    int startingIndex = 0;

                    lookUp.Id = reader.GetSafeInt32(startingIndex++);
                    lookUp.Name = reader.GetSafeString(startingIndex++);
                    lookUp.SiteUrl = reader.GetSafeString(startingIndex++);
                    lookUp.LogoUrl = reader.GetSafeString(startingIndex++);
                    lookUp.StateId = reader.GetSafeInt32(startingIndex++);
                    lookUp.Code = reader.GetSafeString(startingIndex++);

                    if (list == null)
                    {
                        list = new List<Institution>();
                    }
                    list.Add(lookUp);
                });

            return list;
        }

        public LookUp GetIdName(IDataReader reader, ref int startingIndex)
        {
            LookUp lookUp = new LookUp();
            lookUp.Id = reader.GetSafeInt32(startingIndex++);
            lookUp.Name = reader.GetSafeString(startingIndex++);

            return lookUp;
        }

        public State GetMunicipality(IDataReader reader, ref int startingIndex)
        {
            State state = new State();
            LookUp lookUp = GetIdName(reader, ref startingIndex);

            state.Id = lookUp.Id;
            state.Name = lookUp.Name;
            state.Code = reader.GetSafeString(startingIndex++);

            return state;
        }

        public List<State> GetLookUpState(string tableName)
        {

            string procName = $"dbo.{tableName}_SelectAll";

            List<State> list = null;

            _data.ExecuteCmd(procName
                , null
                , delegate (IDataReader reader, short set)
                {
                    State lookUp = new State();
                    int startingIndex = 0;

                    lookUp.Id = reader.GetSafeInt32(startingIndex++);
                    lookUp.Name = reader.GetSafeString(startingIndex++);
                    lookUp.Code = reader.GetSafeString(startingIndex++);


                    if (list == null)
                    {
                        list = new List<State>();
                    }
                    list.Add(lookUp);
                });

            return list;
        }
        public LookUp MapLookUp(IDataReader reader, ref int startingIndex)
        {
            LookUp lookUp = new LookUp();
            lookUp.Id = reader.GetSafeInt32(startingIndex++);
            lookUp.Name = reader.GetSafeString(startingIndex++);
            return lookUp;
        }
    }
}
