// Test input
var missionPlayerList = ["Andre", "Hannes", "Lisen"];

function printMission(missionPlayerList){


	// Add html and css to page for each player (needs touching up) to start voting
	document.getElementById("main").innerHTML = "<h1>Vote for mission to succeed or fail! </h1>" 
    for (var i = 0; i < missionPlayerList.length; i++) {
    	document.getElementById("main").innerHTML += "<div id='vote"+i+"' style='height: 100px'><p style='float:left; width:300px'>"+missionPlayerList[i]+"</p>"
    	+ "<p id='success"+i+"' style='width:200px; float:left'>Success</p>"
    	+ "<p id='fail"+i+"' style='width:200px; float:left'>Fail</p>"
    	+ "</div>"
    	;
    };


}

function passOrFailMission(missionPlayerList){

	var success = 0;
	var fail = 0;

	printMission(missionPlayerList);

	/* Code below officially sucks */

	// Player at index 0 vote success, remove player from view
	document.getElementById("success0").addEventListener("click", function(){
		voteTracker("Pass!", missionPlayerList);
		success += 1;
		$("#vote0").remove();
		if (success + fail == missionPlayerList.length){
			$("#main").empty();
		}
	});

		// Player at index 1 vote success, remove player from view
	document.getElementById("success1").addEventListener("click", function(){
		voteTracker("Pass!", missionPlayerList);
		$("#vote1").remove();
		if (success + fail == missionPlayerList.length){
			$("#main").empty();
		}
	});

		// Player at index 2 vote success, remove player from view
	document.getElementById("success2").addEventListener("click", function(){
		voteTracker("Pass!", missionPlayerList);
		$("#vote2").remove();
		if (success + fail == missionPlayerList.length){
			$("#main").empty();
		}
	});

		// Player at index 0 vote success, remove player from view
	document.getElementById("fail0").addEventListener("click", function(){
		voteTracker("Fail!", missionPlayerList);
		$("#vote0").remove();
		if (success + fail == missionPlayerList.length){
			$("#main").empty();
		}
	});

		// Player at index 1 vote success, remove player from view
	document.getElementById("fail1").addEventListener("click", function(){
		voteTracker("Fail!", missionPlayerList);
		$("#vote1").remove();
		if (success + fail == missionPlayerList.length){
			$("#main").empty();
		}
	});

		// Player at index 2 vote success, remove player from view
	document.getElementById("fail2").addEventListener("click", function(){
		voteTracker("Fail!", missionPlayerList);
		$("#vote2").remove();
		if (success + fail == missionPlayerList.length){
			$("#main").empty();
		}
	});

/*
	$("#success0").click(function() {
		success += 1;
		voteList.push("Pass!");
		$("#vote0").remove();


	});
	

	// Player at index 1 vote success, remove player from view
	$("#success1").click(function() {
		success += 1;
		voteList.push("Pass!");
		$("#vote1").remove();


	});

	// Player at index 2 vote success, remove player from view
	$("#success2").click(function() {
		success += 1;
		voteList.push("Pass!");
		$("#vote2").remove();


	});

	// Player at index 0 vote fail, remove player from view
	$("#fail0").click(function() {
		fail += 1;
		voteList.push("Fail!");
		$("#vote0").remove();

			
	});

	// Player at index 1 vote fail, remove player from view
	$("#fail1").click(function() {
		fail += 1;
		voteList.push("Fail!");
		$("#vote1").remove();
	
	});

	// Player at index 2 vote fail, remove player from view
	$("#fail2").click(function() {
		fail += 1;
		voteList.push("Fail!");
		$("#vote2").remove();
	
	});
*/

}

function voteTracker(passOrFail, missionPlayerList){

	var voteList = [];
	voteList.push(passOrFail);
	console.log(voteList);

	if (passOrFail && missionPlayerList == undefined) {
		console.log(voteList);
		return voteList;
	} else {
		return
	}


};

console.log(passOrFailMission(missionPlayerList));