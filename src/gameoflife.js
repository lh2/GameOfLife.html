/*! 
 * GameOfLife.js Copyright (C) 2014 Lukas Henkel
 * 
 * Copying and distribution of this file, with or without modification,
 * are permitted in any medium without royalty provided the copyright
 * notice and this notice are preserved.  This file is offered as-is,
 * without any warranty.
 */

var GameOfLife = (function() {
    var Canvas = (function() {
        function Canvas(elem) {
            this.ctx = elem.getContext('2d');
        }

        Canvas.prototype.rect = function(x, y, width, height, radius) {
            radius = radius || 0;
            this.ctx.beginPath();
            this.ctx.moveTo(x + radius, y);
            this.ctx.lineTo(x + width - radius, y);
            this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            this.ctx.lineTo(x + width, y + height - radius);
            this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            this.ctx.lineTo(x + radius, y + height);
            this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            this.ctx.lineTo(x, y + radius);
            this.ctx.quadraticCurveTo(x, y, x + radius, y);
            this.ctx.closePath();
        };

        Canvas.prototype.fill = function(color) {
            this.ctx.fillStyle = color;
            this.ctx.fill();
        };

        return Canvas;
    })();

    var ifNotTypeThen = function(val, type, then) {
        if(typeof val !== type)
            return then;
        return val;
    };

    var Cell = (function() {
        function Cell(canvas, x, y, style) {
            this.canvas = canvas;
            this.x = x;
            this.y = y;
            this.style = style;
            this.enabled = false;
        }

        Cell.prototype.draw = function() {
            this.canvas.rect(this.x, this.y, this.style.width, this.style.height, this.style.borderRadius);
            this.canvas.fill(this.enabled ? this.style.colorEnabled : this.style.colorDisabled);
        };

        Cell.prototype.toggle = function() {
            this.enabled = !this.enabled;
            this.draw();
        };

        return Cell;
    })();

    var defaultOptions = function(options) {
        options.width = ifNotTypeThen(options.width, 'number', 10);
        options.height = ifNotTypeThen(options.height, 'number', 10);
        options.border = ifNotTypeThen(options.border, 'number', 1);
        options.bgColor = ifNotTypeThen(options.bgColor, 'string', '#000');
        options.borderRadius = ifNotTypeThen(options.borderRadius, 'number', 0);
        options.cellStyle = options.cellStyle || {};
        options.cellStyle.width  = ifNotTypeThen(options.cellStyle.cellWidth, 'number', 50);
        options.cellStyle.height = ifNotTypeThen(options.cellStyle.cellHeight, 'number', 50);
        options.cellStyle.borderRadius = ifNotTypeThen(options.cellStyle.borderRadius, 'number', options.borderRadius);
        options.cellStyle.colorDisabled = ifNotTypeThen(options.cellStyle.colorDisabled, 'string', '#FFF');
        options.cellStyle.colorEnabled = ifNotTypeThen(options.cellStyle.colorEnabled, 'string', '#000');

        options.cellStyle.bgColor = options.bgColor;
        options.cellStyle.border = options.border;
    };

    function GameOfLife(options) {
        options = options || {};
        defaultOptions(options);

        this.options = options;
        this.element = document.createElement('canvas');
        this.width  = this.element.width  = options.border + (options.cellStyle.width  + options.border) * options.width;
        this.height = this.element.height = options.border + (options.cellStyle.height + options.border) * options.height;
        this.canvas = new Canvas(this.element);
        this.isRunning = false;
        this.intervalId = -1;
        
        this.cells = [];
        for(var y = 0; y < options.height; y++) {
            for(var x = 0; x < options.width; x++) {
                var posX = options.border + (options.cellStyle.width  + options.border) * x,
                    posY = options.border + (options.cellStyle.height + options.border) * y;
                this.cells.push(new Cell(this.canvas, posX, posY, options.cellStyle));
            }
        }

        var self = this;
        this.element.addEventListener('click', function(e) {
            var rect = self.element.getBoundingClientRect(),
                posX = e.clientX - rect.left - self.options.border,
                posY = e.clientY - rect.top - self.options.border;

            var cellWidthBorder  = self.options.cellStyle.width  + self.options.border,
                cellHeightBorder = self.options.cellStyle.height + self.options.border;
            
            var x = parseInt(posX / cellWidthBorder, 10),
                y = parseInt(posY / cellHeightBorder, 10);

            if(posX % cellWidthBorder <= self.options.cellStyle.width &&
               posY % cellHeightBorder <= self.options.cellStyle.height) {
                self.cells[y * self.options.height + x].toggle();
            }
        }, false);

        this.draw();
    }

    GameOfLife.prototype.draw = function() {
        this.canvas.rect(0, 0, this.width, this.height, this.options.borderRadius);
        this.canvas.fill(this.options.bgColor);
        for(var i = 0, l = this.cells.length; i < l; i++)
            this.cells[i].draw();
    };

    GameOfLife.prototype.step = function() {

    };

    GameOfLife.prototype.start = function(interval) {
        var self = this;
        this.intervalId = setInterval(function() {
            self.step();
        }, interval);
        this.isRunning = true;
    };

    GameOfLife.prototype.stop = function() {
        clearInterval(this.intervalId);
        this.isRunning = false;
    };

    return GameOfLife;
})();

