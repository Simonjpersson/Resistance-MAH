$("#playerForm").on("submit", function(e){
    // Prevents form from sending before testing input
    e.preventDefault();

    // Control variable to test input
    var validate = true;

    // Empty array which will later contain all 5 players
    var playerList = [];

    // Create roles and assign them randomly with function shuffle
    var roleList = ["evil", "evil", "good", "good", "good"];
    var shuffledRoleList = shuffle(roleList);

    // Adds values from form to playerList
    var formInput = $("#playerForm").find("input[type=text]");
    for (var i = 0; i < formInput.length; i++) {
        //playerList.push($(formInput[i]).val());
        var player = {
            name: $(formInput[i]).val(),
            role : shuffledRoleList[i]
        };
        // console.log(player);
        playerList.push(player);
        console.log(playerList);
    };
    
    // Test input (add in later iterations?)
    if(validate == false){
    	// Do stuff to tell user input was incorrect

    }else{
    	// Input accepted

        // Adds playerList to localStorage as storedPlayerList
        window.localStorage.setItem("playerList", JSON.stringify(playerList));
        //relocate to show roles to players
        e.target.submit();

	}
});

/*
Function that takes in list of five roles and shuffles them. 
Returns shuffled list.
*/
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