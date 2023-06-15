// defines the click behavior for the buttons
var marker11;
var marker12;
var marker13;
var marker14;
var marker21;
var marker22;
var marker23;
var marker24;

var scores = [[], [], []];
window.onload = () => {
	if (sessionStorage.length == 1) {
		for (var i = 0; i < 5; ++i) {
			scores[0].push("Belum ada");
			// scores[0].push("empty");
			scores[1].push("--:--.-");
			scores[2].push(9999999999);
		}
		sessionStorage.setItem("names", JSON.stringify(scores[0]));
		sessionStorage.setItem("timestr", JSON.stringify(scores[1]));
		sessionStorage.setItem("time", JSON.stringify(scores[2]));
		console.log(sessionStorage);
		console.log("Session Storage created.");
		updateScoreboard();
	} else {
		let nameArray = JSON.parse(sessionStorage.getItem("names"));
		let timestrArray = JSON.parse(sessionStorage.getItem("timestr"));
		let timeArray = JSON.parse(sessionStorage.getItem("time"));
		console.log(sessionStorage);
		console.log("SessionStorage Retreived");
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < nameArray.length; j++) {
				if (i == 0) {
					scores[i][j] = nameArray[j];
				} else if (i == 1) {
					scores[i][j] = timestrArray[j];
				} else {
					scores[i][j] = timeArray[j];
				}
			}
		}
		console.log(scores);
		updateScoreboard();
	}
};

var endMessage = document.getElementById("message");
// var textarea = document.getElementById("textarea");

var startBtn = document.getElementById("start");
startBtn.addEventListener("click", function() {
	btnClicked("start");
});
var pauseResetBtn = document.getElementById("pauseReset");
pauseResetBtn.style.display = "none";
pauseResetBtn.addEventListener("click", function() {
	btnClicked("pauseReset");
});
var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", function() {
	btnClicked("submitBtn");
});

var timer = document.getElementById("timerDisplay"); // gets the timer from the document

// Define UI behaviors
const submitUI = document.getElementById("input");
submitUI.style.display = "none";
const scoreboard = document.getElementById("scoreboard");

class Stopwatch {
	constructor() {
		this.reset();
		this.running = false;
		console.log("watch created");
	}

	// increments the stopwatch by 100 milliseconds and returns the time as a string
	tick(tickMillis) {
		// increments the stopwatch by the number of milliseconds passed
		this.millis += tickMillis;

		/* check if seconds or millisecs have overflowed, and increment higher value. (mins just go to infinity) */
		if (this.millis === 1000) {
			this.millis = 0;
			this.secs++;
		}
		if (this.secs === 60) {
			this.secs = 0;
			this.mins++;
		}

		/* update the strings for the timer values */
		this.milStr = "" + this.millis / 100;
		this.secStr = this.secs < 10 ? "0" + this.secs + "." : this.secs + ".";
		this.minStr = this.mins < 10 ? "0" + this.mins + ":" : this.mins + ":";

		this.running = true;
		return this.timeStr();
	}

	// sets all the values to 0 and false
	reset() {
		this.millis = 0;
		this.secs = 0;
		this.mins = 0;
		this.milStr = "0";
		this.secStr = "00.";
		this.minStr = "00:";

		return this.timeStr();
	}

	getMillTime() {
		var returnTime = 0;
		returnTime += this.millis;
		returnTime += this.secs * 1000;
		returnTime += this.mins * 60000;
		return returnTime;
	}

	// functions for starting, pausing, and checking whether the stopwatch is running
	pause() {
		this.running = false;
	}
	start() {
		this.running = true;
	}
	isRunning() {
		return this.running;
	}

	// returns the formatted time string from the stopwatch
	timeStr() {
		return "" + this.minStr + this.secStr + this.milStr;
	}
}

//class for holding the stopwatch and other game variables
class arGame {
	constructor() {
		this.gameOver = true;
		this.completed = false;
		this.running = null;
	}

