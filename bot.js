// Varialbles

var DiscordClient = require('discord.io');
var colors = require('colors');
var fs = require('fs');
var childProcess = require("child_process");
var spawn = childProcess.spawn;
var cleverbot = require("cleverbot-node");
var clever = new cleverbot;
var domain = require('domain');
var d = domain.create();
var os = require("os");
var version = '2.0.1';

// Intilization
d.on('error', function(err) {
    console.error(err);
});
try {
    var conf = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    log('config.json has sucsessfully loaded.', 'info');
} catch (e) {
    log('config.json does not exist or is malformed. Exiting...', 'err');
    process.exit();
}
if (conf.dev == false && conf.selfbot == false) {
    log('Starting bot in normal mode.', 'info');
    var token = conf.auth.discord.token;
    var prefix = conf.commandprefix;
    var cleverEnabled = conf.cleverEnabled;
    var tagsEnabled = conf.cleverEnabled;
    var musicEnabled = conf.musicEnabled;
    var emojiEnabled = conf.emojiEnabled;
}
if (conf.dev == true && conf.selfbot == false) {
    log('Starting bot in developer mode.', 'info');
    var token = conf.auth.discord.devtoken;
    var prefix = conf.devprefix;
    var cleverEnabled = false;
    var tagsEnabled = false;
    var musicEnabled = false;
    var emojiEnabled = false;
}
if (conf.dev == false && conf.selfbot == true) {
    log('Starting bot in selfbot mode.', 'info');
    var email = conf.auth.discord.selfbotemail;
    var pass = conf.auth.discord.selfbotpassword;
    var prefix = conf.selfprefix;
    var cleverEnabled = false;
    var tagsEnabled = false;
    var musicEnabled = false;
    var emojiEnabled = false;
}
if (conf.dev == true && conf.selfbot == true) {
    log('Starting bot in selfbot developer mode.', 'info');
    var email = conf.auth.discord.selfbotemail;
    var pass = conf.auth.discord.selfbotpassword;
    var prefix = conf.devselfprefix;
    var cleverEnabled = false;
    var tagsEnabled = false;
    var musicEnabled = false;
    var emojiEnabled = false;
}
if (tagsEnabled == true) {
    try {
        var tags = JSON.parse(fs.readFileSync('tags.json', 'utf8'));
        log('tags.json has sucsessfully loaded.', 'info');
    } catch (e) {
        log('config.json does not exist or is malformed. Bot will crash!', 'info');
    }
}
if (cleverEnabled == true) {
    cleverbot.prepare(function() {});
}

log('Intilizing discord...', 'info');

// Discord Intilization

var bot = new DiscordClient({
    token: token,
    email: email,
    password: pass,
    autorun: true
});
bot.on('ready', function() {
    log('Ready!', 'info');
    log('AdrydBot By Adryd', 'info');
    log('Use \'' + prefix + '\' with your command to use the bot' , 'info');
});
bot.on("disconnected", function() {
    log('Bot Disconnected. Attempting to reconnect', 'warn');
    bot.connect();
});

