console.log("Started program");
var sqlite = require('sqlite3').verbose();
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');

app.listen(process.env.PORT || 5000);
console.log("required all modules");

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
console.log('Got this far');


file = 'db.sqlite';
var db = new sqlite.Database(file);
var dbexists = fs.existsSync(file);

db.serialize(function() { 
    if(!dbexists) {
        db.run("CREATE TABLE scouting (tablet INTEGER, match INTEGER, team INTEGER, alliance1 INTEGER, alliance2 INTEGER, deadbot BOOL, noshow BOOL, fataljam BOOL, startingposition TEXT, autopoints INTEGER, autogoals INTEGER, automoved INTEGER, kickstand BOOL, teleballs INTEGER, telestyle TEXT, teleshort INTEGER, telemedium INTEGER, telelarge INTEGER, endcenter INTEGER, endfinal INTEGER, results STRING)");
    }
});

io.sockets.on('connection', function(socket) {
  socket.on('addEntry', function(data) {
    console.log("Database entry emit");
    db.serialize(function() {
        console.log(data.team);
        db.run("INSERT INTO scouting VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.tablet, data.match, data.team, data.alliance1, data.alliance2, data.deadbot, data.noshow, data.fataljam, data.startingposition, data.autopoints, data.autogoals, data.automoved, data.kickstand, data.telestyle, data.teleshort, data.telemedium, data.telelarge, data.endcenter, data.endfinal, data.results]);
    });
  });
})

    
