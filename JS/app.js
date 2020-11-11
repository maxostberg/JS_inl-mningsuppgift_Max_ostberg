/* Variables, picked up from DOM */
const customerForm = document.querySelector('.customer-form');
const inputs = document.querySelectorAll('.inputs');
let submitButton = document.querySelector('.submit-btn');
const nameInput = document.querySelector('#name');
const courseInput = document.querySelector('#course');
const authorInput = document.querySelector('#author');
const cardContainer = document.querySelector('.card-container');
const cardPicture = document.querySelector('.card-picture');

/* Submitbutton Disabled */
submitButton.disabled = true;

/* Event-listeners */
inputs.forEach(item => {
    item.addEventListener('focusout', inputValidation);
});
customerForm.addEventListener('keyup', buttonEnabled);
customerForm.addEventListener('submit', addCardToDom);
document.addEventListener('DOMContentLoaded', savedCards);

/* Functions */

/* A function that validates the inputs that they are not empty */
function inputValidation(event){
    if(event.target.value === ''){
        event.target.classList.add('notfilled');
    } else {
        event.target.classList.remove('notfilled');
    }
}

/* Checks if the inputs are empty or not empty, and then decide if the button should be clickable */
function buttonEnabled(){
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === ''){
            submitButton.disabled = true;
        } else {
            submitButton.disabled = false;
        }
    }
}

/* Add the card to the DOM when submit and push the inputs into an array in local-storage */
function addCardToDom(event){
    event.preventDefault();

    /* When the event occurs, two divs are added into the DOM */
    const calcBox = document.querySelector('.calc-box');
    calcBox.style.display = 'flex';

    const pauseContainer = document.querySelector('.pause-container');
    pauseContainer.innerHTML = `<div class="spinning-loader"></div>`;

    /* my object which contains the name, course and author. */
    const cardObj = {
        name: nameInput.value,
        course: courseInput.value,
        author: authorInput.value
    };

    const data = loadDataFromLocalStorage();
    
    data.push(cardObj);

    localStorage.setItem('cards', JSON.stringify(data));
    
    /* Card to DOM */
    let htmlCard = createCard(nameInput.value, courseInput.value, authorInput.value);
    
    /* a timer for the different boxes and cards to be added to the dom */
    setTimeout(function(){
        pauseContainer.innerHTML = '';
        calcBox.style.display = 'none';
        submitButton.disabled = true;
        cardContainer.innerHTML += htmlCard;
    }, 3000)

    /* Looping through the inputs and resetting them */
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = '';
    }
}

/* function that puts the data in the local storage into the DOM as cards */
function savedCards(){
    const data = loadDataFromLocalStorage();

    let htmlCode = '';

    for(let i = 0; i < data.length; i++){
        htmlCode += createCard(data[i].name, data[i].course, data[i].author)
    }

    cardContainer.innerHTML = htmlCode;
}


/* Utility functions */
function createCard(name, course, author){
    const htmlCode = `
        <div class="card">
            <div class="card-top">
                <img src="https://source.unsplash.com/random/80${randomNum()}x600" alt="course picture" class="card-picture">
            </div>
            <div class="card-bottom">
                <div class="info-box name-box">
                    <span class="category name-category">Name:</span>
                    <p class="name-text category-text">${name}</p>
                </div>
                <div class="info-box course-box">
                    <span class="category course-category">Course:</span>
                    <p class="course-text category-text">${course}</p>
                </div>
                <div class="info-box author-box">
                    <span class="category author-category">Author:</span>
                    <p class="author-text category-text">${author}</p>
                </div>
            </div>
        </div>
    `;

    return htmlCode;
}

function loadDataFromLocalStorage(){
    let data;

    if(localStorage.getItem('cards')){
        data = JSON.parse(localStorage.getItem('cards'));
    } else {
        data = [];
    }

    return data;
}




function randomNum(){
    return Math.abs(Math.ceil(Math.random() * 10));
}