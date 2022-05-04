using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests
{
    public class PollAddRequest
    {
        [Required]
        public int PollsterId { get; set; }
        [Required]
        public int MethodTypeId { get; set; }
        [Required]
        public DateTime DateTaken { get; set; }
        public DateTime DatePublished { get; set; }
        public Decimal Cost { get; set; }
        public int ReferenceId { get; set; }
        [Required]
        public string Objective { get; set; }
        [Required]
        public int ElectionYear { get; set; }
        public int PollContentId { get; set; }

    }
}
