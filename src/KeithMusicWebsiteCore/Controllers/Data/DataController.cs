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
        public JsonResult GetAllSongs()
        {
            _allSongs = new List<Song>();

            _allSongs = SongsSeedData.GetSongs();

            return new JsonResult(_allSongs);
        }
    }
}
