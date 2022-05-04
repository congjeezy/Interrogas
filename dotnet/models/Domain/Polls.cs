using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Polls
    {
        public int Id { get; set; }
        public LookUp Pollster { get; set; }
        public LookUp MethodType { get; set; }
        public DateTime DateTaken { get; set; }
        public DateTime DatePublished { get; set; }
        public Decimal Cost { get; set; }
        public int ReferenceId { get; set; }
        public string Objective { get; set; }
        public int ElectionYear { get; set; }
        public int PollContentId { get; set; }
    }
}
