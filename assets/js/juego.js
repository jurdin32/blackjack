
let deck = [];

const tipos=["C","D","H","S"];

const especiales = ["A","J","Q","K"];

let puntosJugador=0;

let puntosComputadora=0;


// crea una nueva baraja
const creardeck = () =>{

    for ( let i = 2; i <= 10 ;i++){
        for(let tipo of tipos){
            deck.push(i + tipo)
        }
    }

    for ( let tipo of tipos){
        for ( let especial of especiales){
            deck.push(especial + tipo)
        }
    }

    //console.log(deck) //arreglo original

    deck=_.shuffle(deck) // arreglo aletorio 

    console.log(deck) // nuevo arreglo

    return deck;
}

creardeck()

// funcion para pedir carta:

const pedirCarta =() =>{
    if (deck.length === 0){
        throw 'No hay cartas en la baraja'
    }else{
        
    }
    const carta = deck.pop() // elimina el ultimo valor del arreglo y lo devuelve    
    return carta
}

const valorCarta = ( carta ) => {

    const  valor = carta.substring(0,carta.length-1)
    return ( isNaN(valor) )? (valor === 'A') ? 11:10
            : valor * 1;


}


const cartasComputadora = document.querySelector("#computadora-cartas")
// turno del computador:
const  turnoComputadora = (puntosMinimos) => {

    do{
        const carta = pedirCarta()
        puntosComputadora = puntosComputadora + valorCarta(carta)
        smallJugador[1].innerText = puntosComputadora
        const imgCarta = document.createElement("img")
        imgCarta.src ='assets/img/cartas/'+carta+".png"
        imgCarta.classList.add("carta")
        cartasComputadora.append(imgCarta)
        if(puntosMinimos > 21){
            break;
        }

    }while((puntosComputadora < puntosMinimos) && (puntosMinimos<=21))
    
    setTimeout(() => {
        if ((puntosComputadora > puntosMinimos ) && (puntosComputadora < 21)){
        alert("Computadora Gano")
        } else if(puntosComputadora === puntosMinimos){
            alert("Nadie gana..!")
        }
        else{
            alert("usuario Gano")
        }
    }, 10);
    

}



//referencias:
const pedir = document.querySelector('#pedir');
const nuevo = document.querySelector('#nuevo');
const detener = document.querySelector('#detener');
const smallJugador = document.querySelectorAll('small');
const cartasJugador = document.querySelector("#jugador-cartas")

// eventos:
pedir.addEventListener('click',() => {
    const carta = pedirCarta()

    puntosJugador = puntosJugador + valorCarta(carta)
    smallJugador[0].innerText = puntosJugador

    const imgCarta = document.createElement("img")
    imgCarta.src ='assets/img/cartas/'+carta+".png"
    imgCarta.classList.add("carta")
    cartasJugador.append(imgCarta)
    
    if (puntosJugador > 21){
        pedir.disabled=true;
        detener.disabled=true;
        turnoComputadora(puntosJugador)
    }
    else if (puntosJugador === 21){
        pedir.disabled=true;
        detener.disabled=true;
        turnoComputadora(puntosJugador)
    }
    console.log(puntosJugador)

});


detener.addEventListener('click',()=>{
    pedir.disabled=true;
    detener.disabled=true;
    turnoComputadora(puntosJugador)
})

nuevo.addEventListener('click',()=>{
    deck=[]
    deck =creardeck();

    puntosJugador=0
    puntosComputadora=0
    smallJugador[0] =0
    smallJugador[1] =0
    pedir.disabled=false
    detener.disabled=false

    cartasComputadora.innerHTML=""
    cartasJugador.innerHTML=""

})
