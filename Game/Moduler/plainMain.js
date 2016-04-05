//gets playerList from localStorage
var playerList = JSON.parse(window.localStorage.getItem("playerList"));

//shows if mission is successed or fail.
var missions = [
{number: 2, status: ""},
{number: 3, status: ""},
{number: 2, status: ""},
{number: 3, status: ""},
{number: 3, status: ""}
];

var missionSuccess = 0;
var missionFail = 0;

//this is golbal, shows the current mission. adds 1 everytime a mission is played
var currentMission = 0;
var gameOn = 0;
var missionVote = 0;

function start(lastLeader){
	//starts the game
	//if no mission is played yet, the game will start with showing each others role
	if (currentMission == 0 && gameOn == 0){
		showRole(playerList);
	}
	
	else if (missionSuccess < 3 && missionFail < 3){
		//if none have won more then 3 missions the game will start over but it will not show roles
		//starts from numberOfPlayers
		var assignedLeaderIndex = assignLeader(lastLeader);
		numberOfPlayers(assignedLeaderIndex);
	}
	else if (missionSuccess == 3){
		//if good wins there will be a message that say that they have won
		document.getElementById("main").innerHTML = "<div class='main' id='showRole'></div>";
		$("#showRole").append("<h1 class='name'>The good defeated the evil!</h1>");
	}
	else if (missionFail == 3){
		//if evil win there will be a message that say that they have won
		document.getElementById("main").innerHTML = "<div class='main' id='showRole'></div>";
		$("#showRole").append("<h1 class='name'>The evil won and they destroyed the world!</h1>");
	}
}


function showRole (playerList){
	//position is the variable that counts how many palyers have got theier roles
	document.getElementById("main").innerHTML = "<div class='main' id='showRole'></div>";
	$("#showRole").append("<h1 class='name'></h1>");
	$("#showRole").append("<h2 id='instructions'>Everyone will now be assigned a role (don't show the others)</h2>");
	$("#showRole").append('<button type="button" name="button" id="moveOn" class="button">Next</button>');

	$("#moveOn").one("click", function(){
		$("#instructions").hide();
	});

	var position = 0;
	var p=0;
	//when the user taps the screen
	$("#moveOn").on("click", function(){
		p++;

		//the value of h1 is saved i variable

		if (p==1 || p==3 || p==5 || p==7 ||p==9){
			//the NAME at that position is displayed
			var name = playerList[position].name;
			$(".name").hide().text(name).fadeIn(500);
		}

		else if(p==2 || p==4 || p==6 ||p==8 || p==10){
			$(".name").hide().text("You are " + playerList[position].role).fadeIn(1000);
			position++;
		}

		else if (p==11){
			$(".name").hide().text("DONE").fadeIn(1000);
			$(".name").fadeOut(1000);
				$("#continue").fadeOut(500);
				$("#showRole").empty();
				var assignedLeaderIndex = assignLeader("");
			look(assignedLeaderIndex);
		}
	});
}

function assignLeader(lastLeaderIndex){
	// randomizes a leader if first round (assignedleader = "")  
	// else passes it to next player (assignedLeader + 1)
	if (lastLeaderIndex == "") {
		var assignedLeaderIndex = Math.floor((Math.random() * 5));
		return assignedLeaderIndex
	} 
	else{
	 	var assignedLeaderIndex = lastLeaderIndex + 1;
	 	// Change to lastLeader > playerList.length in later iterations
	 	if (lastLeaderIndex > 3){
	 		assignedLeaderIndex = 0;
	 		return assignedLeaderIndex
	 	};
	 	return assignedLeaderIndex
	};
}

function look(assignedLeaderIndex) {
	//this function does not run the second time
	//loads audio, a "pling"
	var audio = new Audio("../ping.mp3");
	//gets the gameleader
	var leader = playerList[assignedLeaderIndex].name
	//creates a div with all html
	document.getElementById("main").innerHTML = "<div class='main' id='look'></div>";
	$("#look").append("<h1 id='h1s'>" + playerList[assignedLeaderIndex].name + ", you are the gameleader!</h1>");
	$("#look").append("<h2 id='evilH1'><ol id='list' style='text-align: left;'></ol></h2>");
	$("#list").append("<li>At the first tone, every one will close their eyes.</li>");
	$("#list").append("<li>At the second tone, the ones who are evil can open their eyes and locate each other.</li>");
	$("#list").append("<li>At the third tone, evil will close their eyes.</li>");
	$("#list").append("<li>At the fourth tone, everyone can open their eyes.</li>");
	$("#look").append('<button type="remove" name="button" id="continue" class="button">Click here to continue!</button>');

	//if you click the button, the game starts and everyone follows the instructions in the list shown on the screen
	$("#continue").one("click", function() {
		$("#continue").fadeOut(500);
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
							//here is a bug. This one is running but there is no tone.
							audio.play();
						},2000);
					},2000);
				},8000);
			},3000);
		},1000);
		setTimeout(function(){
			//empty the main div and runs numberOfPlayers
	        $("#main").empty();
	        numberOfPlayers(assignedLeaderIndex);
	        //20seconds
		}, 4000);
	});	
}



