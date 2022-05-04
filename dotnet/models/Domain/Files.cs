using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Files : FileBase
    {
        public string FileName { get; set; }
        public int FileTypeId { get; set; }
        public string FileType { get; set; }
        public int CreatedBy { get; set; }
        public int SatusId { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}
