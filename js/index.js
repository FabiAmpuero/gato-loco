function init() {
    $("#iniciar").click(namePlayers);
    $("#comenzar").click(initGame);
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
    
    
    
    $("td").each(function(){$(this).click(celda1)});
    //$("#celda1").click(celda1);
}

function celda1() {
    console.log($(this).text());
    if($(this).text("")){
        $(this).html("x");
        $("#turno").html("Turno de "+$("#inputTwo").val());
    }else{
        if($(this).text("x")){
            alert("Este espacio ya esta ocupado!");
        }    
    }
    
    //$("#celda1").html("x");
    //$("#turno").html("Turno de "+$("#inputTwo").val());
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