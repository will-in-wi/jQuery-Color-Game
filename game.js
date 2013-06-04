// TODO: Add finish screen.
// Make buttons more obvious.
// Help text

(function($){
    'use strict';

    Array.prototype.find = function(searchStr) {
        var returnArray = false;
        for (var i=0; i<this.length; i++) {
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


    $.fn.colorGame = function(options) {

        // Set up options.
        var defaults = {
            noOfColors : 6,
            size       : 12
        }
        options = $.extend({}, defaults, options);


        // Initialize gameboard.
        // Counter, grid, color select.
        var counter = $('<div />')
            .attr('id', 'counter')
            .html('0 of 22 moves'); // TODO: Compute this from size.

        var grid = $('<div />')
            .attr('id', 'grid');

        var makeControls = function() {
            var colorSelect = $('<table />')
                .attr('id', 'color-select');

            var tr = $('<tr />');

            for (var i = 0; i < options.noOfColors; i++) {
                var td = $('<td />')
                    .attr('id', 'pick-' + i)
                    .addClass('color-' + i);
                tr.append(td);
            };

            colorSelect.append(tr);

            return colorSelect;
        }

        this.append(counter);
        this.append(grid);
        this.append(makeControls());


        var whichcolor = function(cell) {
            var cell = $('#' + cell);
            for (var i = 0; i < options.noOfColors; i++) {
                if (cell.hasClass('color-' + i) === true) {
                    return 'color-' + i;
                }
            };

            throw 'Cell does not have color class specified.';
        }

        var makegrid = function() {
            var grid = $('<table/>');

            var cell = 0;

            var i = 1;
            for (i=1;i<=options.size;i++) {
                var tr = $('<tr />');

                var j = 1;
                for (j=1;j<=options.size;j++) {
                    var color = Math.floor(Math.random()*(options.noOfColors));
                    var td = $('<td />')
                        .attr('id', 'cell-' + cell)
                        .addClass('color-' + color);
                    tr.append(td);
                    cell++;
                }
                grid.append(tr);
            }
            return grid;
        }

        var switch_colors = function(newcolor) {
            var arrChecked = [];
            var arrToCheck = [0];

            var oldcolor = whichcolor("cell-0");

            var checking;
            while (arrToCheck.length > 0) {
                checking = arrToCheck.shift();
                if ($("#cell-" + checking).hasClass(oldcolor)) {
                    // switch colors
                    $("#cell-" + checking).removeClass(oldcolor);
                    $("#cell-" + checking).addClass(newcolor);

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

        var currentStep = 0;

        $("#easy").click(function(){
            $("#grid").html(makegrid());
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
    };
}(jQuery));