var GROUPMETOKEN = process.env['GROUPMETOKEN'] || '1a427b103b54013494fe1fc52abab46f';
var GIPHYTOKEN = process.env['GIPHYTOKEN'] || 'dc6zaTOxFJmzC';
var GROUP = process.env['GROUP'] || '23542536';
var URL = process.env['URL'] || 'http://deh-bot.herokuapp.com';
var natural = require('natural');
var _ = require('underscore');
var util = require('util');
var request = require('request');
var drizzy = require('./drake/drake-lyrics');

var tokenizer = new natural.WordTokenizer();

var config =  { token:GROUPMETOKEN,
                name: "DEHbot",
                group: GROUP,
                url: URL
              };

var AVATAR = process.env['AVATAR'];
if (AVATAR) {
  config.avatar_url = AVATAR;
}

var giphy = require('giphy-wrapper')(GIPHYTOKEN);
var bot = require('fancy-groupme-bot')(config);

var commands = {
  'gif': gifCommand,
  'drake': drakeCommand
};

bot.on('botRegistered', function() {
  console.log("online");
});

bot.on('botMessage', function(bot, message) {
  console.log('Message recieved');
  var commandTerm = message.text.split(' ')[0];
  var command = findCommand(commandTerm);
  
  if (_.isFunction(command) && message.name != config.name) {
    console.log('command found:' + commandTerm);
    command(message)
  }
});

function drakeCommand() {
  var lyric = _.shuffle(drizzy.lyrics)[0];
  var image = _.shuffle(drizzy.images)[0];
  bot.message(image);
  bot.message(lyric);
}

function gifCommand(message) {
  var text = message.text;
  var tokens = tokenizer.tokenize(text);

  tokens = _.map(tokens, function(t) {
    return t.toLowerCase();
  });
  console.log('gif requested: ' + tokens.toString());
  tokens = _.without(tokens, 'gif');
  console.log('tokens: ' + tokens.toString());

  giphy.search(escape(tokens.join('+')), 20, 0, function(err, data) {
    if (err) console.error(err);
    console.log("giphy returned " + util.inspect(data));
    if (data.data.length) {
      data = _.shuffle(data.data);
      var id = data[0].id;
      var imageUrl = "http://media3.giphy.com/media/" + id + "/giphy.gif";
      console.log("sending a message " + imageUrl);
      bot.message(imageUrl);
    }
  });
}

function findCommand(commandTerm) {
  if (commandTerm[0] != '/') return undefined;
  return commands[commandTerm.substring(1)];
}

bot.serve(process.env['PORT'] || 3000);
