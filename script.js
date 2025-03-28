alert("Controls: \nf - Flop \nn - Next Player \nr - New Round(Automatically Changes Blinds) \nSpace - Flip hand")

const maxVal = 2;
const minVal = 0;
let numPlayers = prompt('How many players?');
let curFlop = 0;
let curBet = 0;
let nPlayer = 0;//next player
let bigBlind = 0;
let numMoves = 0;
let displayed = false; 
let h = document.getElementById('hand');
let t = document.getElementById('table');
let anidelay = 100;
let tableContent = [];
let hands;

function randMatrix(){
    let list = [];
    for (let i = 0; i<4; i++){
        let p = Math.floor(Math.random()*(maxVal-minVal+1)+minVal);
        list.push(p);
    }
    return list;
}
function generateMatrix(m){
    let r = randMatrix();
    writeMatrix(m,r)
    return r;
}
function writeMatrix(m,e,b = [true, true, true, true]){
    m.innerHTML = '';
    for (let i = 0; i<4; i++){
        m.appendChild(makeCard(e[i],b[i]));
    }
}
function front(n){
    let i = document.createElement('p');
    i.innerHTML = n;
    return i;
}
function back(){
    let i = document.createElement('img');
    i.setAttribute('src', 'public/back.png');
    i.setAttribute('class', 'img-container')
    return i;
}
function makeCard(n, isBack = true){
    let c = document.createElement('div');
    c.setAttribute('class', 'matrix-entry');
    c.dataset.hidden = n;
    if (isBack){
        c.appendChild(back());
    }else{
        c.appendChild(front(n));
    }
    return c;
}
function flipCard(s, isBack = true){//read in a matrix-entry element
    s.style.transform = 'rotatey(90deg)';// rotatey(180deg)';
    setTimeout(()=>{
        s.innerHTML = '';
        s.style.transform = '';
        if (isBack){
            n = front(s.dataset.hidden);
        }else{
            n = back();
        }
        s.appendChild(n);
    }, anidelay)
}
function flipHand(){//change hand to front
    for (let i = 0; i<4; i++){
        card = h.children[i];
        flipCard(card, !displayed);
    }
    displayed = !displayed;
}
function flop(){
    flipCard(t.children[curFlop]);
    curFlop++;
}
function nextPlayer(){
    writeMatrix(h,hands[nPlayer])
    document.getElementById('pnum').innerHTML = "Player " + String(nPlayer+1) + ":";
    numMoves++;
    nPlayer = (nPlayer+1)%numPlayers;
    displayed = false;
}
function startRound(){
    tableContent = generateMatrix(t);
    hands = []
    for (let i = 0; i<numPlayers; i++){
        hands.push(randMatrix());
    }
    nPlayer = bigBlind;
    document.getElementById('pnum').innerHTML = "Player " + String(nPlayer+1) + ":";
    writeMatrix(h,hands[nPlayer])
    nPlayer = (nPlayer+1)%numPlayers;
    bigBlind++;
    bigBlind = bigBlind%numPlayers;
    curFlop = 0;
    numMoves = 0;
    displayed = false;
    flop();
    flop();
}

function raise(){

}
function call(){

}
function fold(){

}
function check(){

}

function calcWinner(){
    let tMatrix = [[tableContent[0],tableContent[1]],[tableContent[2],tableContent[3]]]
    let hMatrices = [];
    for (let i = 0; i<numPlayers; i++){
        let hMatrix = [[hand[i][0],hand[i][1]],[hand[i][2],hand[i][3]]];
        hMatrices.push(hMatrix);
    }
}


document.addEventListener('keydown', function(event) {
    const callback = {
    "f"             : flop,
    " "             : flipHand,
    "Shift"         : nextPlayer,
    "n"             : nextPlayer,
    "r"             : startRound

}[event.key]
callback?.() // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
});

document.getElementById('flip').addEventListener('click', flipHand);
document.getElementById('flop').addEventListener('click', flop);
document.getElementById('next').addEventListener('click', nextPlayer);
document.getElementById('newr').addEventListener('click', startRound);

//generateMatrix(t);
//writeMatrix(h, hands[0]);
startRound();