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

	$(".dropdown-toggle").click(function() {
		var id = $(this).attr("id");
		var dropdown = $("[aria-labelledby="+id+"]")
		if ($(this).attr("aria-expanded") == "false") {
			$(this).attr("aria-expanded", true).focus();
			$(this).addClass("show");
			dropdown.addClass("show");
			dropdown.attr("data-bs-popper", "none");
		} else {
			$(this).attr("aria-expanded", false);
			$(this).removeClass("show");
			dropdown.removeClass("show");
			dropdown.removeAttr("data-bs-popper");
		}
	})

	document.getElementById("BFS").onclick = function() {
		maze.algorithm = "BFS";
		disableHeuristic();
		updateDescription(0);
	};
	document.getElementById("DFS").onclick = function() {
		maze.algorithm = "DFS";
		disableHeuristic();
		updateDescription(1);
	};
	document.getElementById("A*").onclick = function() {
		maze.algorithm = "A*";
		enableHeuristic();
		updateDescription(2);
	};
	document.getElementById("Dijkstra").onclick = function() {
		maze.algorithm = "Dijkstra";
		disableHeuristic();
		updateDescription(3);
	};

	document.getElementById("null").onclick = function() {
		maze.heuristic = function(a, b) {return nullHeuristic(a, b)};
		updateHeuristic(0);
	};
	document.getElementById("manhattanD").onclick = function() {
		maze.heuristic = function(a, b) {return manhattanDistance(a, b)};
		updateHeuristic(1);
	};
	document.getElementById("euclideanD").onclick = function() {
		maze.heuristic = function(a, b) {return euclideanDistance(a, b)};
		updateHeuristic(2);
	};

	document.getElementById("visualize").onclick = function() {
		startLoader();
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

function updateDescription(i) {
	var algs = ["Breadth First Search", "Depth First Search", "A* Search", "Dijkstra's Algorithm"];
	var descriptions = ["unweighted, and guarantees shortest path", 
						"unweighted, and does not guarantee shortest path", 
						"weighted, and guarantees shortest path",
						"weighted, and guarantees shortest path"];
	$("#searchAlgDropdown").html(algs[i]);
	$("#searchAlgDropdown").addClass("selected");
	document.getElementsByClassName("description")[0].innerHTML = "<span class='name'>" + algs[i] + "</span> is " + descriptions[i];
}

function updateHeuristic(i) {
	var hs = ["Null Heuristic", "Manhattan Distance", "Euclidean Distance"];
	$("#heuristicDropdown").html(hs[i]);
	$("#heuristicDropdown").addClass("selected");
}

function disableHeuristic() {
	$("#heuristicDropdown").removeClass("selected");
	$("#heuristicDropdown").html("Heuristic");
	$("#heuristicDropdown").addClass("disabled");
}

function enableHeuristic() {
	$("#heuristicDropdown").removeClass("disabled");
}