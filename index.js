'use strict';
var http = require('http');
var Bot = require('@kikinteractive/kik');
//var request = require('request');
var susi= require('./susi.js');
var answer;

const port = process.env.PORT || 8080;

var bot = new Bot({
    username: 'susi.ai',
    apiKey: process.env.API_KEY,
    baseUrl: process.env.BASE_URL
});

bot.updateBotConfiguration();
 
bot.onTextMessage((message) => {
    susi.ask(message.body,function (answer) {
      message.reply(answer);
    })
    /*
    let query = message.body;
    request('https://api.susi.ai/susi/chat.json?q=' + encodeURI(query), function(error, response, body) {
 
        if (!error && response.statusCode == 200) {
 
            answer = JSON.parse(body).answers[0].actions[0].expression;
 
        } else {
 
            answer = "Oops, Looks like Susi is taking a break, She will be back soon";
 
        }
 
    });
    */
    //message.reply(answer);
    //message.reply(message.body);
    console.log(answer);
    //console.log(message.body);
});
 
let server = http
    .createServer(bot.incoming())
    .listen(port);
//http.createServer(bot.incoming()).listen(8080);

