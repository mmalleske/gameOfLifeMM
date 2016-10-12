$(document).ready(function() {
  var cellArray = [];
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
    console.log(cellArray);
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
    $( '.cell' ).click(function(event) {
      //event.preventDefault();
      var xCoordinate = parseInt($(this).attr('id'));
      var yCoordinate = $(this).parent('tr').attr('id').split('-');
      yCoordinate = parseInt(yCoordinate[1], 10);
      console.log(xCoordinate, yCoordinate);
      $( this ).css( "background-color", "green");
    });
  }





  createArray(20,20);
  createTable();

});
