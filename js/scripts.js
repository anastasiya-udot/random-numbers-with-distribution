$(document).ready(function() {

    var getUniformRandomValues = function(n) {
        var a = 1664525;
        var m = 65536;
        var arr = [];
        var Rn = 101;


        for (var i = 0; i < n; i++) {
            arr.push((a * Rn % m) / m);
            Rn = arr[i]; 
        }
        return arr;

    }

    var sum_arr = function(arr) {
        return arr.reduce(function(a, b) {
            return a + b;
        });
    }

    var uniformDistribution = function() {

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

        function generateRandom(a, b, n) {
            var x_arr = [];

            getUniformRandomValues(n).forEach(function(R) {
                x_arr.push(a + (b - a) * R);
            });
            histogram('cud-histo', x_arr, 20);

            $('#cud-m-value').text((a + b) / 2);
            $('#cud-d-value').text(Math.pow((b - a), 2) / 12);
            $('#cud-g-value').text(Math.sqrt((Math.pow(b - a), 2) / 12));
        }
    };

    var gaussianDistribution = function() {
        $('#gad-calulate').click(function() {
            var m = $('#gad-m-input').val();
            var g = $('#gad-g-input').val();
            var n = $('#gad-n-input').val();

            try {
                generateRandom(+m, +g, +n)
            } catch(err) {
                alert('Неверные зачения');
            }
        });

        function generateRandom(m, g, n) {
            var x_arr = [];

            for (var i = 0; i < n; i++) {
                x_arr.push(m + g * Math.sqrt(12 / n) * (sum_arr(getUniformRandomValues(n)) - n / 2))
            }

            histogram('gad-histo', x_arr, 20);

            $('#gad-m-value').text(m);
            $('#gad-d-value').text(Math.pow(g, 2));
            $('#gad-g-value').text(g);
        }
    }

    var expDistribution = function() {
        $('#exp-calulate').click(function() {
            var l = $('#exp-l-input').val();
            var n = $('#exp-n-input').val();

            try {
                generateRandom(+l, +n)
            } catch(err) {
                alert('Неверные зачения');
            }
        });

        function generateRandom(l, n) {
            var x_arr = [];

            getUniformRandomValues(n).forEach(function(R) {
                x_arr.push( 0 - 1 / l * Math.log(R))
            });

            histogram('exp-histo', x_arr, 10);

            $('#exp-m-value').text(1 / l);
            $('#exp-d-value').text(1 / Math.pow(l, 2));
            $('#exp-g-value').text(1 / l);
        }
    };

    var hammaDistribution = function() {
        $('#hamma-calulate').click(function() {
            var n = $('#hamma-n-input').val();
            var l = $('#hamma-l-input').val();

            try {
                generateRandom(+l, +n)
            } catch(err) {
                alert('Неверные зачения');
            }
        });

        function generateRandom(l, n) {
            var x_arr = [];

            getUniformRandomValues(n).forEach(function(R) {
                x_arr.push( 0 - 1 / l * Math.log(R))
            });

            histogram('hamma-histo', x_arr, 10);

            $('#hamma-m-value').text(n / l);
            $('#hamma-d-value').text(n / Math.pow(l, 2));
            $('#hamma-g-value').text(n / l);
        }
    };

    var triangularDistribution = function() {
        $('#triang-calulate').click(function() {
            var a = $('#triang-a-input').val();
            var b = $('#triang-b-input').val();
            var n = $('#triang-n-input').val();

            generateRandom(+a, +b, +n)
            
        });

        function generateRandom(a, b, n) {
            var x_arr = [];
            var r_arr = getUniformRandomValues(n * 2);

            for (var i = 0; i < n; i++) {
                x_arr.push(a + (b - a) * Math.max(r_arr.pop(), r_arr.pop()));
            }

            histogram('triang-histo', x_arr, 20);
            /*
            $('#triang-m-value').text(n / l);
            $('#triang-d-value').text(n / Math.pow(l, 2));
            $('#triang-g-value').text(n / l);
            */
        }
    };

    var simpsonDistribution = function() {
        $('#simps-calulate').click(function() {
            var a = $('#simps-a-input').val();
            var b = $('#simps-b-input').val();
            var n = $('#simps-n-input').val();

            generateRandom(+a, +b, +n)
            
        });

        function generateRandom(a, b, n) {
            var x_arr = [];
            var r_arr = getUniformRandomValues(n * 2);

            for (var i = 0; i < n; i++) {
                x_arr.push(a + (b - a) * Math.max(r_arr.pop(), r_arr.pop()));
            }

            histogram('simps-histo', x_arr, 20);

            $('#simps-m-value').text(2 * (Math.pow(a, 3) + Math.pow(b, 3) - (a + b) / 4) / 3 / Math.pow(b - a, 2));
            $('#simps-d-value').text(Math.pow(b - a, 2) / 24);
            $('#simps-g-value').text(Math.sqrt(Math.pow(b - a, 2) / 24));
        }
    };


    uniformDistribution();
    gaussianDistribution();
    expDistribution()
    hammaDistribution();
    triangularDistribution();
    simpsonDistribution();
});