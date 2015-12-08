var stringOpen = "<button class=\"default\" id=\"";
var stringClose = "\"  onclick=\"select(this.id)\"><div class=\"textButton\">.</div></button>"

var piezas = ["X", "B", "Y", "G", "O", "P"];
direcciones = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right',
}


var foco;
var lastClass;
var casilaActual;
var nuevaCasilla;
//Funcion para dibujar el tablero
function define() {
    var body = document.getElementById("Main");
    for (var i = 0; i < 25; i++) {
        body.innerHTML = body.innerHTML + stringOpen + i + stringClose;
    };
    document.getElementById('12').classList.add('final');
    document.getElementById('21').classList.add('X');
    document.getElementById('4').classList.add('P');
    document.getElementById('0').classList.add('O');
    document.getElementById('2').classList.add('G');
    //document.getElementById('17').classList.add('B');
    document.getElementById('19').classList.add('Y');
}

//Funcion de seleccionar la casilla que clickamos, además pone las demas al estado original.
function select(a) {
    var aux = document.getElementById(a);
    var defecto = document.getElementsByClassName('default');
    for (var i = 0; i < defecto.length; i++) {
        defecto[i].classList.remove('focus');
    };

    //comprobamos que es un elemento clickable, es decir una pieza con la que podamos interactuar.
    if (aux.classList.length != 1) {
        aux.classList.add('focus');
    }
     checkEnd();

}

function setVariables() {
    foco = document.getElementsByClassName('focus');
    lastClass = foco[0].classList[1];
    casilaActual = parseInt(foco[0].id);
}

function callRepaint() {
    foco[0].classList.remove(lastClass);
    nuevaCasilla.classList.add(lastClass);
    select(nuevaCasilla.id);
}

function checkEnd(){
    console.log(foco);
    if(foco[0].classList.contains('final')){
        console.log('wena');
    }
    
}
function up() {
    for (var i = casilaActual; i > 1; i = i - 5) {
        if (document.getElementById(i).classList.length == 2 && document.getElementById(i).classList.contains('final') == false) {
            nuevaCasilla = document.getElementById(i + 5);
            callRepaint();
            break;s
        }
    }
}


function down() {
    for (var i = casilaActual; i < 25; i = i + 5) {
        if (document.getElementById(i).classList.length == 2 && document.getElementById(i).classList.contains('final') == false) {
            nuevaCasilla = document.getElementById(i - 5);
            callRepaint();
            break;
        }
    }
}


function left() {
    var i = casilaActual;
    i--;
    while (i % 5 != 4) {
        if (document.getElementById(i).classList.length == 2 && document.getElementById(i).classList.contains('final') == false) {
            nuevaCasilla = document.getElementById(i + 1);
            callRepaint();
            break;
        }
        i--;
    }
}


function right() {
    var i = casilaActual;
    i++;
    while (i % 5 != 0) {
        if (document.getElementById(i).classList.length == 2 && document.getElementById(i).classList.contains('final') == false) {
            nuevaCasilla = document.getElementById(i - 1);
            callRepaint();
            break;
        }
        i++;
    }
}

window.onkeydown = function(e) {
    setVariables();

    switch (direcciones[e.keyCode]) {
        case 'up':
            up();
            break;

        case 'down':
            down();
            break;

        case 'left':
            left();
            break;

        case 'right':
            right();
            break;
    }

}
