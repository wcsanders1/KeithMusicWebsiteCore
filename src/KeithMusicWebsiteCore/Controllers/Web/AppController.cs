using KeithMusicWebsiteCore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Controllers.Web
{
    public class AppController : Controller
    {
        private IConfigurationRoot _config;
        private SiteContext _context;
        public AppController(IConfigurationRoot config, SiteContext context)
        {
            _config = config;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult PartialIndex()
        {
            return PartialView();
        }

        public IActionResult News()
        {
            List<News> news = _context.NewsItems.ToList();
            news.Sort((x, y) => DateTime.Compare(x.Date, y.Date));

            return PartialView(news);
        }

        public IActionResult About()
        {
            return PartialView();
        }
    }
}
