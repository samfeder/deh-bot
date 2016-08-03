var GROUPMETOKEN = process.env['GROUPMETOKEN'];
var GIPHYTOKEN = process.env['GIPHYTOKEN'];
var GROUP = process.env['GROUP'];
var URL = process.env['URL'];
var natural = require('natural');
var _ = require('underscore');
var util = require('util');
var request = require('request');

var tokenizer = new natural.WordTokenizer();

var config =  { token:GROUPMETOKEN,
                name: "deh-bot",
                group: GROUP,
                url: URL
              };

var AVATAR = process.env['AVATAR'];
if (AVATAR) {
  config.avatar_url = AVATAR;
}

var giphy = require('giphy-wrapper')(GIPHYTOKEN);
var bot = require('fancy-groupme-bot')(config);

var commands = {'gif' : gifCommand};

bot.on('botRegistered', function() {
  console.log("online");
});

bot.on('botMessage', function(bot, message) {
  console.log('Message recieved');
  var commandTerm = findCommandTerm(message.text);

  if (commandTerm) {
    commands[commandTerm](message.text);
  }
});

function gifCommand(text) {
  var tokens = tokenizer.tokenize(text);

  tokens = _.map(tokens, function(t) {
    return t.toLowerCase();
  });

  console.log('gif requested: ' + tokens.toString());
  tokens = _.without(tokens, '/gif');

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

function findCommandTerm(text) {
  var key = text.split(' ')[0];

  if (key[0] != '/') return undefined;
  return commands[key.substring(1)];
}

bot.serve(process.env['PORT'] || 3000);
