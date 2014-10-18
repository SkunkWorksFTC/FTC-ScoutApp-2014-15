console.log("Started program");
var pg = require('pg');
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');

app.listen(process.env.PORT || 5000);
console.log("Required all modules");

function handler (req, res) {
  console.log("Starting request...");
  var filePath = "." + req.url;
  if(filePath == './') { filePath = './index.html'}
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.html':
      contentType = 'text/html';
  }
  path.exists(filePath, function(exists){
      if (exists) {
          fs.readFile(filePath, function(error, content) {
              if(error) {
                  res.writeHead(500);
                  res.end();
              }
              else {
                res.writeHead(200, {'Content-Type': contentType});
                res.end(content, 'utf-8');
              }
          });
      }
      else {
          res.writeHead(404);
          res.end();
      }
  });
}
console.log('Added file handler success!');

var dbPath = "postgres://lupaaeajuixdbb:r4rJIiThqRc80KkX7E5FfX2j_r@ec2-107-20-245-187.compute-1.amazonaws.com:5432/ddfv555ovil63d";
var db = new pg.Client(dbPath);
db.connect();

db.query("CREATE TABLE IF NOT EXISTS scouting(tablet INTEGER, match INTEGER, team INTEGER, alliance1 INTEGER, alliance2 INTEGER, deadbot BOOL, noshow BOOL, fataljam BOOL, startingposition TEXT, autopoints INTEGER, autogoals INTEGER, automoved INTEGER, kickstand BOOL, teleballs INTEGER, telestyle TEXT, teleshort INTEGER, telemedium INTEGER, telelarge INTEGER, endcenter INTEGER, endfinal INTEGER, results STRING)");

io.sockets.on('connection', function(socket) {
  socket.on('addEntry', function(data) {
    console.log("Database entry emit");
    db.query("INSERT INTO scouting(tablet, match, team, alliance1, alliance2, deadbot, noshow, fataljam, startingposition, autopoints, autogoals, automoved, kickstand, telestyle, teleshort, telemedium, telelarge, endcenter, endfinal, results) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)", [data.tablet, data.match, data.team, data.alliance1, data.alliance2, data.deadbot, data.noshow, data.fataljam, data.startingposition, data.autopoints, data.autogoals, data.automoved, data.kickstand, data.telestyle, data.teleshort, data.telemedium, data.telelarge, data.endcenter, data.endfinal, data.results]);
  });
})

    
