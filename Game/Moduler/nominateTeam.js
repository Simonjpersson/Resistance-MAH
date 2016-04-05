// Test input
nominated =["hannes", "Andre", "Lisen"]
/*
    Prints nominated players and allows gameleader to click if mission is a go or not
*/

function acceptDenyNominatedPlayers(missionPlayerList){
    // Add html and css for page (needs touching up!!!)
    document.getElementById("main").innerHTML = "<h1>Vote for nominated players to go on mission</h1>"
            + "<h2 id='players'></h2>"
            + "<h1 id='result'></h1>"
            + "<button class='button' id='goTeam' >YES!</button>"
            + "<button class='button' id='noTeam' >NO!</button>"
    ;

    var printPlayers = missionPlayerList.map(function (player) {
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
            //Mmission()
        }, 3000);
    });

    // click on no to deny mission
    $("#noTeam").one("click", function() {
        $("#result").css("color", "red");
        $("#result").text("Team denied!");
        $(".button").remove();
        // Delete all content and restart nominating phase after 3 sec
        setTimeout(function(){
            $("#main").empty();
            console.log("genererar en ny spelledare och kör numberOfPlayers igen");
        }, 3000);
        // new assigned leader, new vote
        // return noGo
    });

}



acceptDenyNominatedPlayers(nominated)
