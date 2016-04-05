var voteList = ["success", "success", "fail"]

function outCome(){
  //check if the list of votes contains any fails or only success
  //creates a new div, a ul with the votes, a h2 and a h1
  $("#main").append("<div class='main' id='showVotes'></div>");
  $("#showVotes").append('<ul class="mission" id="votes""></ul>');
  $("#showVotes").append("<h2>The mission </h2>");
  $("#showVotes").append("<h1 id='outCome'></h1>");

  for (var i = 0; i < voteList.length; i++){
    //prints out all the shuffled vots
    //shuffle
    $("#votes").append('<li class="listInline">' + voteList[i] + '</li>');
  }

  if($.inArray("fail", voteList)){
    //prints out fail
    $("#outCome").hide().text("FAILED").fadeIn(4000)
  }
  else{
    //prints out success
    $("#outCome").hide().text("SUCCEEDED").fadeIn(4000)
  }
}

outCome()
