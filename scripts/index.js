let formElement, 
    divElement,
    nameInputValue,
    professionInputValue;


window.addEventListener("load", function() {
    const buttonEditElement = document.querySelector('.profile__edit-button');
    if(buttonEditElement){
        buttonEditElement.addEventListener('click', openPopup);
        heading = document.querySelector('.profile__name');
        subheading = document.querySelector('.profile__profession');

    }

    const buttonCloseElement = document.querySelector('.popup__close-button');
    if(buttonCloseElement){
        buttonCloseElement.addEventListener('click', closePopup);
    }

    formElement = document.querySelector('.popup__container');
    formElement.addEventListener('submit', handleFormSubmit); 

    divElement = document.querySelector('.page');
}
);

const openPopup = function () {  
    formElement.classList.add('popup_opened') ;
    divElement.classList.add('page_theme-dark');
};

const closePopup = function () {
    formElement.classList.remove('popup_opened');
    divElement.classList.remove('page_theme-dark');
};



function handleFormSubmit (evt) {
    evt.preventDefault(); 
    formElement.addEventListener ('submit', handleFormSubmit);

    const nameInput = formElement.querySelector('.popup__name').value;
    const professionInput = formElement.querySelector('.popup__profession').value;

    document.querySelector('.profile__name').textContent =nameInput;
    document.querySelector('.profile__profession').textContent = professionInput;

    closePopup();
};







