(function($) {
    var interval,
        data;
    
    function getNeighbourCount(y, x) {
        var count = 0;
        var height = data.length;
        var width = data[0].length;
        
        for(var yp = y - 1, ylength = yp + 3; yp < ylength; yp++)
        {
            for(var xp = x - 1, xlength = xp + 3; xp < xlength; xp++)
            {
                var ayp = yp, axp = xp;
                if(ayp < 0)
                    ayp = height - 1;
                
                if(axp < 0)
                    axp = width - 1;
                
                if(ayp === height)
                    ayp = 0;
                
                if(axp === width)
                    axp = 0;
                
                if(data[ayp][axp] && !(yp === 0 && xp === 0))
                    count++;
            }
        }
        
        return count;
    }
        
    function startGame() {
        var table = $('#gridContainer > table');
        data = [];
        
        var rows = table.find("tr");
        for(var y = 0, length = rows.length; y < length; y++)
        {
            var cols = rows.eq(y).children();
            for(var x = 0, length = cols.length; x < length; x++)
            {
                if(!data[y])
                    data[y] = [];
                
                var state = cols.eq(x).data("live");
                if(typeof state === "undefined")
                    state = false;
                
                data[y].push(state);
            }
        }
        
        interval = setInterval(step, 500);
    }

    function step() {
        var newData = [];
        
        var width = data[0].length;
        
        for(var y = 0, height = data.length; y < height; y++)
        {
            newData[y] = [];
            for(var x = 0; x < width; x++)
            {
                var neighbours = getNeighbourCount(y, x);
                
                if(data[y][x])
                {
                    if(neighbours < 2 || neighbours > 3)
                    {
                        newData[y].push(false);
                    }
                    else
                    {
                        newData[y].push(true);
                    }
                }
                else
                {
                    if(neighbours === 3)
                    {
                        newData[y].push(true);
                    }
                    else
                    {
                        newData[y].push(false);
                    }
                }
            }
        }
    }

    function stopGame() {
        if(interval.clear)
            interval.clear();
    }
    
    function newGrid(width, height) {
        var container = $('#gridContainer').empty();
        var table = "<table>";
        for(var y = 0; y < height; y++)
        {
            table += "<tr>";
            for(var x = 0; x < height; x++)
            {
                table += "<td></td>";
            }
            table += "</tr>";
        }
        table += "</table>";
        container.append(table);
        var button = $('<button>Start</button>');
        button.click(startGame);
        container.append(button);

        container.find("td").click(function(e) {
            var sender = $(this);
            if(sender.data("live"))
            {
                sender.data("live", false);
                sender.css("background-color", "");
            }
            else
            {
                sender.data("live", true);
                sender.css("background-color", "#9999FF");
            }
        });
    }
    
    $(function() {
        $('#submit').click(function() {
            var widthBox = $('#gridWidth');
            var heightBox = $('#gridHeight');
            
            var width = widthBox.val();
            var height = heightBox.val();
            
            var markWidthBox = !width.match(/^[0-9]+$/);
            var markHeightBox = !height.match(/^[0-9]+$/);
            
            if(markWidthBox)
                widthBox.css("background-color", "#FF0000");
            else
                widthBox.css("background-color", "");

            if(markHeightBox)
                heightBox.css("background-color", "#FF0000");
            else
                heightBox.css("background-color", "");
            
            if(!markWidthBox && !markHeightBox)
            {
                newGrid(width, height);
                widthBox.css("background-color", "");
                heightBox.css("background-color", "");
            }
        });
    });
})(jQuery);
