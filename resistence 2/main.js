// var baseurl = "https://resistence.firebaseio.com/";
/*all of the global variables are at the top
then all eventhandelers
then all functions that do something
Devide the functions in to small functions*/



/*
ALL Lobal variables!
*/

//link to firebase
var baseurl = "https://lizzo.firebaseio.com/";

//referense to the main  repository
var resistenceRef = new Firebase(baseurl);

// true = create new game, false = join game
var shouldCreateGame = false;

//making glboal variables of the buttons
var createGame = $('#create-game'),
    joinGame = $('#join-game'),
    submitGame = $('#submit-game'),
    startGame = $('#start-game');

//global varable with all the players in the lobby
var lobbyPlayerList = $('#lobby-players');

//global varables for the stte of the game
//varför gjorde vi en dict av den?
var user = { name: "" };
var game;
var gameID;

/*
ALL the events
*/
createGame.on('click', function() {
    //when someone clicks create new game
    shouldCreateGame = true;
    user.name = $('#username').val();
    //hide step on show step two
    $('#game-form-step-1').hide();
    $('#game-form-step-2').show();
});

joinGame.on('click', function() {
    // when someone clicks join game set create game to false cus we're not creating a new game
    shouldCreateGame = false;
    user.name = $('#username').val();
    // hide step one show step two
    $('#game-form-step-1').hide();
    $('#game-form-step-2').show();
    // NOTE: check if game exists
});

submitGame.on('click', function() {
    // when someone clicks submit game
    var gameName = $('#game-name').val();

    // Create or join a gam
    if (shouldCreateGame) {
        // if createNewGame is true set the game ID to the name the creator gave the game
        gameID = gameName;
        // Creates a new game @ firebase
        createNewGame(gameName);
        // Adds a new player to a game
        addPlayerToGame(user.name, gameName);
    } else {
        // If the player are joining an existing game with that already has a name
        gameID = gameName;
        // Adds a new player to an existing game
        addPlayerToGame(user.name, gameName);
    }

    listenToNewPlayerNames(gameName);
    listenToRemovedPlayerNames(gameName);

    $('#game-form-step-2').hide();
    $('#lobby').show();
});

startGame.on('click', function() {
    var numberOfPlayers = $("#lobby-players li").length;
    if (numberOfPlayers >= 5 && numberOfPlayers <=10){
        alert("Hola");
    }
    else{
        alert("ni är för många eller för få");
    }
});

/*
ALL functions
*/

// Adds a new game to firebase
function createNewGame(name) {
    //sets the data to send to firdebase
    //NOTE we may add some more data to this
    var data = {
        name: name,
        hasStarted: false,
        currentMission: 0
    };

    // Global reference to game data
    game = data;

    //sets the game key to the game name in the repository games with the data
    resistenceRef.child('games/' + name).set(data);
}

// Add a new player to a game
function addPlayerToGame(username, game) {
    // resistenceRef = lizzo rep, cild -> players rep, gamme name is the key to the game we want to add players to,
    // push = adds, you can not use set before you push but you can chain them. Set usernmae
    resistenceRef.child('players/' + game).push().set({
        name: username
    });
}


/*
ALL listeners
*/

// Add list elements from player names
function listenToNewPlayerNames(game) {
    //when a child is added to the players rep
    resistenceRef.child('players/' + game).on('child_added', function(snapshot) {
        //get the snapshot of the rep and save its value to player
        var player = snapshot.val();
        //add the added player to the list of players
        lobbyPlayerList.append("<li>" + player.name + "</li>");
    });
}

//if a name is removed
function listenToRemovedPlayerNames(game){
    // when a cild is removed from the rep take a snapshot of the name
    resistenceRef.child('players/' + game).on('child_removed', function(snapshot){
        //save the value of hte snapshot
        var player = snapshot.val();

        // a zepto event called each that gives the index of a litst item and the item
        $("#lobby-players li").each(function(index, li){
            //if one of the list items are equal to player name that is removed
            if ($(li).text() == player.name){
                //remove it
                $(this).remove();
            }
        });
    });
}
