function callSearchAnimation(maze) {
	// Visualize search algorithm
	maze.clearPaths();
	let state = maze.getStartState();
	maze.animation = true;
	console.log(maze.animation);
	for (let i=1; i<maze.explored.length; i++) {
		setTimeout(() => {
			document.getElementById(JSON.stringify(maze.explored[i])).className = 'explored';
			document.getElementById(JSON.stringify(maze.explored[i])).style.backgroundColor = "lavenderblush";
		}, i * 10);
	}	
	setTimeout(() => {
		for (let j=0; j<maze.shortestPath.length - 1; j++) {
			let action = maze.shortestPath[j];
			let nextState  = maze.getResult(state, action);
			let id = {r: nextState.r, c: nextState.c};
			setTimeout(() => {
				document.getElementById(JSON.stringify(id)).className = 'path';
			}, j * 10);
			state = nextState;
		}
		maze.animation = false;
		console.log(maze.animation);
	}, maze.explored.length * 10)
};

function callMazeAnimation(maze) {
	// Visualize maze generation algorithm
	maze.clearWalls();
	maze.animation = true;
	for (let i=0; i<maze.maze.length; i++) {
		setTimeout(() => {
			document.getElementById(JSON.stringify(maze.maze[i])).className = "wall";
		}, i * 10);
	}
	maze.animation = false;
}

function callUndoMazeAnimation(maze, clearedWalls) {
	// Visualize recursive backtracking maze generation algorithm
	maze.clearWalls();
	maze.animation = true;
	for (let i=0; i<maze.maze.length; i++) {
		document.getElementById(JSON.stringify(maze.maze[i])).className = "wall";
	}
	for (let j=0; j<clearedWalls.length; j++) {
		setTimeout(() => {
			document.getElementById(JSON.stringify(clearedWalls[j])).className = "blank";
		}, j * 10);
	}
	maze.animation = false;
}

function visualize(maze) {
	let algorithm =  maze.algorithm;
	let heuristic = maze.heuristic;
};

function drag(ev) {
	// Drag player and goal nodes
	ev.dataTransfer.setData("onMove", ev.target.id);
};

function allowDrop(ev) {
	// Allow drop of player and goal nodes
	ev.preventDefault();
};

function drop(ev) {
	// Drop player and goal nodes
	ev.preventDefault();
	var data = ev.dataTransfer.getData("onMove");
	if (document.getElementById(data).className == "player") {
		document.getElementById(data).className = "blank";
		ev.target.className = "player";
	} else {
		document.getElementById(data).className = "blank";
		ev.target.className = "goal";
	}
};










