'use strict'

// global variables
var imgArray = [];
var attempts = 25;
var userAttempts = 0;

// DOM variables
var firstImgIndex, secondImgIndex, thirdImgIndex;
var imgDiv = document.getElementById('images');
var firstImg = document.createElement('img');
firstImg.id = 'firstImg';
var secondImg = document.createElement('img');
secondImg.id = 'secondImg';
var thirdImg = document.createElement('img');
thirdImg.id = 'thirdImg';
var resultList = document.getElementById('resultList');
var form = document.getElementById('form');
var button = document.getElementById('resultButton');

// object constructor
function Product(imgName) {
    this.name = imgName;
    this.src = '../img/' + imgName + '.jpg';
    this.shown = 0;
    this.vote = 0;
    imgArray.push(this);
}

// declaring objects
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');

// envoking functions
chooseThreeImages();
renderImages();

// adding events
form.addEventListener('submit', submitted);
imgDiv.addEventListener('click', userClick);
button.addEventListener('click', result, { once: true });

// event functions
function submitted(event) {
    console.log(event.target.userAttempts.value);
    event.preventDefault();
    userAttempts = event.target.userAttempts.value;
    console.log(document.getElementById('userAttempts'));
    attempts = userAttempts;
}

function userClick(event) {
    console.log(event.target);
    attempts--;
    console.log(attempts);
    if (attempts > 0) {
        if (event.target.id === firstImg.id) {
            imgArray[firstImgIndex].vote++;
            chooseThreeImages();
            renderImages();
        } else if (event.target.id === secondImg.id) {
            imgArray[secondImgIndex].vote++;
            chooseThreeImages();
            renderImages();
        } else if (event.target.id === thirdImg.id) {
            imgArray[thirdImgIndex].vote++;
            chooseThreeImages();
            renderImages();
        }
        else {
            attempts++;
        }
    } else {
        result();
    }
}

function result() {
    var results;
    for (var i = 0; i < imgArray.length; i++) {
        results = document.createElement('li');
        results.textContent = imgArray[i].name + ' got ' + imgArray[i].vote + ' votes out of ' + imgArray[i].shown + ' times it was displayed.';
        resultList.appendChild(results);
    }
    imgDiv.removeEventListener('click', userClick);
}

// render functions
function chooseThreeImages() {
    //getting random indexes
    firstImgIndex = randomIndex();
    do {
        secondImgIndex = randomIndex();
        thirdImgIndex = randomIndex();
    } while (firstImgIndex === secondImgIndex || firstImgIndex === thirdImgIndex || secondImgIndex === thirdImgIndex)
    imgArray[firstImgIndex].shown++
    imgArray[secondImgIndex].shown++
    imgArray[thirdImgIndex].shown++
}

function renderImages() {
    firstImg.src = imgArray[firstImgIndex].src;
    imgDiv.appendChild(firstImg);
    secondImg.src = imgArray[secondImgIndex].src;
    imgDiv.appendChild(secondImg);
    thirdImg.src = imgArray[thirdImgIndex].src;
    imgDiv.appendChild(thirdImg);
}

// random function
function randomIndex() {
    return Math.floor(Math.random() * imgArray.length);
}