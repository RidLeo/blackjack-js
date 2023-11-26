const miModulo = (() => {
    'use strict'
    let deck = []
    const tipos = ['C', 'D', 'H', 'S']
    const especiales = ['A', 'J', 'Q', 'K']

    // let puntosJugador = 0
    // let puntosComputadora = 0
    let puntosJugadores = []

    //Referencias del html
    const btnPedir = document.querySelector('#btnPedir')
    const btnDetener = document.querySelector('#btnDetener')
    const btnNuevo = document.querySelector('#btnNuevo')

    const divCartasJugador = document.querySelectorAll('.divCartas')
    const puntosHtml = document.querySelectorAll('small')

    // Esta función crea un nuevo deck
    const crearDeck = () => {
        let newDeck = []
        for (let i = 2; i < 15; i++) {
            for (let tipo of tipos) {
                let value = String(i)
                if (i > 10) value = especiales[i - 11]
                newDeck.push(value + tipo);
            }
        }
        return _.shuffle(newDeck);
    }

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = []
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        btnPedir.disabled = false;
        btnDetener.disabled = false;
        btnNuevo.disabled = true;

        puntosHtml.forEach(item => {
            item.innerHTML = 0
        })
        divCartasJugador.forEach(item => {
            item.innerHTML = '';
        })

        console.log(deck)
    }

    //Esta función me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length == 0) {
            throw 'No hay cartas en el deck'
        }
        return deck.pop()
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? (valor == 'A') ? 11 : 10 : parseInt(valor)
    }

    //turno: 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntosHtml[turno].innerHTML = puntosJugadores[turno]
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img')
        imgCarta.src = `assets/cartas/${carta}.png`
        imgCarta.classList.add('carta')
        divCartasJugador[turno].append(imgCarta)
    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        if (puntosComputadora == puntosMinimos) {
            console.warn('empate')
        }
        else if (puntosMinimos > 21) {
            console.error('Computadora Gana')
        }
        else if (puntosComputadora > 21) {
            console.info('Jugador Gana')
        }
        else {
            console.error('Lo siento, perdiste machucao');
        }
    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta()
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1)
        } while (puntosComputadora < puntosMinimos && puntosMinimos < 22);
        determinarGanador()
    }

    const finTurno = (puntosJugador) => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

    //Eventos
    btnPedir.addEventListener('click', () => {
        btnNuevo.disabled = false;
        const carta = pedirCarta()

        const puntosJugador = acumularPuntos(carta, 0)
        crearCarta(carta, 0)

        if (puntosJugador > 21 || puntosJugador === 21) finTurno(puntosJugador)
    });

    btnDetener.addEventListener('click', () => {
        btnNuevo.disabled = false;
        const [puntosJugador] = puntosJugadores;
        finTurno(puntosJugador)
    })

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    })

    return{
        nuevoJuego: inicializarJuego
    }
})()