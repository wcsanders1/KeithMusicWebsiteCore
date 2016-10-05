using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Lyrics { get; set; }
        public string AudioFileMP3 { get; set; }
        public string AudioFileOGG { get; set; }
        public string Snippet { get; set; }
    }
}
