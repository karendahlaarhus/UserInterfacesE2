//Makes all cards within the .experiences_container dragabble
$(function () {
  $(".draggable").draggable({
    containment: ".experiences_container",
    cursor: "move",
  });
});
