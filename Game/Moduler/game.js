/*
4.1   Visa alla uppdrag missions (Dict) Lisen
4.2   (visa vart i nedräkningen man är) countdown (Lisen)
4.3   Visa hur många personer som ska skickas på uppdrag (finns i missions dict) Lisen
4.4   Två dropdownmenyer med alla spelares namn. Lisen
4.5   De som väljs Lisen
*/
var playerList = [
	{name : "Andre", role : "evil"},
	{name : "Hannes", role : "good"},
	{name : "Lisen", role : "good"},
	{name : "Sebbe", role : "good"},
	{name : "Anton", role : "evil"},
]
/*
function assignLeader(lastLeader, playerList){
	// randomizes a leader if first round (assignedleader = 0)
	// else passes it to next player (assignedLeader + 1)
	if (lastLeader == undefined) {
		var assignedIndex = Math.floor((Math.random() * 5));
		var assignedLeader = playerList[assignedIndex];
		return assignedLeader
	} else{
	 	var assignedLeader = playerList[lastLeader + 1];
	 	if (lastLeader > 3){
	 		assignedLeader = playerList[0];
	 	};
	 	return assignedLeader
	};
}
*/



var missions = [
  {number: 2, status: "fail"},
  {number: 3, status: "success"},
  {number: 2, status: ""},
  {number: 3, status: ""},
  {number: 3, status: ""}
];


//Den ska uppdateras
var currentMission = 2
function numberOfPlayers(){
	//document.getElementById("main").innerHTML = "<div class='main' id='boradGame'></div>"
	$("#main").append("<div class='main' id='boardGame'></div>")
  //shows how many players can be sent on a mission
	var num = missions[currentMission].number;
  $("#boardGame").append('<h2 class="name" > Pick ' +  missions[currentMission].number  + ' players to send on the mission </h2>');
  var numPlay = missions[currentMission].number;

  //adds one dropdownmenue for each player that can be sent on the mission
	for(var i = 0; i < playerList.length; i++){
		$("#boardGame").append('<h3 class="chosen">' + playerList[i].name + '</h3>');
	}

	//makes a list of the nominated
	var nominated = [];
	var n = 0;
	$("#boardGame").append('<button type="nominate" name="button" id="nominate">Nominate! </button>');
	$("#boardGame").append('<br>');
	$("#boardGame").append('<button type="remove" name="button" id="remove">Remove! </button>');

	$(".chosen").on("click", function(){
		//border på den som är nominerad
		if (n< numPlay){
			//om listan inte är full lägg till den i listan
			$( this ).css( "background-color", "blue" );
			nominated.push($(this).text());
			console.log(nominated);
			n++;
		}
		$("#nominate").on("click", function(){
			console.log("ABAS");
			$("#main").empty();
			//kör Hannes nominateVote
		});
		$("#remove").on("click", function(){
			nominated = [];
			n=0;
			$(".chosen").css("background-color", "black")
		})
	});
}

function mission(){
	//shows what mission you are at, what missions have failed and succceeded

	//adds a new divtag
	$("#main").append("<div class='main' id='gameBoard'></div>");
	//adds a h3 tag which will hold all the missions
	$("#gameBoard").append('<h3 class="mission"> </h3>');

	for (var i= 0; i < 5; i++ ){
		//check each mission...
		if (missions[i].status == "success"){
			//if its a success
			$(".mission").append(' Mission '+ (i+1) +': Success ');
		}
		else if (missions[i].status == "fail"){
			//if its a fail
			$(".mission").append('Mission '+ (i+1) +': Fail ');
		}
		else if (missions[i] == currentMission){
			//highlight the current mission
			$(".mission").append(' Mission > '+ (i+1)).css("background-color", "#444"	);
		}
		else{
			//writes out the comming mission
			$(".mission").append('Mission: ' + (i+1));
		}
	}
}


mission()
