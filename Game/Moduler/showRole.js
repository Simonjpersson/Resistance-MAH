/*
2.1   Visa första personens namn
2.2   Klicka för att visa tilldelad roll
2.3   Visa visa tilldelad
2.4   Klicka för att ta bort
2.5   Visa nästa spelares namn

en global variable som håller koll på vilken spelare den äro på
byter sida till den här
*/

var playerlist = JSON.parse(window.localStorage.getItem("playerList"));

//position is the variable that counts how many palyers have got theier roles
//SHOULD THIS BE GLOBAL!?
var position = 0;
//when the user taps the screen
$(".main").on("click", function(){
    //the value of h1 is saved i variable
    var h1 = $(".name").text().trim();
    //if the variable is empty and the position variable is 0..
    if (position == 0 && h1 == ""){
      //dispaly the firts name
      var name = playerlist[position].name;
      $(".name").hide().text(name).fadeIn(1000);
    }
    //if the h1 says good or eveil we want it to dispaly the next name
    else if(h1 == "Evil" || h1 == "Good"){
      //befor it displays a new name the position variable gets one bigger
      position++;
      if (position < 5){
        //the name at that position is displayed
        var name = playerlist[position].name;
        $(".name").hide().text(name).fadeIn(1000);
      }
      else{
        //the div its in are hidden
        $(".name").fadeOut(1000)
        $("#roles").hide();
        //$("#eyes").show();
      }
    }
    else{
      //displaay a role if none of the above happens
      var role = playerlist[position].role;
      $(".name").hide().text(role).fadeIn(1000);
    }
  });