function numberOfPlayers(assignedLeaderIndex){
	mission();
	$("#main").append("<div class='main' id='boardGame'></div>")
	//shows how man
	//$("#boardGame").append('<p class="name" id="missionVote" >' + missionVote + '!</p>');
	//shows how many players can be sent on a mission
	var num = missions[currentMission].number;
	$("#boardGame").append('<h2 class="name" >' + playerList[assignedLeaderIndex].name + ', pick ' +  missions[currentMission].number  + ' players to send on mission ' + (currentMission+1) + '!</h2>');
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
			n++;
		}
		$("#nominate").on("click", function(){
			$("#main").empty();
			//kör Hannes nominateVote
			acceptDenyNominatedPlayers(nominated, assignedLeaderIndex);
		});
		$("#remove").on("click", function(){
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
			$("#mission").append('<li class="listInline">Mission '+ (i+1) + ' - success' + '</li>');
		}
		else if (missions[i].status == "fail"){
			//if its a fail
			$("#mission").append('<li class="listInline">Mission '+ (i+1) + '- fail' + '</li>');
		}
		else if (missions[i] == currentMission){
			//highlight the current mission
			$("#mission").append('<li class="listInline">Mission > ' + (i+1) + ' - denna e det!' + '</li>').css("background-color", "#555");
		}
		else{
			//writes out the comming mission
			$("#mission").append('<li class="listInline">Mission: ' + (i+1) + '</li>');
		}
	}
}

function acceptDenyNominatedPlayers(nominated, assignedLeaderIndex){
    // Add html and css for page (needs touching up!!!)
    document.getElementById("main").innerHTML = "<h1>Vote for nominated players to go on mission</h1>"
            + "<h2 id='players'></h2>"
            + "<h1 id='result'></h1>"
            + "<button class='button' id='goTeam' >YES!</button>"
            + "<button class='button' id='noTeam' >NO!</button>"
    ;

    var printPlayers = nominated.map(function (player) {
        return player;
    }).join(" & ");

    $("#players").text("Nominated players: " + printPlayers);
    // click on yes to accept mission
    $("#goTeam").one("click", function() {
        $("#result").text("Team accepted!");
        $(".button").remove();

        setTimeout(function(){
            $("#main").empty();
            console.log("kör missions");
            votesFunction(nominated, assignedLeaderIndex);
            //runs votesFunction after 3 seconds()
        }, 3000);
    });

    // click on no to deny mission
    $("#noTeam").one("click", function() {
        $("#result").css("color", "##7C0000");
        $("#result").text("Team denied!");
        $(".button").remove();
        // Delete all content and restart nominating phase after 3 sec
        setTimeout(function(){
            $("#main").empty();
            console.log("genererar en ny spelledare och kör numberOfPlayers igen");
            missionVote++;
            gameOn++;
            start(assignedLeaderIndex);
            //runs numberOfPlayers() after 3 seconds
        }, 3000);
        // new assigned leader, new vote
        // return noGo
    });

}

function votesFunction(nominated, assignedLeaderIndex){
	/*
	Let the players vote and registers their votes. passes them on to the outcome funcction
	*/
	//creats a list to hold the votes
	var voteList = [];

	//creates the di, an h1 for the name, and a button to move on with
	$("#main").append("<div class='main' id='vote'></div>");
	$("#vote").append("<h1 class='name' id='name'></h1>");
	 $("#vote").append("<p class='name' id='instructions'>The nominated players will now vote to either try to fail or succeed the mission. </p>")
	$("#main").append('<button type="button" name="fail" id="moveOn" class="button"> Start Voting! </button>');
	//Keeps track of what person is voting, or what index in the array
	var p = 0;

	//every time someone presses the button moveOn
	$("#moveOn").on("click", function(){
		//..the instructioons are removed
		$("#instructions").remove();

		//it changes the text on the button to "next person"
		if (voteList.length < nominated.length-1){
			$("#moveOn").text("next person");
		}
		//or to Result if its the last person voting
		else if (voteList.length == nominated.length-1){
			$("#moveOn").text("Result");
		}

		//when voteList is equal to the lenght of the list of players. it means that everyone has voted then it moves on to outCome()
		if (voteList.length == nominated.length){
			$("#vote").remove();
			$("#moveOn").remove();
			outCome(voteList, assignedLeaderIndex);
		}
		else{
			//else it sho the person and let them vote
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
	});
}

function outCome(voteList, assignedLeaderIndex){
	//shuffles the list of votes so you cant see who voted
	shuffle(voteList);

	//creates a new div, a ul with the votes, a h2 and a h1
	$("#main").append("<div class='main' id='showVotes'></div>");
	$("#showVotes").append('<ul class="mission" id="votes""></ul>');
	$("#votes").append('<li class="listInline">votes: </li>');
	$("#showVotes").append("<h2>The mission </h2>");
	$("#showVotes").append("<h1 id='outCome'></h1>");

	for (var i = 0; i < voteList.length; i++){
		//prints out all the shuffled vots
		$("#votes").hide().append('<li class="listInline">' + voteList[i] + '</li>').fadeIn(4000);
	}

	var failed = false;
	//checks if any of the votes is a fail
	for (var i = 0; i < voteList.length; i++) {
		if(voteList[i] == "fail"){
			//prints out fail
			failed = true;
			$("#outCome").hide().text("FAILED").fadeIn(4000);
			missions[currentMission].status = "fail"
			currentMission++;
			missionFail++;
			console.log(missionFail + "Fail");
			if(failed == true) { break; }
		}
	}
	//prints out success
	if(failed == false){
		$("#outCome").hide().text("SUCCEEDED").fadeIn(4000);
		missions[currentMission].status = "success"
		currentMission++;
		missionSuccess++;
	}
	$("#outCome").append('<br><button type="button" name="success" id="nextRound" class="button">Next Round!</button>');
	$("#nextRound").on("click", function(){
		$("#main").empty();
		console.log(missionSuccess + "success");
		missionVote = 0;
		start(assignedLeaderIndex);
	});
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

//starts the game
start()