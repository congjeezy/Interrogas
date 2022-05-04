using Sabio.Models.Domain;
using Sabio.Models.Domain.LookUps;
using System;
using System.Collections.Generic;
using System.Data;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
    public interface ILookUpService
    {
        ExpandoObject GetLookUps(List<string> tableNames);
        List<LookUp> GetLookUp(string tableName);
        List<Institution> GetLookUpInstitution(string tableName);
        List<State> GetLookUpState(string tableName);
        LookUp MapLookUp(IDataReader reader, ref int startingIndex);
        LookUp GetIdName(IDataReader reader, ref int idx);
        State GetMunicipality(IDataReader reader, ref int idx);


    }
}
