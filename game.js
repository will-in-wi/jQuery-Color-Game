// TODO: Add finish screen.
// Make buttons more obvious.
// Help text

(function($){
    'use strict';

    Array.prototype.find = function(searchStr) {
        var returnArray = false;
        for (var i=0; i<this.length; i++) {
            if (this[i] === searchStr) {
                if (!returnArray) { returnArray = [] }
                returnArray.push(i);
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


        // Compute total possible moves.
        var totalMoves = 22; // TODO: Actually compute this from size and number of colors.


        // Initialize gameboard.
        // Counter, grid, color select.
        var counter = $('<div />')
            .addClass('counter')
            .html('0 of ' + totalMoves + ' moves');
        this.append(counter);

        var grid = $('<div />')
            .addClass('grid');

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
                        .attr('data-color', color);
                    tr.append(td);
                    cell++;
                }
                grid.append(tr);
            }
            return grid;
        }
        grid.html(makegrid());
        this.append(grid);

        var makeControls = function() {
            var colorSelect = $('<table />')
                .addClass('color-select');

            var tr = $('<tr />');

            for (var i = 0; i < options.noOfColors; i++) {
                var td = $('<td />')
                    .attr('data-color', i);
                tr.append(td);
            };

            colorSelect.append(tr);

            return colorSelect;
        }
        this.append(makeControls());



        var currentStep = 0;

        var switch_colors = function(newcolor) {
            var arrChecked = [];
            var arrToCheck = [0];

            var oldcolor = $('#cell-0').attr('data-color');

            var checking;
            while (arrToCheck.length > 0) {
                checking = arrToCheck.shift();
                if ($("#cell-" + checking).attr('data-color') == oldcolor) {

                    // switch colors
                    $("#cell-" + checking).attr('data-color', newcolor);

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
            $(".counter").html(currentStep + ' of ' + totalMoves + ' moves');
        }

        $('.color-select td').click(function(){
            switch_colors($(this).attr('data-color'));
        });
    };
}(jQuery));