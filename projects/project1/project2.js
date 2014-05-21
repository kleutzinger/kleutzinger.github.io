var warn = false;
var startY, R, R2, generations

var setDefault = function(){
$('#startY').val(0.501);
$('#R').val(3.7);
$('#R2').val(3.71);
$('#generations').val(100);
};

$("#ViewResult").on("click", function (evt) {
              evt.preventDefault();
        drawChart();
});

$("#Reset").on("click", function (evt) {
              evt.preventDefault();
        setDefault();
});

$(function(){
    $('html').keydown(function(e){
      if(e.which == 13){drawChart();}
    });
});


var getParams = function(){
    R = document.getElementById("R").value;
    R2 = document.getElementById("R2").value;
    startY = document.getElementById("startY").value;
    generations = document.getElementById("generations").value;

};

var generate = function(r, y0, iters){
    gens = [y0]
    for (var i = 0; i < iters; i++){
        yFinal = gens[gens.length-1]
        gens.push(r*yFinal * (1-yFinal))
    };
    return gens;
};


var checkWarn = function(){
    if (warn){
      alert("r and c should be numbers!");  
    };
    warn = false;
};


var drawChart=function(){
//checkWarn()
getParams()
y1 = generate(R, startY, generations);
y1.unshift('y')
y2 = generate(R2, startY, generations);
y2.unshift('y2')

var chart = c3.generate({
  bindto: '#chart',
  data: {
    y1: 'R1 '+R,
    y2: 'R2 '+R2,
    columns: [
      y1,
      y2
    ]
  }
});
}

setDefault();
getParams();
drawChart();


//def f(y,rate=1,capacity=100):
//return rate*y * (1- (y/capacity))

//x = [x for x in range(-10, 110)]
//y = [f(i) for i in x]

