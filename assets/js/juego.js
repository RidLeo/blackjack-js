const miModulo = (() => {
    'use strict'
    let deck = [];
    const barajaCompleta = [['C', 'D', 'H', 'S'], ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']]

    let puntosJugadores = [0, 0];
    let smallJugadores = [document.getElementById('puntosJugador'), document.getElementById('puntosCompu')];
    let mesaJugadores = [document.getElementById('jugador-cartas'), document.getElementById('computadora-cartas')];

    const botones = {
        btnNuevo: document.getElementById('btnNuevo'),
        btnPedir: document.getElementById('btnPedir'),
        btnDetener: document.getElementById('btnDetener'),
    }

    const main = () => {
        crearDeck();
    }

    //* Esta funcion crea una nueva baraja
    const crearDeck = () => {
        deck = [];
        for (let i = 0; i < barajaCompleta[0].length; i++) {
            for (let z = 0; z < barajaCompleta[1].length; z++) {
                deck.push(barajaCompleta[1][z] + barajaCompleta[0][i]);
            }
        }
        return deck = _.shuffle(deck);
    }

    //* Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length != 0) {
            return deck.pop();
        }
        else {
            throw new Error('Te quedaste sin cartas')
        }
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (!isNaN(valor)) ? parseInt(valor) : (valor == 'A') ? 11 : 10;
    }
    const acumularPuntos = (jugador) => {
        const carta = pedirCarta();
        if (jugador == puntosJugadores.length) {
            puntosJugadores.push(valorCarta(carta))
        }
        else {
            puntosJugadores[jugador] += valorCarta(carta);
        }
        console.log(puntosJugadores);
        smallJugadores[jugador].innerText = puntosJugadores[jugador];
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = `assets/cartas/${carta}.png`;
        mesaJugadores[jugador].append(imgCarta);
    }
    // Turno Computadora
    const turnoComputadora = (puntosMinimos) => {

        do {
            acumularPuntos(1);
            if (puntosMinimos > 21) {
                break;
            }
        }
        while (puntosJugadores[1] < puntosMinimos);
        setTimeout(() => {
            if (puntosJugadores[1] < 22) {
                if (puntosJugadores[1] > puntosJugadores[0]) {
                    alert('Perdiste machucao');
                }
                else {
                    alert('Ganaste Aweonao!!!');
                }
            }
        }, 500)
    }
    const disableButton = (btnPedirDisable, btnDetenerDisabled) => {
        botones.btnPedir.disabled = btnPedirDisable;
        botones.btnDetener.disabled = btnDetenerDisabled;
    }

    //*Eventos
    botones.btnPedir.addEventListener('click', () => {
        acumularPuntos(0);
        if (puntosJugadores[0] > 21) {
            alert('Perdiste machucao');
            disableButton(true, true);
            turnoComputadora(puntosJugadores[0]);
        }
        else if (puntosJugadores[0] == 21) {
            alert('Ganaste Aweonao!!!');
            disableButton(true, true);
            turnoComputadora(puntosJugadores[0]);
        }
    })
    botones.btnDetener.addEventListener('click', () => {
        disableButton(true, true);
        turnoComputadora(puntosJugadores[0]);
    })

    botones.btnNuevo.addEventListener('click', () => {
        console.clear
        main();
        disableButton(false, false);
        for (let i = 0; i < puntosJugadores.length; i++)
            puntosJugadores[i] = 0
        smallJugadores.forEach(element => { element.innerText = 0 });
        mesaJugadores.forEach(element => { element.innerHTML = '' });
    })

    return {
        nuevoJuego: main,
    }
})()

