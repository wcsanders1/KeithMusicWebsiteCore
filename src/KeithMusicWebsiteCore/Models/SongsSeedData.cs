using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Models
{
    public class SongsSeedData
    {
        static public List<Song> GetSongs()
        {
            List<Song> songs = new List<Song>()
            {
                new Song
                {
                    Id = 0,         //get rid of this when making database
                    Title = "Last Train",
                    AudioFile = "~/audio/LastTrain.m4a",
                    Lyrics = "One face can look like another, light can play tricks on the eye,@when two people look at each other for the first time.@Even took a bite of the apple, and I bet she would do it again,@because it didn't take much convincing when it was in her hands.@And I fell in love with a stranger, in a godforsaken place,@stowed away as a rider on the last train.@And how the black engine screams like a bullet down the barrel of a gun,@chasing the spinning earth around the rising sun.@And I lie awake with it, thinking nobody knows my name,@and if I fell off ot the world today I'd fall a long way,@to whatever caught up with me.@Rattle the bars of a prison. Rise like a shape from the deep.@Pass over the sleeping switchman in the dry creek.@And when anyone asks what I'm learning as I count my days away,@I say I'm learning to spot me a liar from a long way.@And I fell in love with a stranger in a crowded lonely place,@stole away as a rider on the last train.@And I'm scratching my throat with a pistol, and I'm reaching for the same,@tracks kicking the furious sparks into the empty space.@And I move away with it, thinking nobody knows my name...",
                    Snippet = "Rattle the bars of a prison. Rise like a shape from the deep. Pass over the sleeping switchman in the dry creek."
                },
                new Song
                {
                    Id = 1,
                    Title = "Searchlight",
                    AudioFile = "~/audio/Searchlight.m4a",
                    Lyrics = "I feel I'm passing through,@and all the space in me is collapsing too,@as the eye of a needle through will shine a searchlight.@All the evil good can do.@Muscle hustling pushing pins right through.@While the open mouth anew will shine a searchlight.@From sun to setting sun,@burn the gold empire down.@And in the dark before the dawn@its fire will keep us warm.@And with a heartbeat battle drum@we'll crawl the road to Babylon.@Faithful a weapon are you, patience.@Feel like a storm that broods, waiting.@Well I feel I'm crossing through.@In good company, with the shadows too,@to the empty house of truth,@to shine a searchlight.",
                    Snippet = "I feel I'm passing through. In good company, with the shadows too, to the empty house of truth, to shine a searchlight."
                },
                new Song
                {
                    Id = 2,
                    Title = "Beholder",
                    AudioFile = "~/audio/Beholder.wav",
                    Lyrics = "I'm the eye of the beholder",
                    Snippet = "Falala"
                }
            };
            return songs;
        }
    }
}
