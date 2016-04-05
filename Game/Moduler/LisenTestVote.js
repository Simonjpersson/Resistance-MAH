var nominated = ["Hannes", "Lisen", "André"];
var votes = [];
var player = 0;

function votesFunction(){
  //creates the di, an h1 for the name, and a button to mive on with
  $("#main").append("<div class='main' id='vote'></div>");
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
        votes.push("success");
        $("#success").remove();
        $("#fail").remove();
        p++;
      });

      $("#fail").on("click", function(){
        votes.push("fail");
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
        votes.push("success");
        $("#success").remove();
        $("#fail").remove();
        p++;
      });

      $("#fail").on("click", function(){
        votes.push("fail");
        $("#success").remove();
        $("#fail").remove();
        p++;
      });
    }
  });
}
    //if there is a name it displays the next name in the list
    //var person =$.inArray(h1, nominated)



    /*
    $("#vote").append('<button type="button" name="success" id="success" class="voteButton">Success</button>');
    $("#vote").append('<button type="button" name="fail" id="fail" class="voteButton">Fail</button>');
    $(".main").hide().fadeIn(1000);
    for (var i = 0; i < nominated.length; i++) {
      var nom = nominated[i]
      $(".name").hide().text(nom).fadeIn(1000);
      console.log(nom);
      player++;

      $("#success").on("click", function(){
        votes.push("success");
        console.log(votes);
      });

      $("#fail").on("click", function(){
        votes.push("fail");
        console.log(votes);
      });
    };
  });
}

function coolPool() {
  console.log("Poooppoiopoer")
}
*/
votesFunction()
