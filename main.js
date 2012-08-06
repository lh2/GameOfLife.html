(function($) {
    function newGrid(width, height) {
        var container = $('#gridContainer').empty();
        var table = "<table>";
        for(var y = 0; y < height; y++)
        {
            table += "<tr>";
            for(var x = 0; x < height; x++)
            {
                table += "<td>&nbsp;</td>";
            }
            table += "</tr>";
        }
        table += "</table>";
        container.append(table);
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
