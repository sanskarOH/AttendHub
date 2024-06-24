
navLinks = document.getElementById("nav-links"); 
document.getElementById('my-btn').addEventListener('click', function() {
      window.location.href = 'https://github.com/sanskarOH/AttendHub#Readme';
    });
const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".container__left h1", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".container__left .container__btn", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".container__right h4", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".container__right h2", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".container__right h3", {
  ...scrollRevealOption,
  delay: 2000,
});
ScrollReveal().reveal(".container__right p", {
  ...scrollRevealOption,
  delay: 2500,
});

ScrollReveal().reveal(".container__right .tent-1", {
  duration: 1000,
  delay: 800,
});
ScrollReveal().reveal(".container__right .tent-2", {
  duration: 1000,
  delay: 1300,
});
