Game of Life - Evolution Edition by Michael Malleske
link: 

The App:

This is a rendition of John Conway's "Game of Life", in which a grid of cells are
populated with lifeforms and procedurally live, die and reproduce over generations. 
This version of the Game of Life follows all the traditional rules, but I also includes
a feature where the lifeforms "evolve" after a certain amount of generations passed.

User Stories:

-The user is first presented with an empty grid. The user clicks on cells to "populate"
the grid. Clicking on an already populated cell will deactivate the cell. Cells can be 
activated at any point during the game and the gameboard will take into account newly
added cells and respond accordingly .
-The user can step through generations one at a time by clicking "Next Generation"
or click "Start" for the gameboard to automatically step through generations.
-Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
-Any live cell with more than three live neighbours dies, as if by overcrowding.
-Any live cell with two or three live neighbours lives on to the next generation.
-Any dead cell with exactly three live neighbours becomes a live cell.
-Every 10 generations, the lifeforms will evolve into a new species.
-If the user clicks "Stop", it will pause the game at the current generation.
-If the user clicks "Reset", the gameboard will clear and the generation counter will
return to 1.


Approach Taken:

-I wrote the app using HTML and JavaScript, using jQuery for DOM manipulation. I started
by creating an 2 dimensional array for the "backend" represented by an html table element
for the front end. Using a naming convention for the ids of the rows and data of the table,
I was able to make the elements in the array directly correspond with the table.
In the second dimension of the array, I stored the "cells" as objects and stored each
cells' x and y coordinates and active/inactive state as properties of the object. When a cell
becomes active, using the coordinate properties, the corresponding table data is manipulated in the DOM.
-With the table and array directly linked, I iterated through the two-dimensional 
array to check for the number of active neighbors for each cell starting
from the top-right of the cell in question, and checking clockwise for active 
neighbors. If any of the neighbors are active, the coordinates of each active 
neighbor is stored into a temporary array. I stored the coordinates to that the 
table would not be affected until all of the cells had been evaluated. To handle 
cells at the edge of the table, a conditional makes sure the check for an active 
neighbor is within the bounds of the array for each direction, starting with the top-left
neighbor going clockwise around to the left neighbor.  If any of these cell positions
are out of bounds of the array, the code will not execute so it only checks for neighbors
that are on the grid. Once the grid has been evaluated for active neighbors, I iterate
the temporary array of coordinates to set those cells active for the next generation.
As an added feature I created some sprites using the Piskel sprite editor of different life forms
starting with an amoeba and ending with a dinosaur. When a cell is clicked a life form is displayed.
This life form "evolves" into another life form every 10 generations. Each cell contains all the 
sprites, but only shows the appropriate lifeform for each generation and hides the rest.


Testing process:

To make sure the table and the array were directly linked, I had the console print the coordinates
of each regularly to show the "frontend" and "backend" were linked. Logging coordinates
was especially pertinent when handling cells at the edge of the table. I was able to see what coordinates
were throwing errors when checking for neighbors and how to write my conditionals
so that only neighboring cells within the boundaries of the array were looked for. 
To make sure the number of neighbors were being calculated correctly I printed the cell's
coordinates to the console followed by the number of calculated neighbors and adjusted
my conditionals until correct. I tested cells at the edges and corners to make sure
all situations were met. I also used this site:
https://bitstorm.org/gameoflife/
as a reference for working code. 

Areas for improvement:

-The app does take a while to load. This is due to the fact that each cell is holding the .gifs
for all the possible life forms. I chose to set it up this way because I thought it
would be more cumbersome to keep appending new images to each cell that was clicked and
would run faster simply showing a hidden element. This way, the game runs very quickly
after the initial load time. 
-The y coordinates actually read from the top down with the top y value being 0 and increasing
as you move further down the y-axis. I reference coordinates this way so that is 
directly corresponding to the indeces of the two-dimensional array, however the inverted
y-value my confuse other possible collaboraters.
-There are some places where the code could be more dry, especially concerning the display
of different life forms. I used if statements instead of switch because I was using comparators
not immediate values. After doing some research I determined that if statements would be best for
performance. 

For the future:

The reference site I used had a few additional features I would like to try to 
incorporate, like speed control of the generation intervals, a sizeable grid, and
preset starting cell configurations. I have already set up the function so that the
table can be resized based on given arguments, but I decided not to let the user
set their table size at this time as it has the potential to cause a very long load
time if with a large enough grid, again due to the life forms exisiting on each cell.
I also used a set interval instead of allowing speed control since I'm using css animations
and I chose the speed that looked best to me. However I would like to incorporate in the 
future and see how it looks. I will definitely incorporate the preset cell configurations.
Lastly I would like to find a more efficient way to load life forms onto each cell so that
I'm not limited in the number of different life forms I can include for each turn of evolution.


