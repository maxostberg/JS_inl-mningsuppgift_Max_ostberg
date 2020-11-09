/* Variables, picked up from DOM */
const customerForm = document.querySelector('.customer-form');
const inputs = document.querySelectorAll('.inputs');
let submitButton = document.querySelector('.submit-btn');
const nameInput = document.querySelector('#name');
const courseInput = document.querySelector('#course');
const authorInput = document.querySelector('#author');
const cardContainer = document.querySelector('.card-container');


/* Event-listeners */
inputs.forEach(item => {
    item.addEventListener('focusout', inputValidation);
});
customerForm.addEventListener('keyup', buttonEnabled);
customerForm.addEventListener('submit', addCardToDom);



/* Submitbutton Disabled */
submitButton.disabled = true;

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

function addCardToDom(event){
    event.preventDefault();

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

    cardContainer.innerHTML += htmlCard;

    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = '';
    }
}


/* Utility functions */
function createCard(name, course, author){
    const htmlCode = `
        <div class="card">
            <div class="card-top">
                <img src="https://source.unsplash.com/random" alt="course picture" class="card-picture">
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