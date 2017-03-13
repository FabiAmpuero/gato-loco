function init() {
    $("#iniciar").click(namePlayers);
    $("#comenzar").click(initGame);
    inicio();
}

function namePlayers() {
    $(".inicio").hide();
    $(".jugador").show();
}
function initGame() {
    if($("#inputOne").val()=="" || $("#inputTwo").val()==""){
        alert("vacio");
    }else{
        $(".jugador").hide();
        $(".game").show();
        $("#turno").html("Turno de "+$("#inputOne").val());
    }
    // numero random
    var numRandom = Math.floor((Math.random() * 10) + 1);
    
    
    
    //$("td").each(function(){$(this).click(celda1)});
    //$("#celda1").click(celda1);
}

/*
function celda1() {
    //console.log($(this).text());
    if($(this).text() == ""){
        $(this).html("x");
        $("#turno").html("Turno de "+$("#inputTwo").val());
        console.log("vacio");     
    }
    else if($(this).text() == 'x'){
        alert("Este espacio ya esta ocupado!");
        console.log("lleno");
    }    
    
    //$("#celda1").html("x");
    //$("#turno").html("Turno de "+$("#inputTwo").val());
}
*/

var turno = 1; 
var queTurno; 
var arregloGato = new Array(9); 
var celdas = document.getElementsByTagName('td');



function ganaJugador(letra){
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
           alert ('jugador'+letra+'gana'); 
           window.location.reload();
       }
}


function gato (evento){ 
   var celda = evento.target;
   var idCelda = evento.target.id;
   console.log(idCelda[1]);
   var posicionAMarcar = idCelda [1]-1;
   var oli = document.getElementById("turno");
   var chau = document.getElementById("inputTwo");
   var chaufi = document.getElementById("inputOne");

   queTurno = turno%2; 
   
   if(queTurno!=0){
        celda.innerHTML="x";
        oli.innerHTML= ("Turno de "+chau.value);
        celda.style.background ="red"; 
        arregloGato[posicionAMarcar] = "X";
        ganaJugador("X"); 
   } else if (queTurno==0){
        celda.innerHTML="O";
        oli.innerHTML= ("Turno de "+chaufi.value);
        celda.style.background ="aqua"; 
        arregloGato[posicionAMarcar] = "O";
        ganaJugador("O");
   }
   
   if (turno == 9) {
        alert('empate'); 
        window.location.reload; 
   } else {
        turno++; 
   }
}

function inicio(){
   var n = 0 ; 
   
   while(n < celdas.length){
       celdas[n].addEventListener('click', gato); 
       n++; 
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