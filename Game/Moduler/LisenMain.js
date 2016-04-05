//gets playerList from localStorage
var playerList = JSON.parse(window.localStorage.getItem("playerList"));

//shows if mission is successed or fail.
var missions = [
{number: 2, status: "success"},
{number: 3, status: ""},
{number: 2, status: ""},
{number: 3, status: ""},
{number: 3, status: ""}
];

//this is golbal, shows the current mission. adds 1 everytime a mission is played
var currentMission = 0

function showRole(playerList){
  /*
  All the players can see theris role in the game
  */
	//position is the variable that counts how many palyers have got theier roles

  /*main2 ska inte ha en höjd som är över hela skärmen utan vi lägger det som ska visas
  där i och knappen för att gå vidare i .main så den ligger stilla även om man byter innehåll.
  Jag vill ha en knapp för att det bli en knapp på det andra stället. KONSEKVENS!!!!
  */
	document.getElementById("main").innerHTML = "<div class='main2' id='showRole'></div>";
	$("#showRole").append("<h1 class='name'></h1>");
	$("#showRole").append("<h2 id='instructions'>Everyone will now be assigned a role (don't show the others)</h2>");
	$("#main").append('<button type="button" name="move on" id="next" class="button"> Next </button>');

	$("#next").one("click", function(){
		$("#instructions").fadeOut(500);
	});

	var position = 0;
	//when the user taps the screen
	$("#showRole").on("click", function(){
		console.log(position)
		//the value of h1 is saved i variable
		var h1 = $(".name").text().trim();
		//if the variable is empty and the position variable is 0..
		if (position == 0 && h1 == ""){
			//dispaly the firts name
			var name = playerList[position].name;
			$(".name").hide().text(name).fadeIn(1000);
			$("#continue").hide().fadeIn(1000);
		}
		//if the h1 says good or eveil we want it to dispaly the next name
		else if(h1 == "evil" || h1 == "good"){
			//before it displays a new name the position variable gets one bigger
			position++;
			if (position < 5){
				//the name at that position is displayed
				var name = playerList[position].name;
				$(".name").hide().text(name).fadeIn(1000);
				$("#continue").hide().fadeIn(1000);
			}
			else{
				//the div its in are hidden
				$(".name").fadeOut(1000);
				$("#continue").fadeOut(500);
				$("#showRole").empty();
				//$("#eyes").show();
			}
		}
		else if(position < 5){
			//displaay a role if none of the above happens
			var role = playerList[position].role;
			$(".name").hide().text(role).fadeIn(1000);
			$("#continue").hide().fadeIn(1000);
		}
		else{
			var assignedLeader = assignLeader("x" , playerList);
			look(assignedLeader);
		}
	});

}