	getDistances() {
		var distance = new Array();
		distance.push(
			Math.round(
				marker11
					.getAttribute("position")
					.distanceTo(marker12.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker12
					.getAttribute("position")
					.distanceTo(marker13.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker13
					.getAttribute("position")
					.distanceTo(marker14.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker21
					.getAttribute("position")
					.distanceTo(marker22.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker22
					.getAttribute("position")
					.distanceTo(marker23.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker23
					.getAttribute("position")
					.distanceTo(marker24.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker11
					.getAttribute("position")
					.distanceTo(marker21.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker12
					.getAttribute("position")
					.distanceTo(marker22.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker13
					.getAttribute("position")
					.distanceTo(marker23.getAttribute("position")) * 100
			) / 100
		);
		distance.push(
			Math.round(
				marker14
					.getAttribute("position")
					.distanceTo(marker24.getAttribute("position")) * 100
			) / 100
		);
		return distance;
	}

	// says whether the puzzle is completed
	isRunning() {
		if (this.running == null) return false;
		else return true;
	}

	// sets the game state to currently being solved
	startGame() {
		this.completed = false;
		this.gameOver = false;
	}

	// takes in a list of distances and a minimum distance. If any of the distances are greater than the minimum
	// distance, the game is not completed.
	checkCompleted() {
		var newDists = this.getDistances();
		var distBools = [];
		for (var i = 0; i < newDists.length; ++i) {
			if (newDists[i] < 2.5 && newDists[i] > 0.2) {
				distBools.push(true);
			} else {
				distBools.push(false);
			}
		}

		for (var i = 0; i < distBools.length; i++) {
			if (!distBools[i]) {
				return false;
			}
		}
		console.log(distBools);
		return true;
	}

	// sets all of the game variables
	reset() {
		this.gameOver = true;
		this.completed = false;
		this.running = null;
	}

	// inserts a new score into the list of scores
	tryToAddScore(name, timeStr, totalMillis) {
		var scoresLen = scores[0].length;

		var i = 0;
		for (; i < scoresLen; ++i) if (totalMillis <= scores[2][i]) break;

		scores[0].splice(i, 0, name);
		scores[1].splice(i, 0, timeStr);
		scores[2].splice(i, 0, totalMillis);

		if (scores[0].length == 6) {
			scores[0].splice(5, 1);
			scores[1].splice(5, 1);
			scores[2].splice(5, 1);
		}
		this.updateSessionScores();
	}

	// The function updates the session storage with the new scores
	updateSessionScores() {
		sessionStorage.setItem("names", JSON.stringify(scores[0]));
		sessionStorage.setItem("timestr", JSON.stringify(scores[1]));
		sessionStorage.setItem("time", JSON.stringify(scores[2]));
		console.log(sessionStorage);
		console.log("Session Storage Updated.");
	}
	// progresses the game state and calculates game information from the current state
	// continue() {}
}

// function that progresses the game
var gameLoop = function() {
	if (watch.isRunning()) timer.innerHTML = watch.tick(100); // updates the time in the UI
	if (game.checkCompleted())
		// gets the current distances and checks if the puzzle is completed.
		endGame(); // ends the game if the puzzle is completed
};

// starts the game
function startGame() {
	// hides the start button after it is called and changes the Reset text to Pause
	startBtn.style.display = "none";
	pauseResetBtn.style.display = "inline";
	pauseResetBtn.innerHTML = "Pause";
	var iframe = document.getElementById("ARframe").contentWindow.document;
	// starts the watch
	watch.start();
	marker11 = iframe.getElementById("marker1");
	marker12 = iframe.getElementById("marker2");
	marker13 = iframe.getElementById("marker3");
	marker14 = iframe.getElementById("marker4");
	marker21 = iframe.getElementById("marker5");
	marker22 = iframe.getElementById("marker6");
	marker23 = iframe.getElementById("marker7");
	marker24 = iframe.getElementById("marker8");
	gameInterval = setInterval(gameLoop, 100);
}

// pauses the game
function pauseGame() {
	clearInterval(gameInterval); // stops the game loop
	startBtn.style.display = "none"; // makes the start button visible
	pauseResetBtn.innerHTML = "Reset";
	watch.pause(); // pauses the watch
}

// completely resets the game
function resetGame() {
	if (game.running != null) clearInterval(game.running);
	game.reset;

	timer.innerHTML = watch.reset();
	startBtn.style.display = "inline";
	pauseResetBtn.style.display = "none";
	const gameSection = document.getElementById("game");
	const ARFrame = document.getElementById("ARframe");
	pauseResetBtn.innerHTML = "Reset";
	gameSection.className = "game";
	ARFrame.className = "frame";
	submitUI.style.display = "none";
	scoreboard.style.display = "inline";
	endMessage.style.display = "none";
}

//Game is completed
function endGame() {
	clearInterval(gameInterval); // stops the game loop
	watch.pause();
	displayEndScreen();
}

function processEnd() {
	var newTimeStr = watch.timeStr();
	var newMilli = watch.getMillTime();
	var name = textarea.value;
	textarea.value = "";
	if (name == "") {
		processEnd();
	}
	game.tryToAddScore(name, newTimeStr, newMilli);
	// writeScoresToFile(game.getScores());
	updateScoreboard();
	// TODO: replace this with

	resetGame();
}

function updateScoreboard() {
	var leaderboard = document.getElementById("leaderboard");
	if (leaderboard.rows.length == 5) {
		for (let i = 0; i < 5; i++) {
			leaderboard.deleteRow(0);
		}
	}

	for (let i = scores[0].length - 1; i >= 0; i--) {
		let row = leaderboard.insertRow(0);
		let name = row.insertCell(0);
		let time = row.insertCell(1);
		name.innerHTML = scores[0][i];
		time.innerHTML = scores[1][i];
	}
}

var btnClicked = function(btnName) {
	switch (btnName) {
		case "start":
			startGame();
			break;
		case "pauseReset":
			if (watch.isRunning()) pauseGame();
			else resetGame();
			break;
		case "submitBtn":
			processEnd();
			break;
		default:
			console.log("DEFAULT STATEMENT REACHED");
			break;
	}
};

// defines the global game variables
let watch = new Stopwatch();
let game = new arGame();

function displayEndScreen() {
	const gameSection = document.getElementById("game");
	const ARFrame = document.getElementById("ARframe");
	pauseResetBtn.innerHTML = "Reset";
	gameSection.className = "game-end";
	gameSection.classList.add("bg-gray-800");
	ARFrame.className = "frame-end";
	// endMessage.classList.add(" bg-gray-400");
	endMessage.style.display = "block";
	if (watch.getMillTime() < scores[2][4]) {	
		endMessage.innerText = "Congratulations! You are one of the top 5";
		submitUI.style.display = "inline";
	} else {
		submitUI.style.display = "none";
		endMessage.innerText = "Sorry you did not make the top 5. Try again!";
	}
	scoreboard.style.display = "none";
}
