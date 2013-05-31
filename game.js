var currentStep = 0;

Array.prototype.find = function(searchStr) {
  var returnArray = false;
  for (i=0; i<this.length; i++) {
    if (typeof(searchStr) == 'function') {
      if (searchStr.test(this[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    } else {
      if (this[i]===searchStr) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    }
  }
  return returnArray;
}

function whichcolor(cell) {
  if ($("#"+cell).hasClass("color-0") == true) {
    return "color-0";
  }
  else if ($("#"+cell).hasClass("color-1") == true) {
    return "color-1";
  }
  else if ($("#"+cell).hasClass("color-2") == true) {
    return "color-2";
  }
  else if ($("#"+cell).hasClass("color-3") == true) {
    return "color-3";
  }
  else if ($("#"+cell).hasClass("color-4") == true) {
    return "color-4";
  }
  else if ($("#"+cell).hasClass("color-5") == true) {
    return "color-5";
  }
  else {
    throw "Cell does not have color class specified.";
  }
}

function makegrid(size, colors) {
  var grid = "<table>";
  
  var cell = 0;
  
  var i = 1;
  for (i=1;i<=size;i++) {
    grid = grid + "<tr>";
    
    var j = 1;
    for (j=1;j<=size;j++) {
      grid = grid + '<td id="cell-' + cell + '" class="color-' + Math.floor(Math.random()*(colors)) + '">';
      cell++;
    }
    grid = grid + "</tr>";
  }
  grid = grid + "</table>";
  return grid;
}

function switch_colors(newcolor) {
  var arrChecked = [];
  var arrToCheck = [0];
  
  var oldcolor = whichcolor("cell-0");
  
  var checking;
  while (arrToCheck.length > 0) {
    checking = arrToCheck.shift();
    if ($("#cell-"+checking).hasClass(oldcolor)) {
      // switch colors
      $("#cell-"+checking).removeClass(oldcolor);
      $("#cell-"+checking).addClass(newcolor);
      
      // Add top, bottom, right, left to arrToCheck
      var cellTop;
      var cellBottom;
      var cellRight;
      var cellLeft;
      
      var row = Math.floor(checking / 12);
      if (row > 0) { // we have a top cell
        cellTop = checking - 12;
        if (arrChecked.find(cellTop) == false && arrToCheck.find(cellTop) == false) {
          arrToCheck.push(cellTop);
        }
      }
      if (row < 11) { // we have a bottom cell
        cellBottom = checking + 12;
        if (arrChecked.find(cellBottom) == false && arrToCheck.find(cellBottom) == false) {
          arrToCheck.push(cellBottom);
        }
      }
      if (checking % 12 != 0) { // we have a left cell
        cellLeft = checking - 1;
        if (arrChecked.find(cellLeft) == false && arrToCheck.find(cellLeft) == false) {
          arrToCheck.push(cellLeft);
        }
      }
      if (checking % 12 != 11) { // we have a right cell
        cellRight = checking + 1;
        if (arrChecked.find(cellRight) == false && arrToCheck.find(cellRight) == false) {
          arrToCheck.push(cellRight);
        }
      }
    }
    arrChecked.push(checking);
  }
  currentStep++;
  $("#counter").html(currentStep + " of 22 moves");
}

$(document).ready(function(){
  $("#easy").click(function(){
    $("#grid").html(makegrid(12, 6));
    $("#start").hide();
    $("#game").show();
  });
  
  $("#pick-0").click(function(){
    switch_colors("color-0");
  });
  $("#pick-1").click(function(){
    switch_colors("color-1");
  });
  $("#pick-2").click(function(){
    switch_colors("color-2");
  });
  $("#pick-3").click(function(){
    switch_colors("color-3");
  });
  $("#pick-4").click(function(){
    switch_colors("color-4");
  });
  $("#pick-5").click(function(){
    switch_colors("color-5");
  });
});
