

function votesFunction(nominated){
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
			outCome(voteList);
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

function outCome(voteList){
	//shuffles the list of votes so you cant see who voted
	shuffle(voteList);

	//creates a new div, a ul with the votes, a h2 and a h1
	$("#main").append("<div class='main' id='showVotes'></div>");
	$("#showVotes").append('<ul class="mission" id="votes""></ul>');
	$("#showVotes").append("<h2>The mission </h2>");
	$("#showVotes").append("<h1 id='outCome'></h1>");

	for (var i = 0; i < voteList.length; i++){
		//prints out all the shuffled vots
		$("#votes").append('<li class="listInline">' + voteList[i] + '</li>');
	}

	var failed = false;
	//checks if any of the votes is a fail
	for (var i = 0; i < voteList.length; i++) {
		if(voteList[i] == "fail"){
			//prints out fail
			failed= true;
			$("#outCome").hide().text("FAILED").fadeIn(4000)
			//currentMission++;
		}
	}
	//prints out success
	if(failed == false){
	console.log("Success");
	$("#outCome").hide().text("SUCCEEDED").fadeIn(4000)
	//currentMission++;
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

votesFunction(nominated)
