

function ascending(a, b) {
    return a - b;
}

var histogram = function(elem, arr, scale){
    arr.sort(ascending);
    $('#' + elem).empty();

    var bins_number = 20;
    var min = arr[0];
    var max = arr[arr.length - 1];
    var step = (max - min) / bins_number;
    var h_arr = [];
    var i = 0;
    var left_border_x = min;
    
    for (var bin = 1; bin <= bins_number; bin++) {
        right_border_x = left_border_x + step;
        h_arr[bin - 1] = 0;

        while (arr[i] <= right_border_x) {
            h_arr[bin - 1] += 1;
            i += 1;
        }
        left_border_x = arr[i];
    }

    var map = h_arr.map(function(item) { return item / arr.length * 100; });

    for (i = 0; i < map.length; i++) {
        var rect = $('#' + elem).append('<div id="' + elem + 'rect' + (i + 1) + '" class="rect">' + h_arr[i] + '</div>');
        $('#' + elem + 'rect' + (i + 1)).height(map[i] * scale);
    }


  }