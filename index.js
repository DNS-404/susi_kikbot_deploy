var http = require('http');
var Bot = require('@kikinteractive/kik');
var request = require('request')
var answer;
 
var bot = new Bot({
 
    username: 'susi.ai',
    apiKey: 'b5a5338b-b744-45fe-a4c5-629fda1851bd',
    baseUrl: 'https://susi-kik-bot.herokuapp.com/webhook'
 
});
 
bot.updateBotConfiguration();
 
bot.onTextMessage((message) => {
 
    request('https://api.susi.ai/susi/chat.json?timezoneOffset=-330&q=' + encodeURI(query), function(error, response, body) {
 
        if (!error && response.statusCode == 200) {
 
            answer = JSON.parse(body).answers[0].actions[0].expression;
 
        } else {
 
            answer = "Oops, Looks like Susi is taking a break, She will be back soon";
 
        }
 
    });
 
    message.reply(answer);
});
 
http.createServer(bot.incoming()).listen(process.env.PORT || 5000);