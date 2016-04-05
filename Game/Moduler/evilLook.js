function look() {
	//var audioElement = document.createElement('audio');
    //audioElement.setAttribute('src', 'ping.mp3');
	var audio = new Audio("../ping.mp3");
	$("#main").hide();
	$("body").one("click", function() {
		$("#main").show(500);
		document.getElementById("main").innerHTML = "<h1 id='evilH1'>Now every one will close their eyes and at the tone, the ones who are evil can open their eyes and locate each other. At the second tone everyone can open their eyes. Tap the screen to contiue.</h1>" 
    ;
	});

	$("#main").one("click", function() {
		setTimeout(function() {
			//after 1 second a tone will ring and everyone closes their eyes
			audio.play();

			setTimeout(function() {
				//after 3 more seconds another tone will ring the evil players will open their eyes
				audio.play();
				setTimeout(function() {
					//after 8 more seconds another tone will ring and evil players will close their eyes
					audio.play();
					setTimeout(function() {
						//after 2 more seconds the last tone will ring and all players open their eyes
						audio.play();
						setTimeout(function() {
							//here is a bug. This one is not runnin and there is not tone.
							audio.play();
						},2000);
					},2000);
				},8000);
			},3000);
		},1000);
	});
	setTimeout(function(){
        $("#main").empty();
	}, 18000)
}

look()