// Actions
bot.on('message', function(user, userID, channelID, message, rawEvent) {
    if ((conf.selfbot == true && bot.id == userID) || conf.selfbot != true) {
        if (message.slice(0, prefix.length) == prefix.toLowerCase()) {
            fullcmd = (message.slice(prefix.length)).split(" ");
            if (fullcmd[0] != null) {
                cmd = fullcmd[0].toLowerCase();
            } else {
                cmd = null;
            }
            if (fullcmd[1] != null) {
                arg1 = fullcmd[1].toLowerCase();
                arg1Case = fullcmd[1];
            } else {
                arg1 = null;
                arg1Case = null;
            }
            if (fullcmd[2] != null) {
                arg2 = fullcmd[2].toLowerCase();
                arg2Case = fullcmd[2];
            } else {
                arg2 = null;
                arg2Case = null;
            }
            if (fullcmd[3] != null) {
                arg3 = fullcmd[3].toLowerCase();
                arg3Case = fullcmd[3];
            } else {
                arg3 = null;
                arg3Case = null;
            }
            if (fullcmd[1] != null) {
                args = ((fullcmd.slice(1)).join(" ")).toLowerCase();
                argsCase = (fullcmd.slice(1)).join(" ");
            } else {
                args = null;
                argsCase = null;
            }
            if (cmd !== null) {
                switch (cmd) {
                    case "info":
                    case "help":
                    case "commands":
                    case "docs":
                    case "get":
                    case "credits":
                    case "invite":
                    case "author":
                        bot.sendMessage({
                            to: channelID, // IF YOU REMOVE OR CHANGE THE BELOW LINE BE PREPARED TO DEAL WITH A DMCA TAKEDOWN NOTICE!!!! TO ADD YOUR NAME PLEASE MODIFY THE CONFIG FILE, NOT THIS LINE. THANKS :D
                            message: '**Adrydbot** by Adryd\nDocumentation & Credits: http://www.adryd.xyz/proj/adrydbot/\nSRC: http://adryd.xyz/swlink/adrydbotsrc/\nOfficial Invite Link: http://adryd.xyz/swlink/adrydbotinv/\n' + conf.infotext,
                            typing: true
                        });
                        break;
                    case "ping":
                        var ping = [
                            'Owwie, that hit me in the face!',
                            'Outch, that landed in my eye!',
                            'Pong!',
                            'Can you please stop throwing pingpong balls at me!',
                            'WOULD YOU QUIT IT WITH THE PINGPONG BALLS'
                        ];
                        var i = Math.floor(Math.random() * ping.length);
                        bot.sendMessage({
                            to: channelID,
                            message: ping[i],
                            typing: true
                        });
                        break;
                    case "id":
                    case "roleid":
                    case "userid":
                        if (arg1 === null) {
                            bot.sendMessage({
                                to: channelID,
                                message: userID,
                                typing: true
                            });
                        } else {
                            arg1 = arg1.replace("!", "")
                            arg1 = arg1.replace("<", "")
                            arg1 = arg1.replace(">", "")
                            arg1 = arg1.replace("@", "")
                            arg1 = arg1.replace("#", "")
                            arg1 = arg1.replace("&", "")
                            bot.sendMessage({
                                to: channelID,
                                message: arg1,
                                typing: true
                            });
                        }
                        break;
                    case "channelid":
                        if (arg1 === null) {
                            bot.sendMessage({
                                to: channelID,
                                message: channelID,
                                typing: true
                            });
                        } else {
                            arg1 = arg1.replace("!", "")
                            arg1 = arg1.replace("<", "")
                            arg1 = arg1.replace(">", "")
                            arg1 = arg1.replace("@", "")
                            arg1 = arg1.replace("#", "")
                            arg1 = arg1.replace("&", "")
                            bot.sendMessage({
                                to: channelID,
                                message: arg1,
                                typing: true
                            });
                        }
                        break;
                    case "serverid":
                    case "guildid":
                        if (bot.serverFromChannel(channelID) !== null) {
                            bot.sendMessage({
                                to: channelID,
                                message: bot.serverFromChannel(channelID),
                                typing: true
                            });
                        }
                        break;
                    case "presence":
                        if (userID == conf.ownerid) {
                            if (arg1 = "away") {
                                var botPresence = Date.now();
                            } else {
                                var botPresence = null
                            }
                            bot.setPresence({
                                idle_since: botPresence
                            });
                        }
                        break;
                    case "avatar":
                        if (userID == conf.ownerid) {
                            editUserInfo({
                                avatar: require('fs').readFileSync('profile.png', 'base64')
                            });
                        }
                        break;
                    case "botusername":
                        if (userID == conf.ownerid) {
                            bot.editUserInfo({
                                name: argsCase
                            });
                        }
                        break;
                    case "botname":
                    case "botnick":
                        if (userID == conf.ownerid) {
                            bot.editNickname({
                                nick: argsCase,
                                userID: bot.id
                            });
                        }
                        break;
                    case "nick":
                        bot.editNickname({
                            nick: argsCase,
                            userID: userID
                        });
                        break;
                    case "game":
                    case "playing":
                        if (userID == conf.ownerid) {
                            bot.setPresence({
                                game: argsCase
                            });
                        }
                        break;
                    case "streaming":
                        if (userID == conf.ownerid) {
                            bot.setPresence({
                                type: 2,
                                url: 'https://www.twitch.tv/directory',
                                game: arg1
                            });
                        }
                        break;
                    case "eval":
                        if (userID == conf.ownerid) {
                            var response = eval(argsCase);
                            if (response !== undefined || response !== null) {
                                bot.sendMessage({
                                    to: channelID,
                                    message: '```' + response + '```'
                                });
                            }
                        }
                        break;
                    case "rand":
                    case "random":
                        bot.sendMessage({
                            to: channelID,
                            message: Math.floor(Math.random() * Number(arg1)),
                            typing: true
                        });
                        break;
                    case "role":
                        if (bot.serverFromChannel(channelID) !== null) {
                            var serverID = bot.serverFromChannel(channelID);
                            if (arg1 == 'remove') {
                                for (var i in bot.servers[serverID].roles) {
                                    if (bot.servers[serverID].roles[i].name == arg2Case) {
                                        var arg3 = arg3.replace("!", "")
                                        arg3 = arg3.replace("<", "")
                                        arg3 = arg3.replace(">", "")
                                        arg3 = arg3.replace("@", "")
                                        arg3 = arg3.replace("#", "")
                                        arg3 = arg3.replace("&", "")
                                        bot.removeFromRole({
                                            server: bot.serverFromChannel(channelID),
                                            user: arg3,
                                            role: bot.servers[serverID].roles[i].id
                                        });
                                    }
                                }
                            }
                            if (arg1 == 'add') {
                                for (var i in bot.servers[serverID].roles) {
                                    if (bot.servers[serverID].roles[i].name == arg2Case) {

                                        var arg3 = arg3.replace("!", "")
                                        arg3 = arg3.replace("<", "")
                                        arg3 = arg3.replace(">", "")
                                        arg3 = arg3.replace("@", "")
                                        arg3 = arg3.replace("#", "")
                                        arg3 = arg3.replace("&", "")
                                        bot.addToRole({
                                            server: bot.serverFromChannel(channelID),
                                            user: arg3,
                                            role: bot.servers[serverID].roles[i].id
                                        });
                                    }
                                }
                            }
                        }
                        break;
                    case "emoji":
                        if (emojiEnabled == true) {
                            char1 = (arg1.charCodeAt(0) - 0xD800) * 0x400 + arg1.charCodeAt(1) - 0xDC00 + 0x10000;
                            char1 = char1.toString(16);
                            char2 = (arg1.charCodeAt(2) - 0xD800) * 0x400 + arg1.charCodeAt(3) - 0xDC00 + 0x10000;
                            char2 = char2.toString(16);
                            if (char2 != 'NaN') {
                                char2 = "-" + char2
                            }
                            if (char2 == 'NaN') {
                                char2 = "";
                            }
                            bot.uploadFile({
                                to: channelID,
                                file: "images/emoji/" + char1 + char2 + ".png",
                                filename: char1 + char2 + ".png",
                                message: ""
                            });

                            break;
                        }
                    case "tag":
                        if (tagsEnabled == true) {
                            var tag = arg1
                            for (var i in tags) {
                                if (i == tag) {
                                    if (tags[i].tagtype == 'img') {
                                        bot.uploadFile({
                                            to: channelID,
                                            file: tags[i].response,
                                            filename: 'img.png',
                                            message: ''
                                        });
                                    }
                                    if (tags[i].tagtype == 'txt') {
                                        bot.sendMessage({
                                            to: channelID,
                                            message: tags[i].response,
                                            typing: true
                                        });
                                    }
                                }
                            }
                        }
                        break;
                    case "clever":
                    case "talk":
                        if (cleverEnabled == true) {
                            clever.write(argsCase, function(response) {
                                bot.sendMessage({
                                    to: channelID,
                                    message: response.message,
                                    typing: true
                                });
                            });
                        }
                        break;
                    case "music":
                    case "play":
                        if (arg1 != 'null' && bot.serverFromChannel(channelID) !== null && musicEnabled == true) {
                            var songcount = conf.songcount
                            var serverID = bot.serverFromChannel(channelID);
                            var channels = bot.servers[serverID].channels;
                            for (var channel in channels) {
                                var name = bot.servers[serverID].channels[channel].name;
                                var vcid = bot.servers[serverID].channels[channel].id;
                                if (name == argsCase) {
                                    function handleStream(stream) {
                                        function newMusic() {
                                            var filen = Math.floor(Math.random() * songcount);
                                            file = "music/" + filen + ".mp3";
                                            var ffmpeg = spawn('ffmpeg', [ //Or 'avconv', if you have it instead
                                                '-i', file,
                                                '-af', 'volume=0.15',
                                                '-f', 's16le',
                                                '-ar', '48000',
                                                '-ac', '2', //If you want one audio channel (mono), you can omit `stereo: true` in `getAudioContext`
                                                'pipe:1'
                                            ], {
                                                stdio: ['pipe', 'pipe', 'ignore']
                                            });

                                            ffmpeg.stdout.once('readable', function() {
                                                stream.send(ffmpeg.stdout);
                                            });

                                            ffmpeg.stdout.once('end', function() {
                                                newMusic();
                                            });
                                        }
                                        var filen = Math.floor(Math.random() * songcount);
                                        file = "music/" + filen + ".mp3";
                                        var ffmpeg = spawn('ffmpeg', [ //Or 'avconv', if you have it instead
                                            '-i', file,
                                            '-af', 'volume=0.15',
                                            '-f', 's16le',
                                            '-ar', '48000',
                                            '-ac', '2', //If you want one audio channel (mono), you can omit `stereo: true` in `getAudioContext`
                                            'pipe:1'
                                        ], {
                                            stdio: ['pipe', 'pipe', 'ignore']
                                        });

                                        ffmpeg.stdout.once('readable', function() {
                                            stream.send(ffmpeg.stdout);
                                        });

                                        ffmpeg.stdout.once('end', function() {
                                            newMusic();
                                        });
                                    }
                                    bot.joinVoiceChannel(vcid, function() {
                                        bot.getAudioContext({
                                            channel: bot.servers[serverID].members[bot.id].voice_channel_id,
                                            stereo: true
                                        }, handleStream);
                                    })
                                }
                            }
                        }
                        break;
                }
            }
        }
    }
});


function log(content, type) {
    switch (type) {
        case "info":
            console.log(colors.green('[INFO] ') + content);
            break;
        case "warn":
            console.log(colors.yellow('[WARN] ') + content);
            break;
        case "err":
            console.log(colors.red('[ERROR] ') + content);
            break;
        default:
            console.log(colors.blue('[TESTING] ') + content);
    }
}
