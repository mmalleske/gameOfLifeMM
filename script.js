$(document).ready(function() {
  var cellArray = [];
  var generation = 1;
  function Cell(x, y, active){
    this.x = x;
    this.y = y;
    this.active = false;
  }
  function createArray(height, width){
    for ( var x=0; x < height; x++){
      cellArray[x] = [];
      for (var y=0; y < width; y++){
        cellArray[x][y] = new Cell(x, y, false);
      }
    }
  }
  function createTable(){
    //create rows
    for (var i = 0; i < cellArray.length; i++){
      $('#grid-body').append('<tr id="row-'+ i +'"></tr>');
    }
    //populate cells
    for (var j = 0; j < cellArray.length; j++){
      for (var k = 0; k < cellArray[j].length; k++){
        $('#row-'+ j).append('<td class="cell" id="'+k+'">'+k+'</td>');
      }
    }
    $('.cell').click(function(event) {
      var xCoordinate = parseInt($(this).attr('id'));
      var yCoordinate = $(this).parent('tr').attr('id').split('-');
      yCoordinate = parseInt(yCoordinate[1], 10);
      cellArray[xCoordinate][yCoordinate].active = !cellArray[xCoordinate][yCoordinate].active;
      if (cellArray[xCoordinate][yCoordinate].active){
        $( this ).css( "background-color", "green");
      }
      else{
        $( this ).css( "background-color", "yellow");
      }
      //console.log(xCoordinate, yCoordinate);
    });
  }
  $('#nextgen').click(function(event) {
    nextGeneration();
  });

  function activateCell(x, y){
    if (cellArray[x][y].active === true){
      $('#row-' + y + '> #' + x).css( "background-color", "green");
    }
    else if (cellArray[x][y].active === false){
      $('#row-' + y + '> #' + x).css( "background-color", "yellow");
    }
  }

  function getNeighbors(x, y){
    var numNeighbors = 0;
    //top left
    if (cellArray[x-1][y-1].active){
      numNeighbors++;
    }
    //top
    if (cellArray[x][y-1].active){
      numNeighbors++;
    }
    //top right
    if (cellArray[x+1][y-1].active){
      numNeighbors++;
    }
    //left
    if (cellArray[x-1][y].active){
      numNeighbors++;
    }
    //right
    if (cellArray[x+1][y].active){
      numNeighbors++;
    }
    //bottom left
    if (cellArray[x-1][y+1].active){
      numNeighbors++;
    }
    //bottom
    if (cellArray[x][y+1].active){
      numNeighbors++;
    }
    //bottom right
    if (cellArray[x+1][y+1].active){
      numNeighbors++;
    }
    console.log("Cell at (" + x + "," + y + ") has " + numNeighbors + " neighbors");
    return numNeighbors;
  }

  function nextGeneration(){
    //iterate through cell array
    var liveCells = [];
    var deadCells = [];
    for (var x = 0; x < cellArray.length; x++){
      for (var y = 0; y < cellArray[x].length; y++){
        //if a cell is active get number of neighbors stores coordinates in an array of objects
        var numNeighbors = 0;
        if (cellArray[x][y].active){
        //   //top left
        //   if (cellArray[x-1][y-1].active){
        //     numNeighbors++;
        //   }
        //   //top
        //   if (cellArray[x][y-1].active){
        //     numNeighbors++;
        //   }
        //   //top right
        //   if (cellArray[x+1][y-1].active){
        //     numNeighbors++;
        //   }
        //   //left
        //   if (cellArray[x-1][y].active){
        //     numNeighbors++;
        //   }
        //   //right
        //   if (cellArray[x+1][y].active){
        //     numNeighbors++;
        //   }
        //   //bottom left
        //   if (cellArray[x-1][y+1].active){
        //     numNeighbors++;
        //   }
        //   //bottom
        //   if (cellArray[x][y+1].active){
        //     numNeighbors++;
        //   }
        //   //bottom right
        //   if (cellArray[x+1][y+1].active){
        //     numNeighbors++;
        //   }
        //   console.log("Cell at (" + x + "," + y + ") has " + numNeighbors + " neighbors");
        // }
        if (numNeighbors < 2 || numNeighbors > 3){
          deadCells.push({x: x, y: y});
        }
        else if(numNeighbors === 2 || numNeighbors === 3){
          liveCells.push({x: x, y: y});
        }
      }
    }
    for (var i = 0; i < liveCells.length; i++){
      cellArray[liveCells[i].x][liveCells[i].y].active = true;
      activateCell(liveCells[i].x, liveCells[i].y);
      console.log(liveCells[i].x, liveCells[i].y);
    }
    for (var i = 0; i < deadCells.length; i++){
      cellArray[deadCells[i].x][deadCells[i].y].active = false;
      activateCell(deadCells[i].x, deadCells[i].y);
    }

    //if cell has two or three neighbors store in array of next gen cells
    //***if dead cell has three neighbors store in array of next gen cells
    //if cell has more than three neighbors store in array of cells to die
    //if cell has one or no neighbors store in array of cells to die
  }
//edge case: write a function that checks to see if a neighbor check is out of
//bounds of the cellArray before querying for neighbors




  createArray(20,20);
  createTable();

});