function assignLeader(lastLeader, playerList){
	/*
  randomizes a leader if first round (assignedleader = 0)
	 else passes it to next player (assignedLeader + 1)
   */
	if (lastLeader == "x") {
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

function look(assignedLeader) {
  /*
  averybody close their eyes and the två whos evil finds each other
  */
	var audio = new Audio("../ping.mp3");
	var leader = assignedLeader.name
	document.getElementById("main").innerHTML = "<div class='main' id='look'></div>";
	$("#look").append("<h1 id='h1s'>" + leader + ", you are the gameleader!</h1>");
	$("#look").append("<h2 id='evilH1'><ol id='list' style='text-align: left;'></ol></h2>");
	$("#list").append("<li>At the first tone, every one will close their eyes.</li>");
	$("#list").append("<li>At the second tone, the ones who are evil can open their eyes and locate each other.</li>");
	$("#list").append("<li>At the third tone, evil will close their eyes.</li>");
	$("#list").append("<li>At the fourth tone, everyone can open their eyes.</li>");
	$("#list").append("<li>Click the screen to continue.</li>");

	$("#look").one("click", function() {
		setTimeout(function() {
			//after 1 second a tone will ring and everyone closes their eyes
			audio.play();
			setTimeout(function() {
				//after 3 more seconds another tone will ring the evil players will open their eyes
				audio.play();
				setTimeout(function() {
					//after 8 more seconds another tone will ring and evil players will close their eyes
					audio.play();
					setTimeout(function() {
						//after 2 more seconds the last tone will ring and all players open their eyes
						audio.play();
						setTimeout(function() {
							//here is a bug. This one is running but there is not tone.
							audio.play();
						},2000);
					},2000);
				},8000);
			},3000);
		},1000);
		setTimeout(function(){
	        $("#main").empty();
	        nominatePlayers(leader);
	        //20seconds
		}, 4000);
	});
}


function nominatePlayers(leader){
  /*
  Nominate the players the gameleader wants to send on the mission
  */
	//document.getElementById("main").innerHTML = "<div class='main' id='boradGame'></div>"
	mission();
	$("#main").append("<div class='main' id='boardGame'></div>")
	//shows how many players can be sent on a mission
	var num = missions[currentMission].number;
	$("#boardGame").append('<h2 class="name" >' + leader + ', pick ' +  missions[currentMission].number  + ' players to send on the mission!</h2>');
	var numPlay = missions[currentMission].number;

	//adds one dropdownmenue for each player that can be sent on the mission
	for(var i = 0; i < playerList.length; i++){
		$("#boardGame").append('<h3 class="chosen">' + playerList[i].name + '</h3>');
	}

	//makes a list of the nominated
	var nominated = [];
	var n = 0;
	$("#boardGame").append('<button type="nominate" name="button" id="nominate" class="button">Nominate! </button>');
	$("#boardGame").append('<br>');
	$("#boardGame").append('<button type="remove" name="button" id="remove" class="button">Remove! </button>');

	$(".chosen").on("click", function(){
		//border på den som är nominerad
		if (n< numPlay){
			//om listan inte är full lägg till den i listan
			$( this ).css( "background-color", "#444" );
			nominated.push($(this).text());
			console.log(nominated);
			n++;
		}
		$("#nominate").on("click", function(){
			$("#main").empty();
			//run votesFunction()
      votesFunction(nominated)
		});
		$("#remove").on("click", function(){
      //empty the array of nominees <-stavas det så? and resets the background
			nominated = [];
			n=0;
			$(".chosen").css("background-color", "#222")
		})
	});
}

function mission(){
	//shows what mission you are at, what missions have failed and succceeded

	//adds a new divtag
	//adds a h3 tag which will hold all the missions
	$("#main").append('<ul id="mission"></ul>');

	for (var i= 0; i < 5; i++ ){
		//check each mission...
		if (missions[i].status == "success"){
			//if its a success
			$("#mission").append('<li class="listInline">Mission'+ (i+1) +': Success </li>');
		}
		else if (missions[i].status == "fail"){
			//if its a fail
			$("#mission").append('<li class="listInline">Mission '+ (i+1) +': Fail </li>');
		}
		else if (missions[i] == currentMission){
			//highlight the current mission
			$("#mission").append('<li class="listInline">Mission > ' + (i+1) + '</li>').css("background-color", "#555");
		}
		else{
			//writes out the comming mission
			$("#mission").append('<li class="listInline">Mission: ' + (i+1) + '</li>');
		}
	}
}

function votesFunction(nominated){
  /*
  lets the nominated vote for the mission to succeed or fail
  */
  //creates the di, an h1 for the name, and a button to mive on with and an empty array to hold the votes
  var voteList = []
  /*main2 ska inte ha en höjd som är över hela skärmen utan vi lägger det som ska visas
  där i och knappen för att gå vidare i .main så den ligger stilla även om man byter innehåll.
  Jag vill ha en knapp för att det bli en knapp på det andra stället. KONSEKVENS!!!!
  */
  $("#main").append("<div class='main2' id='vote'></div>");
  $("#vote").append("<h1 class='name' id='name'></h1>");
  $("#main").append('<button type="button" name="fail" id="moveOn" class="button">Vote! </button>');
  //Keeps track of what person is voteing, or what index in the array
  var p=0;
  //every time someone presses the button moveOn
  $("#moveOn").on("click", function(){
    //changes the text on the button to "next person"
    $("#moveOn").text("next person");
    //it checks whats in the variable h1
    var h1 = $(".name").text();
    //if the name h1 is empty
    if (p == 0 && h1 == ""){
      //if there is notheing it displays the forst name, the index in the list that equals p
      var name = nominated[p];
      //fades in the name
      $(".name").hide().text(name).fadeIn(1000);
      //gives the player two buttons to vote with
      $("#vote").append('<br><button type="button" name="success" id="success" class="button">Success</button>');
      $("#vote").append('<button type="button" name="fail" id="fail" class="button">Fail</button>');

      //saves either success or fail to an array with all the votes and removes the buttons
      $("#success").on("click", function(){
        voteList.push("success");
        $("#success").remove();
        $("#fail").remove();
        p++;
      });

      $("#fail").on("click", function(){
        voteList.push("fail");
        $("#success").remove();
        $("#fail").remove();
        p++;
      });
    }
    //if the lenght of h1 is not 0, if there is a name displayed
    if (h1.length != 0){
      var name = nominated[p];
      //fades in the name
      $(".name").hide().text(name).fadeIn(1000);
      //gives the player two buttons to vote with
      $("#vote").append('<br><button type="button" name="success" id="success" class="voteButton">Success</button>');
      $("#vote").append('<button type="button" name="fail" id="fail" class="voteButton">Fail</button>');


      //saves either success or fail to an array with all the votes and removes the buttons
      $("#success").on("click", function(){
        voteList.push("success");
        $("#success").remove();
        $("#fail").remove();
        p++;
      });

      $("#fail").on("click", function(){
        voteList.push("fail");
        $("#success").remove();
        $("#fail").remove();
        p++;
      });
    }
    outCome(voteList)
  });

}

function outCome(voteList){
	shuffle(voteList);
	//check if the list of votes contains any fails or only success
	//creates a new div, a ul with the votes, a h2 and a h1
	$("#main").append("<div class='main' id='showVotes'></div>");
	$("#showVotes").append('<ul class="mission" id="votes""></ul>');
	$("#showVotes").append("<h2>The mission </h2>");
	$("#showVotes").append("<h1 id='outCome'></h1>");

	for (var i = 0; i < voteList.length; i++){
		//prints out all the shuffled vots
		//shuffle
		$("#votes").append('<li class="listInline">' + voteList[i] + '</li>');
	}

	if($.inArray("fail", voteList)){
		//prints out fail
		$("#outCome").hide().text("FAILED").fadeIn(4000)
	}
	else{
		//prints out success
		$("#outCome").hide().text("SUCCEEDED").fadeIn(4000)
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

showRole(playerList);
