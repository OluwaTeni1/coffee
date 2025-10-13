var open = document.getElementById("menu-icon-open");
var close = document.getElementById("menu-icon-close");
var navLinks = document.querySelector(".nav-links");

open.addEventListener("click", function () {
  navLinks.classList.add("active");
});

close.addEventListener("click", function () {
  navLinks.classList.remove("active");
});

document.getElementById("year").textContent = new Date().getFullYear();
