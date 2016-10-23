using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Models
{
    public class YouTubeLinksSeedData
    {
        private SiteContext _context;

        public YouTubeLinksSeedData(SiteContext context)
        {
            _context = context;
        }

        public async Task EnsureSeedDataYouTubeLinks()
        {
            if (!_context.YouTubeLinks.Any())
            {
                List<YouTubeLink> youTubeLinks = GetYouTubeLinks();
                _context.YouTubeLinks.AddRange(youTubeLinks);
                await _context.SaveChangesAsync();
            }
        }
        static public List<YouTubeLink> GetYouTubeLinks()
        {
            List<YouTubeLink> youTubeLinks = new List<YouTubeLink>()
            {
                new YouTubeLink
                {
                    //Id = 0,         //get rid of this when making database
                    Headline = "Bank of NH Pavilion in Gilford, New Hampshire",
                    Url = "https://www.youtube.com/embed/Qdgqi5QHbEo",
                    Caption = "Playing <span class='italics'>Gates of Night</span> during the opening set for Don Felder, Foreigner, and Styx on July 6, 2014"
                },
                new YouTubeLink
                {
                    //Id = 1,
                    Headline = "Bank of NH Pavilion in Gilford, New Hampshire",
                    Url = "https://www.youtube.com/embed/p-N0_y93yzg",
                    Caption = "Playing <span class='italics'>Strychnine</span> during the opening set for Don Felder, Foreigner, and Styx on July 6, 2014"
                },
                new YouTubeLink
                {
                    //Id = 2,
                    Headline = "Epsom, New Hampshire",
                    Url = "https://www.youtube.com/embed/nu9XO4fZgDs",
                    Caption = "Playing <span class='italics'>Eulum</span> at home"
                },
                new YouTubeLink
                {
                    //Id = 3,
                    Headline = "Epsom, New Hampshire",
                    Url = "https://www.youtube.com/embed/oey_FC5Qq-E",
                    Caption = "Playing <span class='italics'>Little Lie</span> at home"
                },
                new YouTubeLink
                {
                    //Id = 4,
                    Headline = "Epsom, New Hampshire",
                    Url = "https://www.youtube.com/embed/J05WMWCA7kk",
                    Caption = "Playing <span class='italics'>World Not Made By Hands</span> at home"
                }
            };
            return youTubeLinks;
        }
    }
}
