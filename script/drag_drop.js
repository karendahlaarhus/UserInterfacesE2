$(function () {
  $(".draggable").draggable({
    containment: ".experiences_container",
    cursor: "move",
    snap: ".experiences_container",
    stack: ".card",
  });
});
