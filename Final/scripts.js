$(document).ready(function() {
	var helpI = 0;
	// Create the board
	var maze = new Board();
	maze.createGrid();

	$("td").click(function() {
		if (this.className == "blank" && maze.animation == false) {
			this.className = "wall";
		} else if (this.className == "wall" && maze.animation == false) {
			this.className = "blank";
		}
	});

	document.getElementById("BFS").onclick = function() {
		maze.algorithm = "BFS";
	};
	document.getElementById("DFS").onclick = function() {
		maze.algorithm = "DFS";
	};
	document.getElementById("A*").onclick = function() {
		maze.algorithm = "A*";
	};
	document.getElementById("Dijkstra").onclick = function() {
		maze.algorithm = "Dijkstra";
	};

	document.getElementById("null").onclick = function() {
		maze.heuristic = function(a, b) {return nullHeuristic(a, b)};
	};
	document.getElementById("manhattanD").onclick = function() {
		maze.heuristic = function(a, b) {return manhattanDistance(a, b)};
	};
	document.getElementById("euclideanD").onclick = function() {
		maze.heuristic = function(a, b) {return euclideanDistance(a, b)};
	};

	document.getElementById("visualize").onclick = function() {
		if (maze.algorithm == "BFS") {
			breadthFirstSearch(maze);
		} else if (maze.algorithm == "DFS") {
			depthFirstSearch(maze);
		} else if (maze.algorithm == "A*") {
			aStarSearch(maze, maze.heuristic);
		} else if (maze.algorithm == "Dijkstra") {
			dijkstra(maze);
		}
	};

	document.getElementById("random").onclick = function() {
		randomMaze(maze);
	};
	document.getElementById("division").onclick = function() {
		recursiveDivision(maze);
	};
	document.getElementById("backtrack").onclick = function() {
		recursiveBacktrack(maze);
	}

	document.getElementById("clearboard").onclick = function() {
		maze.clearAll();
	};
	document.getElementById("clearwall").onclick = function() {
		maze.clearWalls();
	};
	document.getElementById("clearpath").onclick = function() {
		maze.clearPaths();
	};

	document.getElementById("modal-btn-prev").onclick = function() {
		if (helpI > 0) {
			helpI -= 1;
			document.getElementsByClassName("modal-body")[0].innerHTML = Pages[helpI];
		}
	};
	document.getElementById("modal-btn-next").onclick = function() {
		if (helpI < Pages.length - 1) {
			helpI += 1;
			document.getElementsByClassName("modal-body")[0].innerHTML = Pages[helpI];
		}
	}
	var myModal = document.getElementById('helpModal');
	myModal.addEventListener('show.bs.modal', function(e) {
		document.getElementsByClassName("modal-body")[0].innerHTML = Pages[helpI];
	});
	myModal.addEventListener('hide.bs.modal', function (e) {
		helpI = 0;
	});
});