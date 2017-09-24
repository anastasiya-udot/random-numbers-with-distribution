var getUniformRandomValues = function(n) {
    var a = 1664525;
    var m = 65536;
    var arr = [];
    var Rn = getRandomValue(100, 1000);


    for (var i = 0; i < n; i++) {
        arr.push((a * Rn % m) / m);
        Rn = arr[i]; 
    }
    return arr;
}

function getRandomValue(min, max) {
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

function find_m(arr) {
    return sum_arr(arr) / arr.length;
}

function find_d(arr, m) {
    var temp_arr = arr.map(function(item) {
        return Math.pow((item - m), 2);
    });

    return sum_arr(temp_arr) / arr.length;
}

function find_g(d) {
    return Math.sqrt(d);
}