const HariPotter_URL = "https://hp-api.onrender.com/api/characters";
const Cats_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const Dogs_URL = "https://dog.ceo/api/breeds/image/random/6";

function doHariPotterAPI(){
    fetch(HariPotter_URL)
    .then(response => response.json())
    .then(data => createHariPotterCardsList(data))
    .catch(err => console.log(err))
}

function doCatsAPI(){
    fetch(Cats_URL)
    .then(response => response.json())
    .then(data => createCatsCardsList(data))
    .catch(err => console.log(err))
}

function doDogsAPI(){
    fetch(Dogs_URL)
    .then(response => response.json())
    .then(data => createDogsCardsList(data))
    .catch(err => console.log(err))
}

function createHariPotterCardsList(data) {
    // take a 6 random cards from the api server
    let cardsList = [];
    for (let i = 0; i < 6; i++){
        let random = Math.floor(Math.random() * 21);
        let card = data[random];
        cardsList.push(card);
    }
    // update the src of the cards on the board with cards src from api
    let images = [];
    cards.forEach((card) => {
        let img = card.querySelector(".front-face")
        images.push(img);
    });
    for (let i = 0; i < 12; i++){
        let img = images[i];
        img.src = cardsList[Math.floor(i / 2)].image;
    }
}

function createCatsCardsList(data){
    // take a 6 random cards from the api server
    let cardsList = [];
    for (let i = 1; i < 7; i++){
        let card = data[i];
        cardsList.push(card);
    }
    // update the src of the cards on the board with cards src from api
    let images = [];
    cards.forEach((card) => {
        let img = card.querySelector(".front-face")
        images.push(img);
    });
    for (let i = 0; i < 12; i++){
        let img = images[i];
        img.src = cardsList[Math.floor(i / 2)].url;
    }
}

function createDogsCardsList(data){
    // update the src of the cards on the board with cards src from api
    let images = [];
    cards.forEach((card) => {
        let img = card.querySelector(".front-face")
        images.push(img);
    });
    for (let i = 0; i < 12; i++){
        let img = images[i];
        img.src = data.message[Math.floor(i / 2)];
    }
}