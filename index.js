var socket;

socket = io.connect("//scout-ftc-web-app.heorkuapp.com:80");

function show(id) { //Makes sure the match selection isn't shown until they've selected a match
    document.getElementById(id).style.visibility= "visible"; //Shows entire div match
}

function hide(id) { //Called body onLoad, hides matches from view
    document.getElementById(id).style.visibility= "hidden"; //Hides entire div match
}

function load() {
    hide("match");
    hide("button");
}

function sendData() {
	data = {};
	data.match = null;
	data.tablet = $('#selTab').val();
	data.team = $('#selMatch').val();
	data.alliance1 = null;
	data.alliance2 = null;
	data.deadbot = null;
	data.noshow = null;
	data.fataljam = null;
	data.startingposition = null;
	data.autopoints = null;
	data.autogoals = null;
	data.automoved = null;
	data.kickstand = null
	data.telestyle = null;
	data.teleshort = null;
	data.telemedium = null;
	data.telelarge = null;
	data.endcenter = null;
	data.endfinal = null;
	data.results = null;
	console.log(data);
	socket.emit('addEntry', data);
        window.location.href = "game.html";
}
$(document).ready( function(){ //Makes sure the html is ready before looking for #selTab

$("#selTab").change(function() {
  show("match");
});
$("selMatch").change(function() {
  show("bottomRight");
});

});

/* data.tablet, data.match, data.team, data.alliance1, data.alliance2, data.deadbot, data.noshow, data.fataljam, data.startingposition, data.autopoints, data.autogoals, data.automoved, data.kickstand, data.telestyle, 
   data.teleshort, data.telemedium, data.telelarge, data.endcenter, data.endfinal, data.results*/
