var stringOpen = "<button class=\"default\" id=\"";
var stringClose = "\"  onclick=\"select(this.id)\"><div class=\"textButton\">.</div></button>";
var piezas = ["X", "B", "Y", "G", "O", "P"];
direcciones = {
    38: 'up',
    40: 'down',
    37: 'left',
    39: 'right',
}

var opcion;
var foco;
var lastClass;
var casilaActual;
var nuevaCasilla;
var parsedJson;
//Funcion para dibujar el tablero
function define() {
    document.getElementById("Main").innerHTML = "";
    var body = document.getElementById("Main");
    for (var i = 0; i < 25; i++) {
        body.innerHTML = body.innerHTML + stringOpen + i + stringClose;
    };
    document.getElementById('12').classList.add('final');
    reset();

}

function reset() {
    for (var j = 0; j < 25; j++) {
        document.getElementById(j).className = "";
    };
    document.getElementById('12').classList.add('final');
    var e = document.getElementById('lista');
    for (i in parsedJson.mapas) {
        e.add(new Option(i,i.name))
    }
    var seleccionada = e.options[e.selectedIndex].value;
    console.log(seleccionada);
    console.log(parsedJson);
    switch (seleccionada) {
        case 'easy':
            opcion = parsedJson.mapas.easy;
            break;
        case 'normal':
            opcion = parsedJson.mapas.normal;
            break;
        case 'hard':
            opcion = parsedJson.mapas.hard;
            break;
    }
    for (var i = 0; i < opcion.length; i++) {
        console.log(opcion[i].position);
        console.log(opcion[i].type);
        document.getElementById(opcion[i].position).classList.add(opcion[i].type);

    };
}


function load() {
    AJAX('maps.json', function(d) {
        //Seleccionamos la op del combobox
        parsedJson = JSON.parse(d);
    });
    define();
    console.log(parsedJson);
}

function AJAX(url, callback) {
    var client = new XMLHttpRequest()
    client.onreadystatechange = function() {
        if (client.readyState == 4 && client.status == 200)
            callback(client.responseText)
    }
    client.open('GET', url)
    client.send()
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

function checkEnd() {
    console.log(foco);
    if (foco[0].classList.contains('final')) {
        console.log('wena');
    }

}

function up() {
    for (var i = casilaActual; i > 0; i = i - 5) {
        if (document.getElementById(i).classList.length == 2 && document.getElementById(i).classList.contains('final') == false) {
            nuevaCasilla = document.getElementById(i + 5);
            callRepaint();
            break;
            s
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
