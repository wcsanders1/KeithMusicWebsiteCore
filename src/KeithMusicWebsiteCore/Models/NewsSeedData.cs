using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Models
{
    public class NewsSeedData
    {
        static public List<News> GetNews()
        {
            List<News> news = new List<News>
            {
                new News
                {
                    Id = 0,
                    Date = new DateTime (2016, 11, 5, 20, 0, 0),
                    Location = "Granite State of Mind",
                    Description = "Keith will play a solo show on New Hampshire Public Radio.",
                    MiscHtml = "<p>Click <a href='http://www.wnhnfm.org/programs-2/granite-state-of-mind-2/' target='_blank'>here</a> to listen to a live podcast of the show.</p>"
                },
                new News
                {
                    Id = 1,
                    Date = new DateTime (2016, 10, 10, 19, 0, 0),
                    Location = "The Hungry Buffalo",
                    Description = "Eat, drink, and be merry while Keith and others play covers and original material.",
                    MiscHtml = "<p>Click <a href='http://hungrybuffalotavern.com/' target='_blank'>here</a> for the Hungry Buffalo's website.</p>"
                },
                new News
                {
                    Id = 2,
                    Date = new DateTime (2016, 12, 5, 21, 0, 0),
                    Location = "Rusty Moose",
                    Description = "See Keith and his band play a full show.",
                    MiscHtml = "<p>Click <a href='http://www.rustymooserestaurantnh.com/index.php' target='_blank'>here</a> for the Rusty Moose's website.</p>"
                },
                new News
                {
                    Id = 3,
                    Date = new DateTime (2017, 1, 17, 22, 30, 0),
                    Location = "Rusty Moose",
                    Description = "See Keith and his band play a full show.",
                    MiscHtml = "<p>Click <a href='http://www.rustymooserestaurantnh.com/index.php' target='_blank'>here</a> for the Rusty Moose's website.</p>"
                },
                new News
                {
                    Id = 4,
                    Date = new DateTime (2016, 11, 14, 17, 15, 0),
                    Location = "Hungry Buffalo",
                    Description = "Eat, drink, and be merry while Keith and others play covers and original material.",
                    MiscHtml = "<p>Click <a href='http://hungrybuffalotavern.com/' target='_blank'>here</a> for the Hungry Buffalo's website.</p>"
                },
                new News
                {
                    Id = 5,
                    Date = new DateTime(2014, 7, 6, 18, 0, 0),
                    Location = "Bank of New Hampshire Pavilion, in Gilford, New Hampshire",
                    Description = "Keith was part of the opening act for Foreigner, Styx, and Don Felder.",
                    MiscHtml = "<p>Click <a href='https://www.youtube.com/watch?v=p-N0_y93yzg' target='_blank'>here</a> and <a href='https://www.youtube.com/watch?v=Qdgqi5QHbEo' target='_blank'>here</a> to see video of Keith's performance."
                }
            };
            return news;
        }
    }
}
