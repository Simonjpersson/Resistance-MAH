var playerList = JSON.parse(window.localStorage.getItem("playerList"));

var missions = [
{number: 2, status: "success"},
{number: 3, status: "fail"},
{number: 2, status: "success"},
{number: 3, status: ""},
{number: 3, status: ""}
];
var missionSuccess = []
var missionFail = []
for (var i = 0; i < missions.length; i++) {
	if (missions.status === "success"){
		missionSuccess.push("success");
		console.log(missionSuccess)
	}
	else if (missions.status === "fail"){
		missionFail.push("fail");
		console.log(missionFail)
	}
};
var currentMission = 0


function showRole (playerList){
	//position is the variable that counts how many palyers have got theier roles
	document.getElementById("main").innerHTML = "<div class='main' id='showRole'></div>";
	$("#showRole").append("<h1 class='name'></h1>");
	$("#showRole").append("<h2 id='instructions'>Everyone will now be assigned a role (don't show the others)</h2>");
	$("#showRole").append("<h2 id='continue'>Click the screen to continue!</h2>");

	$("#main").one("click", function(){
		$("#instructions").hide();
	});

	var position = 0;
	//when the user taps the screen
	$("#showRole").on("click", function(){
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
		else if (position < 5){
			//displaay a role if none of the above happens
			var role = playerList[position].role;
			$(".name").hide().text(role).fadeIn(1000);
			$("#continue").hide().fadeIn(1000);
		}
	});
	
}

if (missionSuccess.length < 3 && missionFail.length < 3){
	currentMission++;
	console.log(currentMission)
	console.log(missionSuccess)
	console.log(missionFail)
	showRole(playerList);
}
else if (missionSuccess.length === 3){
	document.getElementById("main").innerHTML = "<div class='main' id='showRole'></div>";
	$("#showRole").append("<h1 class='name'>The good defeated the evil!</h1>");
	console.log("good won")
}
else if (missionFail.length === 3){
	document.getElementById("main").innerHTML = "<div class='main' id='showRole'></div>";
	$("#showRole").append("<h1 class='name'>The evil and destroyed the world!</h1>");
	console.log("evil won")
}
