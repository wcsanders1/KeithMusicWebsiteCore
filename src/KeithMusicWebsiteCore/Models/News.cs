using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Models
{
    public class News
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string MiscHtml { get; set; }
    }
}
