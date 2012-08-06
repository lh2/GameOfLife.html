(function($) {
    function newGrid(width, height) {
        
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
