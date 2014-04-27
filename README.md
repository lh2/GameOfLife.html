GameOfLife.js
===============

`GameOfLife.js` is a web implementation of Conway's game of life in JavaScript.

Usage
=====

Example usage utilising all settings (set to their default values) would be:

    var game = new GameOfLife({
        width: 10,                 //Number of cells on the X-Axis
        height: 10,                //Number of cells on the Y-Axis
        border: 1,                 //Border width in pixels
        bgColor: '#000',           //Background color (space around the cells including the border)
        borderRadius: 0,           //Used for rounded corners
        cellStyle: {
            width: 50,             //Cell width in pixels
            height: 50,            //Cell height in pixels
            borderRadius: 0,       //Falls back on main `borderRadius`
            colorDisabled: '#FFF', //Cell color if dead
            colorEnabled: '#000'   //Cell color if alive
        }
    });

`game.element` holds the DOM element. Start the game by calling `game.start()` and stop it by calling `game.stop()`.

Building
========

Build the minified file by calling make on the command line:

    make dist

You can find the minified file in `dist/gameoflife.min.js`. Unless `JSCOMPILER` is not changed, `uglifyjs` is used for minification.

