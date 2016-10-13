$(document).ready(function() {
  var cellArray = [];
  var generation = 1;
  $('#gen-counter').html("Generation: " + generation);
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
        $('#row-'+ j).append('<td class="cell" id="'+k+'"><img src="images/tadpole.gif" class="amoeba"></td>');
      }
    }
    $('.cell').click(function(event) {
      var xCoordinate = parseInt($(this).attr('id'));
      var yCoordinate = $(this).parent('tr').attr('id').split('-');
      yCoordinate = parseInt(yCoordinate[1], 10);
      cellArray[xCoordinate][yCoordinate].active = !cellArray[xCoordinate][yCoordinate].active;
      if (cellArray[xCoordinate][yCoordinate].active){
        $( this ).css( "background-color", "green");
        $( this ).children('.amoeba').show(200);
      }
      else{
        $( this ).css( "background-color", "yellow");
        $( this ).children('.amoeba').hide(200);
      }
    });
  }
  $('#nextgen').click(function(event) {
    nextGeneration();
  });
  $('#start').click(function(event) {
    var myVar = setInterval(nextGeneration, 1000);
      $('#stop').click(function(event) {
        clearInterval(myVar);
      });
  });


  function activateCell(x, y){
    if (cellArray[x][y].active === true){
      $('#row-' + y + '> #' + x).css( "background-color", "green");
      $('#row-' + y + '> #' + x).children('.amoeba').show(200);
    }
    else if (cellArray[x][y].active === false){
      $('#row-' + y + '> #' + x).css( "background-color", "yellow");
      $('#row-' + y + '> #' + x).children('.amoeba').hide(200);
    }
  }

  function getNeighbors(x, y){
    var numNeighbors = 0;
    //handling edges - only executes if neighbors are within array's boundaries

      //top left
      if (x-1 !== -1 && y-1 !== -1){
        console.log(x-1, y-1);
        if (cellArray[x-1][y-1].active){
          numNeighbors++;
        }
      }
      //top
      if (y-1 !== -1){
        if (cellArray[x][y-1].active){
          numNeighbors++;
        }
      }
      //top right
      if (x+1 !== cellArray[x].length && y-1 !== -1){
        if (cellArray[x+1][y-1].active){
          numNeighbors++;
        }
      }
      //left
      if (x-1 !== -1){
        if (cellArray[x-1][y].active){
          numNeighbors++;
        }
      }
      //right
      if (x+1 !== cellArray[x].length){
        if (cellArray[x+1][y].active){
          numNeighbors++;
        }
      }
      //bottom left
      console.log(cellArray[x].length);
      if (x-1 !== -1 && y+1 !== cellArray[x].length){
        if (cellArray[x-1][y+1].active){
          numNeighbors++;
        }
      }
      //bottom
      if ( y+1 !== cellArray[x].length){
        if (cellArray[x][y+1].active){
          numNeighbors++;
        }
      }
      //bottom right
      if ( x+1 !== cellArray[x].length && y+1 !== cellArray[x].length){
        if (cellArray[x+1][y+1].active){
          numNeighbors++;
        }
      }

    console.log("Cell at (" + x + "," + y + ") has " + numNeighbors + " neighbors");
    return numNeighbors;
  }

  function nextGeneration(){
    //iterate through cell array
    var liveCells = [];
    var deadCells = [];
    generation ++;
    $('#gen-counter').html("Generation: " + generation);
    for (var x = 0; x < cellArray.length; x++){
      for (var y = 0; y < cellArray[x].length; y++){
        var numNeighbors = 0;
        if (cellArray[x][y].active){
          numNeighbors = getNeighbors(x, y);
          if (numNeighbors < 2 || numNeighbors > 3){
            deadCells.push({x: x, y: y});
          }
          else if(numNeighbors === 2 || numNeighbors === 3){
            liveCells.push({x: x, y: y});
          }
        }
        else if (cellArray[x][y].active === false){
          numNeighbors = getNeighbors(x, y);
          if (numNeighbors === 3){
            liveCells.push({x: x, y: y});
          }
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
  }

  function initializeBoard(){
    $('.amoeba').hide(0);
  }

  createArray(15,15);
  createTable();
  initializeBoard();

});
