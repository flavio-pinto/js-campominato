/**
 * Il computer deve generare 16 numeri casuali tra 1 e 100 (numeri vietati)
 * In seguito deve chiedere all’utente di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserire più volte lo stesso numero
 * Se il numero è presente nella lista dei numeri generati (numeri vietati), la partita termina, altrimenti si continua chiedendo all’utente un altro numero
 * La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti
 * Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito
 * BONUS: All’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali: 
 * *****con difficoltà 0 => tra 1 e 100
 * *****con difficoltà 1 =>  tra 1 e 80
 * *****con difficoltà 2=> tra 1 e 50
 */

// Scelta livello di difficoltà
var livello = prompt('Scegli livello di difficoltà tra 1, 2 e 3').toLowerCase().trim();

// Creo variabile vuota per il range di numeri che saranno disponibili in base alla difficoltà
var range = '';

// Validazione scelta livello
while ((livello != 1) && (livello != 2) && (livello != 3)) {
    livello = prompt('Per favore, scegli il livello tra 1, 2 e 3').toLowerCase().trim();
}

// Stabilisco il range in base al livello scelto
switch (livello) {
    case '1':
        range = 100;
    break;

    case '2':
        range = 80;
    break;

    case '3':
        range = 50;
    break;
}

// Creo array che conterrà i numeri esplosivi
numeriVietati = [];
numeriVietati = generaMine(1, range);
console.log(numeriVietati);

// Creo array utility per storare numeri giocati e permettermi grazie alla validazione di evitare l'inserimento di un numero per due volte
numeriGiocati = [];

// Creo variabile punteggio da incrementare
var punteggio = 0;
// Creo variabile utility per stabilire l'inizio e la fine del ciclo-partita
var partitaInCorso = true;

// Creo ciclo partita
while (partitaInCorso) {
    var inputUtente = parseInt(prompt('Inserisci un numero da 1 a ' + range));
    // Validazioni varie
    while ((inputUtente == 0) || (inputUtente > range) || (inputUtente == 0) || (inputUtente < 0) || (isNaN(inputUtente)) || (inputUtente.length < 1) || ((numeriGiocati.includes(inputUtente)))) {
        inputUtente = parseInt(prompt('Per favore, inserisci un numero da 1 a ' + range + ' e non inserire numeri già giocati, stringhe o spazi vuoti'));
    }

    switch(numeriVietati.includes(inputUtente)) {
        case false:
            punteggio++;
            numeriGiocati.push(inputUtente);
            console.log('I numeri che hai già giocato sono: ' + numeriGiocati);
            console.log('Il tuo punteggio attuale è: ' + punteggio);
        break;

        case true: 
            partitaInCorso = false;
            console.log('Oops, GAME OVER, hai pestato una mina!');
            console.log('Hai totalizzato ' + punteggio + ' punti');
        break;
    }

    if(range == punteggio + numeriVietati) {
        partitaInCorso = false;
        console.log('Hai totalizzato ' + punteggio + ' punti');
        console.log('Congratulazioni, hai fatto il punteggio massimo. Sei mejo te!');
    }
}

// funzione per creare numeri-mine
function generaMine(min, max) {
    var array = [];
    var numero = '';
    for (var i = 1; i <= 16; i++){
        numero = i;
        numero = Math.floor(Math.random() * (max - min)) + min ;

        while (array.includes(numero)) {
            numero = Math.floor(Math.random() * (max - min)) + min ;
        }

        array.push(numero);
    }   

    return array;
}