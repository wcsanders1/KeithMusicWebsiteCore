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
                    AudioFile = "/audio/LastTrain.m4a",
                    Lyrics = "One face can look like another,<br>light can play tricks on the eye,<br>when two people look at each other for the first time.<br>Eve took a bite of the apple,<br>and I bet she would do it again,<br>'cause it didn't take much convincing when it was in her hands.<br>And I fell in love with a stranger,<br>in a godforsaken place,<br>stowed away as a rider on the last train.<br>And how the black engine screams like a bullet<br>down the barrel of a gun,<br>chasing the spinning earth around the rising sun.<br>And I lie awake with it,<br>thinking nobody knows my name,<br>and if I fell off of the world today<br>I'd fall a long way,<br>to whatever caught up with me.<br>Rattle the bars of a prison.<br>Rise like a shape from the deep.<br>Pass over the sleeping switchman in the dry creek.<br>And when anyone asks what I'm learning<br>as I count my days away,<br>I say I'm learning to spot me a liar from a long way.<br>And I fell in love with a stranger<br>in a crowded lonely place,<br>stole away as a rider on the last train.<br>And I'm scratching my throat with a pistol,<br>and I'm reaching for the same,<br>tracks kicking the furious sparks into the empty space.<br>And I move away with it,<br>thinking nobody knows my name...",
                    Snippet = "Rattle the bars of a prison. Rise like a shape from the deep.<br>Pass over the sleeping switchman in the dry creek."
                },
                new Song
                {
                    Id = 1,
                    Title = "Searchlight",
                    AudioFile = "/audio/Searchlight.m4a",
                    Lyrics = "I feel I'm passing through,<br>and all the space in me is collapsing too,<br>as the eye of a needle through<br>will shine a searchlight.<br>All the evil good can do.<br>Muscle hustling<br>pushing pins right through.<br>While the open mouth anew<br>will shine a searchlight.<br>From sun to setting sun,<br>burn the gold empire down.<br>And in the dark before the dawn,<br>its fire will keep us warm.<br>And with a heartbeat battle drum,<br>we'll crawl the road to Babylon.<br>Faithful a weapon are you,<br>patience.<br>Feel like a storm that broods,<br>waiting.<br>Well I feel I'm crossing through.<br>In good company, with the shadows too,<br>to the empty house of truth,<br>to shine a searchlight.",
                    Snippet = "I feel I'm passing through. In good company, with the shadows too.<br>To the empty house of truth, to shine a searchlight."
                },
                new Song
                {
                    Id = 2,
                    Title = "Beholder",
                    AudioFile = "/audio/Beholder.wav",
                    Lyrics = "Was the black bird hanging around your window?<br>The melody that made you turn under your sleep.<br>And in that place I did meet you at the crossroads,<br>and in that land you took the hook and shook my hand.<br>Now every time you speak to curse the chains that bind you,<br>well I wouldn't mind if you just used my name instead.<br>Because love is blind, but I'm the eye of the beholder.<br>And I come in nines, and every low road runds my way.<br>So run my way.<br>Take what you can get.<br>Don't drive such a hard bargain.<br>Ah, don't you forget?<br>What is hard gets harder.<br>Here, let me light your cigarette<br>and loosen your blindfold.",
                    Snippet = "And in that place, I did meet you at the crossroads,<br>and in that land, you took the hook and shook my hand."
                }
            };
            return songs;
        }
    }
}
