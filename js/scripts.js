$(document).ready(function() {

    function ascending(a, b) {
        return a - b;
    }

    var uniformDistribution = function() {
        addEventListeners();

        function buildHisto () {
            console.log(d3);        
        };

        function generateRandom(a, b, n) {
            var x_arr = [];
            var add_value = (b - a) / n;

            for ( var x = a; x <=b; ) {
                x_arr.push((x - a) / (b - a));
                x += add_value;
            }

            x_arr.sort(ascending);
            buildHisto(x_arr);
        }

        function addEventListeners() {
            $('#cud-calulate').click(function() {
                var a = $('#cud-a-input').val();
                var b = $('#cud-b-input').val();
                var n = $('#cud-n-input').val();

                try {
                    generateRandom(+a, +b, +n)
                } catch(err) {
                    alert('Неверные зачения');
                }
            });
        }
    };


    uniformDistribution();
});