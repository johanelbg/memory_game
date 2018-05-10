$(window).on('load',function(){
  $('#myModal').modal('show')
 });

var memoryGame = {};

memoryGame.game = function(){
  memoryGame.randomize();
  memoryGame.layout();
  memoryGame.myResetBut();
  memoryGame.clickable();
};

var allCards = [
  {
    'name' : 'fox',
    'img' : './images/ca1.jpg',
  },
  {
    'name' : 'sloth',
    'img' : './images/ca2.jpg',
  },
  {
    'name' : 'otter',
    'img' : './images/ca3.jpg',
  },
  {
    'name' : 'cat',
    'img' : './images/ca4.jpg',
  },
  {
    'name' : 'dog',
    'img' : './images/ca5.jpg',
  },
  {
    'name' : 'weird',
    'img' : './images/ca6.jpg',
  },
];

var mediumCard = [
  {
    'name' : 'rabbit',
    'img' : './images/ca7.jpg',
  },
  {
    'name' : 'cat2',
    'img' : './images/ca8.jpg',
  },
  {
    'name' : 'dog2',
    'img' : './images/ca9.jpg',
  },
]

var hardCard = [
  {
    'name' : 'rabbit',
    'img' : './images/ca7.jpg',
  },
  {
    'name' : 'cat2',
    'img' : './images/ca8.jpg',
  },
  {
    'name' : 'dog2',
    'img' : './images/ca9.jpg',
  },
  {
    'name' : 'monkey',
    'img' : './images/ca10.jpg',
  },
  {
    'name' : 'bear',
    'img' : './images/ca11.jpg',
  },
  {
    'name' : 'foxy',
    'img' : './images/ca12.jpg',
  },
];

var cardTwice;

function setNewCards(deck, newDeck) {
  for (var i = 0; i < newDeck.length; i++){
    deck.push(newDeck[i])
    var doubleIt = deck.concat(deck);
  }
  return doubleIt
};

var myButtons = document.getElementsByClassName('buttonStart');
console.log(myButtons);
for (var i = 0; i < myButtons.length; i++){
  myButtons[i].addEventListener('click', function(event){
    var clickedBut = event.target;

    if(myButtons[0] === clickedBut){
      cardTwice = allCards.concat(allCards)
      memoryGame.game();
      $('#myModal').modal('hide')

    } else if (myButtons[1] === clickedBut) {
        cardTwice = setNewCards(allCards, mediumCard)
        memoryGame.game();
        $('#myModal').modal('hide')

    } else if (myButtons[2] === clickedBut) {
        cardTwice = setNewCards(allCards, hardCard)
        memoryGame.game();
        $('#myModal').modal('hide')

    }
  })
};

var counter = 0;
var pointLeft = 10;
var userWin = 0;
var cardOne = '';
var cardTwo = '';

//------randomize the array------\\
memoryGame.randomize = function(){
  cardTwice.sort(() => 0.5 - Math.random());
};

//------display main layout------\\
memoryGame.layout = function(){
  document.getElementById('myCounter').innerHTML = `Points left: ${pointLeft}`
  document.body.style.backgroundImage = "url('./images/backg.jpg')";

  cardTwice.forEach(item => {
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('cardDiv');
    cardDiv.classList.add('col-sm-2');
    cardDiv.dataset.name = item.name;
    document.getElementById('mainGame').appendChild(cardDiv);

    var frontCard = document.createElement('div');
    frontCard.classList.add('frontCard');
    frontCard.classList.add('col-12');
    cardDiv.appendChild(frontCard);

    var backCard = document.createElement('div');
    backCard.classList.add('backCard')
    backCard.classList.add('col-12')
    backCard.style.backgroundImage = `url(${item.img})`;
    cardDiv.appendChild(backCard);
  })
};

//------create and display a reset button------\\
memoryGame.myResetBut = function(){
  var resetButton = document.createElement('input');
  resetButton.classList.add('btn');
  resetButton.classList.add('btn-primary');
  resetButton.classList.add('resetButton');
  resetButton.type = 'value';
  resetButton.value = 'Reset Game'
  document.getElementsByTagName('body')[0].appendChild(resetButton);

  resetButton.addEventListener('click', function(){
    location.reload();
  })
};

//------make the divs clickable and check if match or not------\\
memoryGame.clickable = function(){
  function reset() {
    counter = 0;
    cardOne = '';
    cardTwo = '';

    var cardDiv = document.getElementsByClassName('cardDiv');
    var selectCard = document.querySelectorAll('.selectCard');
    selectCard.forEach(cardDiv => {
      cardDiv.classList.remove('selectCard');
    })
  }

  var cardDiv = document.getElementsByClassName('cardDiv');
  for (var i=0; i < cardDiv.length; i++){
    cardDiv[i].addEventListener('click', function(event){
      var clicked = event.target;
      clicked.classList.add('selectCard');
      if (counter < 2){
        counter ++
        if(counter === 1){
        cardOne = clicked.parentNode.dataset.name
        clicked.parentNode.classList.add('selectCard');
        console.log(cardOne);
        } else if (counter === 2){
        cardTwo =  clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selectCard');
        console.log(cardTwo);
        }

        if (cardOne === cardTwo){
          console.log("match");
          setTimeout(reset, 1200);
          userWin++;

          var selectCard = document.querySelectorAll('.selectCard');
          selectCard.forEach(cardDiv =>{
            cardDiv.classList.add('matchCard');
          })

          if (userWin === (cardTwice.length)/2){
            alert('You won');
            location.reload();
          }

        } else if ((cardOne !== cardTwo) && (cardTwo !== '')){
          console.log("no match")
          setTimeout(reset, 1200);
          pointLeft--;
          document.getElementById('myCounter').innerHTML = `Points left: ${pointLeft}`
          console.log(pointLeft);

            if (pointLeft === 0) {
              alert("You lost")
              location.reload();
            }
        }
      }
    })
  }
};
