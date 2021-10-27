//Popups: login, signup, small experiences
var togglePopup = (popup) => {
  var popupModal = document.getElementById(popup);
  popupModal.classList.toggle("show_popup");
};

//Popups: map (brazil, sweden and usa)
var toggleMapPopup = (popup) => {
  var popupMapModal = document.getElementById(popup);
  popupMapModal.classList.toggle("show_map_popup");
};
