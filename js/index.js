function init() {
    $("#iniciar").click(namePlayers);
    $("#comenzar").click(initGame);
    inicio();
    //$("#link-historial").click(initHistorial);
    // HISTORIAL
    $('#boton-historial').click(onClickBtnHistorial);
    $('#btn-historial').click(onClickBtnHistorial);
    $("#lista-juegos").on("click","button",onClickBtnItemJuego);
    $("#btn-comentar").click(onClickBtnComentar);
}

function namePlayers() {
    $(".inicio").hide();
    $(".jugador").show();
}
function initGame() {
    if($("#inputOne").val()=="" || $("#inputTwo").val()==""){
        $("#salida-jugador").addClass("alert alert-danger");
        $("#salida-jugador").html("Ingrese su nombre por favor");
    }else{
        $(".jugador").hide();
        $(".game").show();
        $("#turno").html("Turno de "+$("#inputOne").val());
        $("#movimiento-uno").html("Movimientos "+$("#inputOne").val()+": ");
        $("#movimiento-dos").html("Movimientos "+$("#inputTwo").val()+": ");
    }
    // numero random
    var numRandom = Math.floor((Math.random() * 2) + 1);
}


 // ------------------------------------------ JUEGO
function inicio(){
    var n = 0 ; 
    // length es 9
    while(n < celdas.length){
        celdas[n].addEventListener('click', gato); 
        n++; 
    }
}

var turno = 1; 
var queTurno; 
var arregloGato = new Array(9); 
var celdas = document.getElementsByClassName('celdas');
var turnoUno=0;
var turnoDos=0;

function gato (evento){ 
    //el td o la celda que ejecuto el evento
    var celda = evento.target;
    var idCelda = evento.target.id;
    //var posicionAMarcar = idCelda [1]-1;
    // texto de TURNO
    var textoTurno = document.getElementById("turno");

    jugadorUno = document.getElementById("inputOne");
    jugadorDos = document.getElementById("inputTwo");
    
    var movimientoUno = document.getElementById("movimiento-uno");
    var movimientoDos = document.getElementById("movimiento-dos");
    
    queTurno = turno%2; 
    console.log(celda.firstChild);
    if(celda.firstChild == null){
        if(queTurno!=0){
            celda.innerHTML="X";
            celda.style.background ="tomato"; 
            textoTurno.innerHTML= ("Turno de "+jugadorDos.value);
            turnoUno++;

            movimientoUno.innerHTML= ("Movimientos "+jugadorUno.value+": "+turnoUno);

            arregloGato[idCelda] = "X";
            ganaJugador("X",jugadorUno.value); 
        } 
        else if (queTurno==0){
            celda.innerHTML="O";
            celda.style.background ="aqua"; 
            textoTurno.innerHTML= ("Turno de "+jugadorUno.value);
            turnoDos++;
            movimientoDos.innerHTML= ("Movimientos "+jugadorDos.value+": "+turnoDos);

            arregloGato[idCelda] = "O";
            ganaJugador("O",jugadorDos.value);
        }

        if (turno == 9) {
            alert('empate'); 
            //window.location.reload; 
        } else {
            turno++; 
        }
    }
    else{
        alert("nooo");
    }
}

function ganaJugador(letra,_name){
    var ganador = $("#ganador");
    if (
        (arregloGato[0]== letra && arregloGato[1]== letra && arregloGato[2]== letra )||
        (arregloGato[3]== letra && arregloGato[4]== letra && arregloGato[5]== letra )||
        (arregloGato[6]== letra && arregloGato[7]== letra && arregloGato[8]== letra )||
        (arregloGato[0]== letra && arregloGato[3]== letra && arregloGato[6]== letra )||
        (arregloGato[1]== letra && arregloGato[4]== letra && arregloGato[7]== letra )||
        (arregloGato[2]== letra && arregloGato[5]== letra && arregloGato[8]== letra )||
        (arregloGato[0]== letra && arregloGato[4]== letra && arregloGato[8]== letra )||
        (arregloGato[2]== letra && arregloGato[4]== letra && arregloGato[6]== letra )
        )
        {
            ganador.html("Ganó "+_name+"!!");
            if(_name == jugadorDos.value){
                localStorage.setItem('ganador',_name);
                localStorage.setItem('perdedor',jugadorUno.value);
                localStorage.setItem('moves',turnoDos);
            }else if(_name == jugadorUno.value){
                localStorage.setItem('ganador',_name);
                localStorage.setItem('perdedor',jugadorDos.value);
                localStorage.setItem('moves',turnoUno);
            }
            //window.location.reload();
        }
}





