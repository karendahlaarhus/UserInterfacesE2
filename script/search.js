const searchButton = document.getElementById("search_button"); //receives search-button
const resetButton = document.getElementById("reset-button"); //receives set-button
const searchInput = document.getElementById("search_input"); //receives search_input
const cardContainer = document.getElementById("experiences-list"); //receives experiences-list
const nothingFoundText = document.getElementById("nothing-found-text"); //receives nothing-found-text
var hiddenCardCount = 0;

resetButton.style.visibility = "hidden";
nothingFoundText.style.visibility = "hidden";

//Click-search-button-function
const handleClickSearchButton = () => {
  const searchInputValue = searchInput.value.toLowerCase(); //gets userinput from search bar

  //selects all cards
  cardContainer.querySelectorAll(".card .card-body").forEach((el) => {
    el.parentElement.style.display = "block";
  });

  cardContainer.querySelectorAll(".card .card-body").forEach((el) => {
    const title = el.innerHTML.toLowerCase();
    if (!title.includes(searchInputValue)) {
      el.parentElement.style.display = "none"; //if searchtext doesn't match experience card, it hides card.
      hiddenCardCount += 1;
    }
  });

  //show nothing-found-text when there are no matching cards to the search query
  if (hiddenCardCount == cardContainer.querySelectorAll(".card").length) {
    nothingFoundText.style.visibility = "visible";
  }
  resetButton.style.visibility = "visible"; //show reset-button
  hiddenCardCount = 0;
};

const handleClickResetButton = () => {
  //Click-reset-button-function
  cardContainer.querySelectorAll(".card .card-body").forEach((el) => {
    el.parentElement.style.display = "block";
  });
  searchInput.value = null;
  resetButton.style.visibility = "hidden";
  nothingFoundText.style.visibility = "hidden";
  hiddenCardCount = 0;
};

searchButton.addEventListener("click", handleClickSearchButton);
resetButton.addEventListener("click", handleClickResetButton);
