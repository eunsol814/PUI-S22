var page1 = 
`<div>
    <h1>Welcome to Pathfinding Visualizer!</h1>
    <p>This tutorial will walk you through all the features of this website.</p>
</div>`;

var page2 = 
`<div>
    <h1>Search Algorithms</h1>
    <p>This website supports visualization of four pathfinding algorithms that are listed below:</p>
    <dl class="row">
        <dt class="col-sm-3 name">Breadth First Search:</dt>
        <dd class="col-sm-9">unweighted, guarantees shortest path</dd>

        <dt class="col-sm-3 name">Depth First Search:</dt>
        <dd class="col-sm-9">unweighted, does not guarantee shortest path</dd>

        <dt class="col-sm-3 name">A* Search:</dt>
        <dd class="col-sm-9">weighted, guarantees shortest path</dd>

        <dt class="col-sm-3 name">Dijkstra's Algorithm:</dt>
        <dd class="col-sm-9">weighted, guarantees shortest path</dd>
    </dl>
    <p>Unweighted algorithms treats all options equally. 
    Weighted algorithms use cost function to get the cost of each available option - cost of changing a direction is set to 1.</p>
</div>`;

var page3 =
`<div>
    <h1>Heuristics</h1>
    <p>Heurisitc is a function that ranks options at each branching step to decide which branch to follow.
    Heuristics are only applied towards A* Search.</p>
    <dl class="row">
        <dt class="col-sm-3 name">Null Heuristic:</dt>
        <dd class="col-sm-9">equivalent of not using a heuristic for search</dd>

        <dt class="col-sm-3 name">Manhattan Distance:</dt>
        <dd class="col-sm-9">number of cells between two points</dd>

        <dt class="col-sm-3 name">Euclidean Distance:</dt>
        <dd class="col-sm-9">absolute distance between two points</dd>
    </dl>
</div>`;

var page4 = 
`<div>
    <h1>Creating Maze</h1>
    <div>Three different maze generation algorithms are provided for your convenience. 
        You can eiter decide to use them or simply select a blank cell to create a wall.</div>
    <div style="display: flex;">
        <img src="img/mazes.png" class="help-img" style="width: 30%; float: left;" alt="screenshot of menu"></img>
        <img src="img/wall.gif" class="help-img" style="width: 20%; float: right;" alt="cell select gif"></img>
    </div>
    <div>You can also drag and drop both player and goal to change their position</div>
    <div style="display: flex;">
        <img src="img/movePlayer.gif" class="help-img" style="width: 25%; float: left;" alt="move player gif"></img>
        <img src="img/moveGoal.gif" class="help-img" style="width: 25%; float: right;" alt="move goal gif"></img>
    </div>
</div>`;

var page5 = 
`<div>
    <h1>Visualization and More</h1>
    <div>After you have selected search algorithm, and possibly a heuristic, you can click on 
    <button class="btn btn-primary">Visualize!</button>
     to visualize the path explored by the algorithm and view the optimal route it has found from search.</div>
    <img src="img/clears.png" class="help-img" style="width: 40%;" alt="screenshot of menu"></img>
</div>`;

var page6 = 
`<div>
    <h1>Enjoy!</h1>
    <div>You can always come back to this guide by clicking 'Help' on the right of navigation bar.</div>
</div>`;

var Pages = [page1, page2, page3, page4, page5, page6];

function startLoader() {
    $("#loader").removeClass("d-none");
};

function endLoader() {
    $("#loader").addClass("d-none");
};