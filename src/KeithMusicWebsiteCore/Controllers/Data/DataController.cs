using KeithMusicWebsiteCore.Models;
using Microsoft.AspNetCore.Mvc;
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
        public JsonResult GetLoopSongs()
        {
            _allSongs = new List<Song>();

            _allSongs = SongsSeedData.GetSongs();

            return new JsonResult(_allSongs);
        }

        public JsonResult GetYouTubeLinks()
        {
            _allYouTubeLinks = new List<YouTubeLink>();

            _allYouTubeLinks = YouTubeLinksSeedData.GetYouTubeLinks();

            return new JsonResult(_allYouTubeLinks);
        }
    }
}
