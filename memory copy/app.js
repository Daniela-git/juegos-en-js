
document.addEventListener('DOMContentLoaded', () =>{

    // /card options
    const cardArray = [
        {
            name: "amigos",
            img: "images/amigos.jpeg",
        },
        {
            name: "discipulado",
            img: "images/discipulado.jpeg",
        },
        {
            name: "enviar",
            img: "images/enviar.jpeg",
        },
        {
            name: "iglesia",
            img: "images/iglesia.jpeg",
        },
        {
            name: "jesus",
            img: "images/jesus.jpeg",
        },
        {
            name: "lucas",
            img: "images/lucas.jpeg",
        },
        {
            name: "manos",
            img: "images/manos.jpeg",
        },
        {
            name: "orar",
            img: "images/orar.jpeg",
        },
        // faltantes
        // {
        //     name: "manos",
        //     img: "images/manos.jpeg",
        // },
        // {
        //     name: "orar",
        //     img: "images/orar.jpeg",
        // },
        {
            name: "amigos",
            img: "images/amigos.jpeg",
        },
        {
            name: "discipulado",
            img: "images/discipulado.jpeg",
        },
        {
            name: "enviar",
            img: "images/enviar.jpeg",
        },
        {
            name: "iglesia",
            img: "images/iglesia.jpeg",
        },
        {
            name: "jesus",
            img: "images/jesus.jpeg",
        },
        {
            name: "lucas",
            img: "images/lucas.jpeg",
        },
        {
            name: "manos",
            img: "images/manos.jpeg",
        },
        {
            name: "orar",
            img: "images/orar.jpeg",
        },
        // faltantes
        // {
        //     name: "manos",
        //     img: "images/manos.jpeg",
        // },
        // {
        //     name: "orar",
        //     img: "images/orar.jpeg",
        // },
        
    ];
    

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardChosen = []
    var cardChosenId = []
    var cardWon = []
    //   create board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
          var card = document.createElement('img')
          card.setAttribute('src', `images/numbers/${i+1}.png`)
          card.setAttribute('data-id', i)
          card.addEventListener('click', flipCard)
          grid.appendChild(card)
        }
      }
    

    // flip card
    function flipCard(){
        // con el this hacemos que nos de el data-id del elemento al que le
        // dimos click
        var cardId = this.getAttribute('data-id')
        cardChosen.push(cardArray[cardId].name)
        cardChosenId.push(cardId)
        // con este this a la etiqueta img le pasamos la imagen que corresponde a ese data-id en el array con todas las cartas
        this.setAttribute('src',cardArray[cardId].img)
        if(cardChosen.length===2){
            setTimeout(checkForMatch, 500)
        }

    }

    // check for match
    function checkForMatch(){
        var cards = document.querySelectorAll('img')
        const option1 = cardChosenId[0]
        const option2 = cardChosenId[1]
        if(option1 == option2){
            cards[option1].setAttribute('src','images/blank.png')
            cards[option2].setAttribute('src','images/blank.png')
            alert('You click the same image!')
        }else if ( cardChosen[0] === cardChosen[1]){
            // alert('Good you have a match')
            // cards[option1].setAttribute('src','images/white.png')
            // cards[option2].setAttribute('src','images/white.png')
            cards[option1].removeEventListener('click',flipCard)
            cards[option2].removeEventListener('click',flipCard)
            cardWon.push(cardChosen)
        }else{
            cards[option1].setAttribute('src','images/blank.png')
            cards[option2].setAttribute('src','images/blank.png')
            

        }
        cardChosen = []
        cardChosenId = []
        resultDisplay.textContent = cardWon.length
        if (cardWon.length === cardArray.length/2){
            resultDisplay.textContent = 'You Won!!!!!!!'
        }

    }

    createBoard()
})

