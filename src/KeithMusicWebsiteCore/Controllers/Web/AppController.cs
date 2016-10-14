using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Controllers.Web
{
    public class AppController : Controller
    {
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
            return PartialView();
        }

        public IActionResult About()
        {
            return PartialView();
        }
    }
}
