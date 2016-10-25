using KeithMusicWebsiteCore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Controllers.Data
{
    public class DataController : Controller
    {
        private List<Song> _allSongs = null;
        private List<YouTubeLink> _allYouTubeLinks = null;
        private IConfigurationRoot _config;
        private SiteContext _context;

        public DataController(IConfigurationRoot config, SiteContext context)
        {
            _config = config;
            _context = context;
        }
        public JsonResult GetLoopSongs()
        {
            _allSongs = new List<Song>();

            try
            {
                _allSongs = _context.Songs.ToList();
            }
            catch
            {
                _allSongs = SongsSeedData.GetSongs();
            }
            return new JsonResult(_allSongs);
        }

        public JsonResult GetYouTubeLinks()
        {
            _allYouTubeLinks = new List<YouTubeLink>();

            
            try
            {
                _allYouTubeLinks = _context.YouTubeLinks.ToList();
            }
            catch
            {
                _allYouTubeLinks = YouTubeLinksSeedData.GetYouTubeLinks();
            }

            return new JsonResult(_allYouTubeLinks);
        }
    }
}
