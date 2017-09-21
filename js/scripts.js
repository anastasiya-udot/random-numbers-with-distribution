$(document).ready(function() {

    var getUniformRandomValues = function(n) {
        var a = 1664525;
        var m = 65536;
        var arr = [];
        var Rn = getRandomArbitary(100, 1000);


        for (var i = 0; i < n; i++) {
            arr.push((a * Rn % m) / m);
            Rn = arr[i]; 
        }
        return arr;
    }

    function getRandomArbitary(min, max) {
      return Math.random() * (max - min) + min;
    }
    

    var sum_arr = function(arr) {
        return arr.reduce(function(a, b) {
            return a + b;
        });
    }

    var prod_arr = function(arr, number) {
        var counter = 0;
        var result = 1;

        while (counter < number) {
            result *= arr[counter];
            counter += 1;
        }

        return result;
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
            var rand_number;

            for (var i = 0; i < n; i++) {
                var rand_number = getRandomArbitary(1000, 10000);
                x_arr.push(m + g * Math.sqrt(12 / rand_number) * (sum_arr(getUniformRandomValues(rand_number)) - rand_number / 2))
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
                var rand_number = getRandomArbitary(e, e * 100);
                x_arr.push( 0 - 1 / l * Math.log(prod_arr(getUniformRandomValues(rand_number), e)));
            }

            histogram('hamma-histo', x_arr, 10);

            $('#hamma-m-value').text(e / l);
            $('#hamma-d-value').text(e / Math.pow(l, 2));
            $('#hamma-g-value').text(e / l);
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