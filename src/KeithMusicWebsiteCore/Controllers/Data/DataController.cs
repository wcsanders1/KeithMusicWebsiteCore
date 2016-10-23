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

            //_allSongs = SongsSeedData.GetSongs();
            _allSongs = _context.Songs.ToList();

            return new JsonResult(_allSongs);
        }

        public JsonResult GetYouTubeLinks()
        {
            _allYouTubeLinks = new List<YouTubeLink>();

            //_allYouTubeLinks = YouTubeLinksSeedData.GetYouTubeLinks();
            _allYouTubeLinks = _context.YouTubeLinks.ToList();

            return new JsonResult(_allYouTubeLinks);
        }
    }
}
