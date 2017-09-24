$(document).ready(function() {

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

            var m = find_m(x_arr);
            var d = find_d(x_arr, m);
            var g = find_g(d);

            $('#cud-m-value').text(m);
            $('#cud-d-value').text(d);
            $('#cud-g-value').text(g);
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
            var rand_number;

            for (var i = 0; i < n; i++) {
                var rand_number = getRandomValue(1000, 10000);
                x_arr.push(m + g * Math.sqrt(12 / rand_number) * (sum_arr(getUniformRandomValues(rand_number)) - rand_number / 2))
            }

            histogram('gad-histo', x_arr, 20);

            var m = find_m(x_arr);
            var d = find_d(x_arr, m);
            var g = find_g(d);

            $('#gad-m-value').text(m);
            $('#gad-d-value').text(d);
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


            var m = find_m(x_arr);
            var d = find_d(x_arr, m);
            var g = find_g(d);

            $('#exp-m-value').text(m);
            $('#exp-d-value').text(d);
            $('#exp-g-value').text(g);
        }
    };

    var hammaDistribution = function() {
        $('#hamma-calulate').click(function() {
            var n = $('#hamma-n-input').val();
            var l = $('#hamma-l-input').val();
            var e = $('#hamma-e-input').val();

            try {
                if (+e > +n) {
                    throw  new Error(); 
                }
                generateRandom(+l, +e, +n);
            } catch(err) {
                alert('Неверные зачения');
            }
        });

        function generateRandom(l, e, n) {
            var x_arr = [];

            for (var i = 0; i < n; i++) {
                var rand_number = getRandomValue(e, e * 100);
                x_arr.push( 0 - 1 / l * Math.log(prod_arr(getUniformRandomValues(rand_number), e)));
            }

            histogram('hamma-histo', x_arr, 10);

            var m = find_m(x_arr);
            var d = find_d(x_arr, m);
            var g = find_g(d);

            $('#hamma-m-value').text(m);
            $('#hamma-d-value').text(d);
            $('#hamma-g-value').text(g);
        }
    };

    var triangularDistribution = function() {
        $('#triang-calulate').click(function() {
            var a = $('#triang-a-input').val();
            var b = $('#triang-b-input').val();
            var n = $('#triang-n-input').val();

            try {
                generateRandom(+a, +b, +n);
            } catch(err) {
                alert('Неверные зачения');
            }       
        });

        function generateRandom(a, b, n) {
            var x_arr = [];
            var r_arr = getUniformRandomValues(n * 2);

            for (var i = 0; i < n; i++) {
                x_arr.push(a + (b - a) * Math.max(r_arr.pop(), r_arr.pop()));
            }

            histogram('triang-histo', x_arr, 20);
            
            var m = find_m(x_arr);
            var d = find_d(x_arr, m);
            var g = find_g(d);

            $('#triang-m-value').text(m);
            $('#triang-d-value').text(d);
            $('#triang-g-value').text(g);
            
        }
    };

    var simpsonDistribution = function() {
        $('#simps-calulate').click(function() {
            var a = $('#simps-a-input').val();
            var b = $('#simps-b-input').val();
            var n = $('#simps-n-input').val();

            try {
                generateRandom(+a, +b, +n);
            } catch(err) {
                alert('Неверные зачения');
            }   
            
        });

        function generateRandom(a, b, n) {
            var x_arr = [];

            for (var i = 0; i < n; i++) {
                var r_arr_temp1 = getUniformRandomValues(1000, 10000);
                var r_arr1 = [];

                r_arr_temp1.forEach(function(R) {
                    r_arr1.push(a / 2 + (b - a) / 2 * R);
                });

                var r_arr_temp2 = getUniformRandomValues(2000, 20000);
                var r_arr2 = [];

                r_arr_temp2.forEach(function(R) {
                    r_arr2.push(a / 2 + (b - a) / 2 * R);
                })

                x_arr.push(r_arr1.pop() + r_arr2.pop());
            }

            histogram('simps-histo', x_arr, 20);

            var m = find_m(x_arr);
            var d = find_d(x_arr, m);
            var g = find_g(d);

            $('#simps-m-value').text(m);
            $('#simps-d-value').text(d);
            $('#simps-g-value').text(g);
        }
    };


    uniformDistribution();
    gaussianDistribution();
    expDistribution()
    hammaDistribution();
    triangularDistribution();
    simpsonDistribution();
});