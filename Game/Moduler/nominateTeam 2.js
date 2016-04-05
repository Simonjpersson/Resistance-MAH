// Test input
var missionPlayerList = [
    {name : "Andre", role : "evil"},
    {name : "Hannes", role : "good"},
]
/*
    Prints nominated players and allows gameleader to click if mission is a go or not
*/

function acceptDenyNominatedPlayers(missionPlayerList){
    // Add html and css for page (needs touching up!!!)
    document.getElementById("main").innerHTML = "<h1>Vote for nominated players to go on mission</h1>" 
            + "<div id='goTeam' style='width: 200px; height: 200px; float: left'>YES!</div>"
            + "<div id='noTeam' style='width: 200px; height: 200px; float: right'>NO!</div>"
            + "<div id='players'style='width: 400px; height: 100px; float: left'></div>"
            + "<div id='result'style='width: 400px; height: 100px; float: left; font-size: 300%;'></div>"
    ;

    var printPlayers = missionPlayerList.map(function (player) {
        return player.name;
    }).join(" & ");
    $("#players").text("Nominated players: " + printPlayers);

    // click on yes to accept mission
    $("#goTeam").click(function() {
        $("#result").text("Team accepted!");

        // Delete all content and move to next phase after 3 sec
        setTimeout(function(){
            $("#main").empty();
        }, 3000)
        // Go to mission phase
        // return goForIt
    });

    // click on no to deny mission
    $("#noTeam").click(function() {
        $("#result").css("color", "red");
        $("#result").text("Team denied!");

        // Delete all content and restart nominating phase after 3 sec
        setTimeout(function(){
            $("#main").empty();
        }, 3000)
        // new assigned leader, new vote
        // return noGo
    });

}



acceptDenyNominatedPlayers(missionPlayerList)