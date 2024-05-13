let deckId = ""
//we are using a global variable 'deckId' as opposed to making it local, so we can use it later
//upon page load, the url parameter within fetch will grab us a new deck of cards
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
      })
      
document.querySelector('button').addEventListener('click', drawTwo)

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
          document.querySelector('#player1').src = data.cards[0].image
          document.querySelector('#player2').src = data.cards[1].image
          let player1Val = convertToNum(data.cards[0].value)
          let player2Val = convertToNum(data.cards[1].value)
          if (player1Val > player2Val){
            document.querySelector('h3').innerText = 'Player 1 wins!'
          } else if (player1Val < player2Val){
            document.querySelector('h3').innerText = 'Player 2 wins!'
          }else{
            document.querySelector('h3').innerText = 'WAR!'
          }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
//a helper function to convert the non-number cards to a numerical value
//v stands for value
function convertToNum(v){
  if(v === 'ACE'){
    return 14
  }else if(v === 'KING'){
    return 13
  }else if(v === 'QUEEN'){
    return 12
  }else if(v === 'JACK'){
    return 11
  }else{
    return Number(v) //the value to always be converted from string to number
  }
}
