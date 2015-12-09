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
var checkPosition;
var regExp = "/x|O|G|X|P|B|Y|x/";
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
        document.getElementById(j).className = "default";
    };
    document.getElementById('12').classList.add('final');
    var e = document.getElementById('lista');
    var seleccionada = e.options[e.selectedIndex].value;
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
        document.getElementById(opcion[i].position).classList.add(opcion[i].type);

    };
}


function load() {
    AJAX('maps.json', function(d) {
        //Seleccionamos la op del combobox
        parsedJson = JSON.parse(d);
        var e = document.getElementById('lista');
        for (i in parsedJson.mapas) {
            if (e.contains(i.name) == false) {
                e.add(new Option(i, i.name))
            };
        }
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
    if (foco[0].classList[1] == 'final') {
        lastClass = foco[0].classList[2];
    } else {
        lastClass = foco[0].classList[1];
    }
    casilaActual = parseInt(foco[0].id);
}

function callRepaint() {
    foco[0].classList.remove(lastClass);
    nuevaCasilla.classList.add(lastClass);
    select(nuevaCasilla.id);
}

function checkEnd() {
    if (foco[0].classList.contains('final') && foco[0].classList.contains('X')) {
        alert("EZPZ");
    }

}

function up() {
    for (var i = casilaActual - 5; i => 0; i = i - 5) {
        checkPosition = document.getElementById(i);
        console.log(checkPosition)

        if (checkPosition.classList.length != 1 && checkPosition.className.match(regExp) != null) {
            nuevaCasilla = document.getElementById(i + 5);
            callRepaint();
            break;
        }
    }
}


function down() {
    for (var i = casilaActual + 5; i < 25; i = i + 5) {
        checkPosition = document.getElementById(i);
        console.log(checkPosition)
        if (checkPosition.classList.length != 1 && checkPosition.className.match(regExp) != null) {
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
        checkPosition = document.getElementById(i);
        if (checkPosition.classList.length != 1 && checkPosition.className.match(regExp) != null) {
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
        checkPosition = document.getElementById(i);
        if (document.getElementById(i).classList.length != 1 && checkPosition.className.match(regExp) != null) {
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
