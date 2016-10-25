using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeithMusicWebsiteCore.Models
{
    public class SongsSeedData
    {
        private SiteContext _context;

        public SongsSeedData(SiteContext context)
        {
            _context = context;
        }

        public async Task EnsureSeedDataSongs()
        {
            try
            {
                if (!_context.Songs.Any())
                {
                    List<Song> songs = GetSongs();
                    _context.Songs.AddRange(songs);
                    await _context.SaveChangesAsync();
                }
            }
            catch
            {
                return;
            }
        }
        static public List<Song> GetSongs()
        {
            List<Song> songs = new List<Song>()
            {
                new Song
                {
                    //Id = 0,         //get rid of this when making database
                    Title = "Last Train",
                    AudioFileMP3 = "/audio/LastTrain.mp3",
                    AudioFileOGG = "/audio/LastTrain.ogg",
                    Lyrics = "One face can look like another,<br>light can play tricks on the eye,<br>when two people look at each other for the first time.<br>Eve took a bite of the apple,<br>and I bet she would do it again,<br>'cause it didn't take much convincing when it was in her hands.<br>And I fell in love with a stranger,<br>in a godforsaken place,<br>stowed away as a rider on the last train.<br>And how the black engine screams like a bullet<br>down the barrel of a gun,<br>chasing the spinning earth around the rising sun.<br>And I lie awake with it,<br>thinking nobody knows my name,<br>and if I fell off of the world today<br>I'd fall a long way,<br>to whatever caught up with me.<br>Rattle the bars of a prison.<br>Rise like a shape from the deep.<br>Pass over the sleeping switchman in the dry creek.<br>And when anyone asks what I'm learning<br>as I count my days away,<br>I say I'm learning to spot me a liar from a long way.<br>And I fell in love with a stranger<br>in a crowded lonely place,<br>stole away as a rider on the last train.<br>And I'm scratching my throat with a pistol,<br>and I'm reaching for the same,<br>tracks kicking the furious sparks into the empty space.<br>And I move away with it,<br>thinking nobody knows my name...",
                    Snippet = "Rattle the bars of a prison. Rise like a shape from the deep.<br>Pass over the sleeping switchman in the dry creek."
                },
                new Song
                {
                    //Id = 1,
                    Title = "Searchlight",
                    AudioFileMP3 = "/audio/Searchlight.mp3",
                    AudioFileOGG = "/audio/Searchlight.ogg",
                    Lyrics = "I feel I'm passing through,<br>and all the space in me is collapsing too,<br>as the eye of a needle through<br>will shine a searchlight.<br>All the evil good can do.<br>Muscle hustling<br>pushing pins right through.<br>While the open mouth anew<br>will shine a searchlight.<br>From sun to setting sun,<br>burn the gold empire down.<br>And in the dark before the dawn,<br>its fire will keep us warm.<br>And with a heartbeat battle drum,<br>we'll crawl the road to Babylon.<br>Faithful a weapon are you,<br>patience.<br>Feel like a storm that broods,<br>waiting.<br>Well I feel I'm crossing through.<br>In good company, with the shadows too,<br>to the empty house of truth,<br>to shine a searchlight.",
                    Snippet = "I feel I'm passing through. In good company, with the shadows too.<br>To the empty house of truth, to shine a searchlight."
                },
                new Song
                {
                    //Id = 2,
                    Title = "Beholder",
                    AudioFileMP3 = "/audio/Beholder.mp3",
                    AudioFileOGG = "/audio/Beholder.ogg",
                    Lyrics = "Was the black bird hanging around your window?<br>The melody that made you turn under your sleep.<br>And in that place I did meet you at the crossroads,<br>and in that land you took the hook and shook my hand.<br>Now every time you speak to curse the chains that bind you,<br>well I wouldn't mind if you just used my name instead.<br>Because love is blind, but I'm the eye of the beholder.<br>And I come in nines, and every low road runds my way.<br>So run my way.<br>Take what you can get.<br>Don't drive such a hard bargain.<br>Ah, don't you forget?<br>What is hard gets harder.<br>Here, let me light your cigarette<br>and loosen your blindfold.",
                    Snippet = "And in that place, I did meet you at the crossroads,<br>and in that land, you took the hook and shook my hand."
                },
                new Song
                {
                    //Id = 3,
                    Title = "Live Alone",
                    AudioFileMP3 = "/audio/LiveAlone.mp3",
                    AudioFileOGG = "/audio/LiveAlone.ogg",
                    Lyrics = "Going to live by myself alone.<br>Take my visitors in a courtyard made of stone.<br>And when my tongue ties I won't untie it anymore.<br>Just going to live by myself alone.<br>And when the evening wind does blow<br>I'll take the low road.<br>And when the morning sun rise cold<br>I'll take the low road.<br>And kill it so it don't grow anymore.<br>Kill it.<br>Going to live by myself alone.<br>Practice magic on the roses and thorns.<br>And sing my love songs for the loneliest of ghosts.<br>When I live by myself alone.<br>And when the evening wind does blow<br>I'll take the low road.<br>And when the morning sun rise cold<br>I'll take the low road.<br>And kill it so it don't grow anymore.<br>Kill it kill it kill it.<br>I will reach out for the things that can't be seen<br>and pull them over me.<br>Sunday palm ash and the salt from the deep blue sea,<br>and mix them evenly.<br>And when my blackbirds fly over the shrine<br>in the still of the pines,<br>I will take any shape that please me.<br>I will eat my fill both from the alter and windowsill.<br>I will come to whomever feeds me.<br>I will take any shape that please me.<br>I will come to whomever feeds me.<br>Feed me.<br>Kill it.",
                    Snippet = "I will reach out for the things that can't be seen<br>and pull them over me.<br>Sunday palm ash and the salt from the deep blue sea,<br>and mix them evenly."
                },
                new Song
                {
                    //Id = 4,
                    Title = "Idol",
                    AudioFileMP3 = "/audio/Idol.mp3",
                    AudioFileOGG = "/audio/Idol.ogg",
                    Lyrics = "Move quietly through the rooms of a house.<br>New fallen snow throws the moon back on the clouds.<br>Young man, got so much love at your hands,<br>why you sitting by yourself?<br>You did a good thing,<br>the world she burst wide open,<br>why'd you move away from her?<br>I got to check myself, I didn't know you at all.<br>But I wanted to be you or be somebody like you<br>since the age that I could talk.<br>Did you see through too much of everything<br>till you couldn't see nothing at all?<br>Well I wish you'd hung around,<br>and I'm not the only one.<br>Meeting your idol isn't fair.<br>Saw you once before a crowd got there.<br>Tried to say something nice, and not to stare,<br>and I left you alone.<br>In effigy still trying to make you speak.<br>In brevity, visitors by three.<br>Say they don't understand,<br>we saw you do it once man.<br>You can do it all again.<br>Wish I could meet you once again.<br>Bring something to sign and have a pen.<br>Try to be cool and shake your hand,<br>and leave you alone.<br>Just leave you alone.<br>But I don't understand.<br>I saw you do it once man.<br>You could have done it all again.<br>I don't understand.<br>I saw you do it once man.<br>Didn't you want to do it again?",
                    Snippet = "You did a good thing,<br>the world she burst wide open,<br>why'd you move away from her?"
                },
                new Song
                {
                    //Id = 5,
                    Title = "Hit",
                    AudioFileMP3 = "/audio/Hit.mp3",
                    AudioFileOGG = "/audio/Hit.ogg",
                    Lyrics = "Think that you know me,<br>until you see me.<br>I run a black wind.<br>Act like your own man,<br>show some intention.<br>Can tell you're nervous,<br>I ask you focus.<br>I run a black wind.<br>And you lie.<br>Refracted light.<br>We cannot be young forever.<br>You will not be young forever.<br>Live a long life.<br>Never been healed but you never been sick.<br>Never been down,<br>but you've never been kicked.<br>Spin of the wheel,<br>see how far you get.<br>Comes back around<br>next time learn how to hit.<br>Long life.<br>Long life.",
                    Snippet = "Never been healed but you never been sick.<br>Never been down,<br>but you've never been kicked."
                },
                new Song
                {
                    //Id = 6,
                    Title = "Hanging Gardens",
                    AudioFileMP3 = "/audio/HangingGardens.mp3",
                    AudioFileOGG = "/audio/HangingGardens.ogg",
                    Lyrics = "Long days, hot nights.<br>Leave the windows open wide.<br>Shade trees shed light.<br>Walk by my side,<br>down the avenue tonight.<br>Frame me in your light.<br>Dead or alive<br>I came here to meet you.<br>Rolled out from under<br>the butcher's knife.<br>And I can't remember,<br>because I've had a fever.<br>Afloat in the harbor<br>I feel as cold as ice.<br>Long days, hot nights.<br>Hear the storms roll in the sky.<br>Still frames of white light.<br>My my, July.<br>Do you remember you and I?<br>By the cypress and the grape vine.<br>Dead or alive<br>I came here to see you,<br>in the hanging gardens<br>where the daylight's run.<br>You move over water,<br>and I will receive you.<br>And you don't have to tell me<br>you can't stay very long.",
                    Snippet = "Long days, hot nights.<br>Hear the storms roll in the sky.<br>Still frames of white light."
                },
                new Song
                {
                    //Id = 7,
                    Title = "Wearing a Dead Man's Clothes",
                    AudioFileMP3 = "/audio/DeadMan.mp3",
                    AudioFileOGG = "/audio/DeadMan.ogg",
                    Lyrics = "I'm going out alone<br>wearing a dead man's clothes.<br>I draw water from the stone.<br>Fell in love with a ghost.<br>The fire went out.<br>I could feel it going down.<br>I was sitting on the third floor,<br>I was looking out<br>at a road that goes down<br>from the maddening crowd<br>to an old man living in a burned out house.<br>Yeah I'm going out alone<br>wearing a dead man's coat.<br>I draw water from the stone.<br>Fell in love with the ghost.<br>The fire burned out,<br>yeah I could see it going down.<br>I was sitting on the third floor<br>watching the sun going down.<br>And all the spirits came out,<br>and speaking aloud said<br>if you got a good hand<br>you better lay it down now.<br>They want to grab hold,<br>swallow a dead man's soul.<br>She said leave it alone.<br>You know they aint like you.<br>But I feel just like a bomb,<br>only I already blew.<br>Tonight I'm going downtown<br>wearing a dead man's suit.",
                    Snippet = "I'm going out alone<br>wearing a dead man's clothes."
                },
                new Song
                {
                    //Id = 8,
                    Title = "Wicked Win",
                    AudioFileMP3 = "/audio/WickedWin.mp3",
                    AudioFileOGG = "/audio/WickedWin/ogg",
                    Lyrics = "Oh Lord, light me up and knock me down.<br>Kick me when I'm on the ground.<br>You tell me that it's over now.<br>Cause I've been sleeping on my own today,<br>standing in a strange place,<br>carry on another way.<br>Oh man better cut my loss,<br>better cut this cross,<br>better reel it in.<br>Kills me to let the wicked win.<br>Somebody let the devil in again.<br>Kills me to let the wicked win.<br>I've been banging on my highest wall,<br>sleeping in a crowded hall,<br>living, I don't care at all.<br>And I know everybody's got to fight,<br>everything is on the line,<br>and everybody's losing time.<br>Oh man better cut my loss,<br>better cut this cross,<br>better reel it in.<br>Kills me to let the wicked win.<br>Somebody let the devil in again.<br>Kills me to let the wicked win.",
                    Snippet = "Somebody let the devil in again.<br>Kills me to let the wicked win."
                },
                new Song
                {
                    //Id = 9,
                    Title = "Lapiz Lazuli",
                    AudioFileMP3 = "/audio/LapisLazuli.mp3",
                    AudioFileOGG = "/audio/LapisLazuli.ogg",
                    Lyrics = "So long<br>my aching heart,<br>it was sweet while the pain was new,<br>but for now<br>I'll meet you further down the road.<br>And farewell<br>to your sorrows to.<br>I've been wasting my life on you,<br>and I can't lie I<br>must be gone before I'm through.<br>Carry your cross,<br>I don't want to be holy.<br>You can count up your loss,<br>but it's one only.<br>And I'll find new ways to<br>get lonely without you.<br>I'll get lonely without you.<br>Goodybye to your<br>siren song.<br>This kind of love can lose its charm<br>and leave you to mark the hour upon the wall.<br>Deliver in the arms of heaven<br>when I get my shit together.<br>A drowning man in a deep blue sea<br>trying to hold together soul and body.",
                    Snippet = "Carry your cross,<br>I don't want to be holy."
                },
                new Song
                {
                    //Id = 10,
                    Title = "Irish Girl",
                    AudioFileMP3 = "/audio/IrishGirl.mp3",
                    AudioFileOGG = "/audio/IrishGirl.ogg",
                    Lyrics = "Jack was my mother's great grandfather.<br>Came over from Ireland as a kid.<br>Met an American girl and they got married.<br>They're buried in the Allegheny Cemetery.<br>Now ain't it funny<br>how the wide old world turns around.<br>I want to pack my things and go to Ireland.<br>An American man with a bad accent<br>and the vaguest of plans<br>for an Irish girl.<br>There's no story to my last name.<br>I'm a little bit of everything.<br>Growing up in America that stuff doesn't matter,<br>you just know you came from some people running from something.<br>I want to leave New York and sail to Ireland.<br>Trace the route those ships took back in 1910.<br>See the place they say Ulysses lived and wept<br>for an Irish girl,<br>for the love of an Irish girl.<br>I'm doing ok.<br>I'm in Belfast today,<br>and I see the rain,<br>see the rain,<br>see the rain.<br>And in little wings on the graves of kings,<br>such sweet things,<br>sad things,<br>old words,<br>about an Irish girl.<br>For an Irish girl.",
                    Snippet = "I'm doing ok.<br>I'm in Belfast today,<br>and I see the rain,<br>see the rain,<br>see the rain."
                }
            };
            return songs;
        }
    }
}
