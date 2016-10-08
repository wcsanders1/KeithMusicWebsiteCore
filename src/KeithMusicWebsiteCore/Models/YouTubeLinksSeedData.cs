using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Models
{
    public class YouTubeLinksSeedData
    {
        static public List<YouTubeLink> GetYouTubeLinks()
        {
            List<YouTubeLink> youTubeLinks = new List<YouTubeLink>()
            {
                new YouTubeLink
                {
                    Id = 0,         //get rid of this when making database
                    Headline = "Meadowbrook, New Hampshire",
                    Url = "https://www.youtube.com/embed/Qdgqi5QHbEo",
                    Caption = "Playing <span class='italics'>Gates of Night</span> during the opening set for Don Felder, Foreigner, and Styx"
                }
            };
            return youTubeLinks;
        }
    }
}