/* VALIDAR MAYUSCULA */
function validationName() {
    var inputOne = $("#inputOne");
    var inputTwo = $("#inputTwo");
    
    if(inputOne.val() != ""){
        inputOne.val(toMayus(inputOne.val()));
    }
    if(inputTwo.val() != ""){
        inputTwo.val(toMayus(inputTwo.val()));
    }
}

function toMayus(texto){
    var nombreArray = texto.split("");
    var primeraLetra = nombreArray[0];
    var mayuscula = primeraLetra.toUpperCase();
    var espacio = false;

    for(var i=1; i<nombreArray.length; i++) {

        if(espacio){
            mayuscula += nombreArray[i].toUpperCase();
            espacio = false;
        } else {
            mayuscula += nombreArray[i].toLowerCase();
            if(nombreArray[i] == " ")
                espacio = true;
        }
    }
    return mayuscula;
}



// ---------------------------------------- HISTORIAL

function onClickBtnHistorial(evt) {
    evt.preventDefault();
    $(".inicio").hide();
    $(".game").hide();
    $(".jugador").hide();
    $("#historial").show();
	//gotoSection('historial');
    getHistorial();
}

function onClickBtnItemJuego(){
    var idGame = $(this).parent().data("id");
    //getSingleGame(idGame);
    $("#historial").hide();
    $("#historial-detalle").show();
    getComentarios(idGame);
    currentGameId = idGame;
}

function getHistorial(){
    $.ajax({
        url:"https://test-ta.herokuapp.com/games"
    }).done(function(_data){
        dibujarHistorial(_data);
    });
}

$("#boton-historial").click(pushHistorial);

function pushHistorial(){
    var ganador= localStorage.getItem("ganador");
    var perdedor= localStorage.getItem("perdedor");
    var turnos= localStorage.getItem("moves");
    $.ajax({
        url:"https://test-ta.herokuapp.com/games",
        data: {game:{winner_player:ganador, loser_player:perdedor, number_of_turns_to_win:turnos}},
        type: "POST"
    }).done(function(_data){
        getHistorial();
    })
}

function getSingleGame(_idGame){
    $.ajax({
        //por defecto es get
        url:"https://test-ta.herokuapp.com/games/"+_idGame,
        type: "GET"
    }).done(function(_data){
        console.log(_data);
    })
}

function dibujarHistorial(_datos) {
    var lista=$("#lista-juegos");
    for(var i in _datos){
        var datosId = _datos[i].id;
        var nombreGanadores = "<li data-id='"+ _datos[i].id +"' class='list-group-item'>"+_datos[i].winner_player+" le gano a "+_datos[i].loser_player+" en "+_datos[i].number_of_turns_to_win+" movimientos"+"<button class='btn' style='margin-left:20px;'>Comentar</button></li>";
        lista.append(nombreGanadores);
    }
}

function onClickBtnComentar() {
    var name= $("#name");
    var content = $("#content");
    
    var mensaje= $("#alert");
    if(name.val()!=""){
        mensaje.html("Tu comentario ha sido agregado exitosamente");
        enviarComentario(currentGameId,name.val(),content.val());
    }
    else{
        mensaje.html("Comentario inválido");
    }
    name.val("");
    content.val("");
}

function getComentarios(_idGame){
    $.ajax({
        //por defecto es get
        url:"https://test-ta.herokuapp.com/games/"+_idGame+"/comments",
        type: "GET"
    }).done(function(_data){
        console.log(_data);
        dibujarComentarios(_data);
    })
}

function dibujarComentarios(_datos) {
    var lista = $("#lista-comentarios");
    lista.empty();
    for(var i in _datos){
        var html = "<li class='list-group-item'>"+_datos[i].name+" dice: <p>"+_datos[i].content+"</p></li>";
        lista.append(html);
    }
}

function enviarComentario(_idGame, _name, _content) {
    $.ajax({
        url:"https://test-ta.herokuapp.com/games/"+_idGame+"/comments",
        type: "POST",
        data:{comment:{name:_name, content:_content, game_id:_idGame}}
    }).done(function(_data){
        console.log(_data);
        getComentarios(_idGame);
    });
}