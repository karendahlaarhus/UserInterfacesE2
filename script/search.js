const searchButton = document.getElementById("search_button"); //receives search-button
const resetButton = document.getElementById("reset-button"); //receives set-button
const searchInput = document.getElementById('search_input'); //receives search_input
const cardContainer = document.getElementById("experiences-list"); //receives experiences-list
const nothingFoundText = document.getElementById("nothing-found-text"); //receives nothing-found-text
var hiddenCardCount = 0;

resetButton.style.visibility = 'hidden';
nothingFoundText.style.visibility = 'hidden';

const handleClickSearchButton = () => { //Click-search-button-function
    
    const searchInputValue = searchInput.value.toLowerCase();

    cardContainer.querySelectorAll(".card .card-body").forEach((el) => {
        el.parentElement.style.display = "block";
    }
)
    cardContainer.querySelectorAll(".card .card-body").forEach((el) => {
        const title = el.innerHTML.toLowerCase() 
        if (!title.includes(searchInputValue)){ 
            el.parentElement.style.display = "none"; //if searchtext doesn't match experiencecard, it sets card hidden.
            hiddenCardCount +=1;
        }
    })
    if(hiddenCardCount == cardContainer.querySelectorAll('.card').length){ //show nothing-found-text
        nothingFoundText.style.visibility = 'visible';
    }
    resetButton.style.visibility = 'visible'; //show reset-button
    hiddenCardCount = 0;
}

const handleClickResetButton = () => { //Click-search-button-function
    cardContainer.querySelectorAll(".card .card-body").forEach((el) => {
            el.parentElement.style.display = "block";
        }
    )
    searchInput.value = null
    resetButton.style.visibility = 'hidden';
    nothingFoundText.style.visibility = 'hidden';
    hiddenCardCount = 0;
}
searchButton.addEventListener("click", handleClickSearchButton)
resetButton.addEventListener("click", handleClickResetButton)

