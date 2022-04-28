# Pathfinding-Visualizer



## Video
https://drive.google.com/file/d/1zIkZM1_YddsYSWpMji54FgREatpbt_Qv/view?usp=sharing 


## Links to Figma & Website
Figma: https://www.figma.com/file/JXZrMoNgZrUUgiH5aIlAMq/05-430-Assignment-7?node-id=0%3A1

Website: https://eunsol814.github.io/PUI-S22/Final/index.html


## Description
Pathfinding Visualizer helps people better understand different pathfinding algorithms and their search patterns through visualization. The target users
would be people who are interested in learning and trying out pathfinding algorithms under different settings. The users could change start/goal positions and create their own maze to test out pathfindng algorithms under different settings.

Link to previous version of this project: https://eunsol814.github.io/Pathfinding-Visualizer/.


## Using the website
- The users would first choose a pathfinding algorithm they would like to visualize from the 'Search Algorithm' dropdown menu. Depending on the algorithm they pick, the users would also have to choose a heuristic from the 'Heuristic' tab as well.
- The users could also generate a maze using maze generation algorithms provided under 'Maze Generation Algorithm' dropdown menu to try out pathfinding algorithms under different board settings. The users could also create a wall by clicking on the board cells and remove a wall by clicking onto it.
- By clicking on the 'Help' on the right of navbar, the users could open a popup modal that provides a brief overall guide to the website.


## External Libraries
- JQuery was used to implement some functionalities of the project through selecting and modifying html elements. I used it to add onclick function to the
table cells (board cells) to create/remove a wall.
- Bootstrap was used to utilize its components and make the entire website responsive.
- CSS Animation was added to support color changing animation for path visualization.


## Iteration from HW7
I initially considered using React.js to recreate the website, but decided to focus more on the UI than spending time rewriting all JavaScript code for pathfinding algorithms. I made a minor change in the design and layout of help modal by switching the arrow buttons to prev/next buttons. I also made 'Visualize!' and 'Help' button more noticeable by changing the color.


## Major Challenges
The biggest challenge was to implement a responsive maze board. I first thought of redrawing the board as the window gets resized, but it wasn't efficient solution so I settled down on redrawing the board on reload based on the current window size.
