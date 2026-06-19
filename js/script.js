/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      document.querySelector(`header nav a[href="#${id}"]`).classList.add('active');
    }
  });

  // Sticky header
  let header = document.querySelector('.header');
  header.classList.toggle('sticky', window.scrollY > 100);

  // Close navbar on scroll
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

/* ==================== Theme Toggle ====================
   Dark mode is DEFAULT. Toggling switches to light mode.
*/
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('light-mode');
    localStorage.setItem('theme', 'dark');
  }
});

window.addEventListener('load', () => {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'light') {
    themeToggle.checked = true;
    body.classList.add('light-mode');
  } else {
    themeToggle.checked = false;
    body.classList.remove('light-mode');
  }
});

/*==================== scroll reveal ====================*/
const sr = ScrollReveal({
  distance: '60px',
  duration: 1800,
  delay: 200,
});

sr.reveal(`.home-content, .heading`, { origin: 'top', interval: 100 });
sr.reveal(`.home-img, .services-container, .portfolio-box, .contact form`, { origin: 'bottom', interval: 100 });
sr.reveal(`.home-content h1, .about-img`, { origin: 'left', interval: 100 });
sr.reveal(`.home-content p, .about-content`, { origin: 'right', interval: 100 });
sr.reveal(`.projects-container .project-box`, { origin: 'bottom', interval: 200 });
sr.reveal(`.experience-container .experience-box`, { origin: 'bottom', interval: 200 });

/*==================== typed js ====================*/
const typed = new Typed('.multiple-text', {
  strings: ['System Engineer', 'Fullstack Developer', 'Software Engineer'],
  typeSpeed: 80,
  backSpeed: 60,
  backDelay: 1500,
  loop: true,
});

/*==================== open image ====================*/
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");

function openImage(element) {
  // Try to find image: first in parent, then in closest container
  var img = element.parentElement.querySelector('img');
  if (!img) {
    var container = element.closest('.portfolio-box, .experience-image, .carousel-item, .project-image');
    if (container) img = container.querySelector('img');
  }
  if (img) {
    modal.style.display = "block";
    modalImg.src = img.src;
  }
}

var closeModal = document.getElementsByClassName("close")[0];

closeModal.onclick = function () {
  modal.style.display = "none";
};

modal.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/*==================== carousel ====================*/
function changeSlide(button, direction) {
  const carousel = button.closest('.carousel');
  const items = carousel.querySelectorAll('.carousel-item');
  const totalItems = items.length;
  let currentIndex = Array.from(items).findIndex(item => item.classList.contains('active'));

  items[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + direction + totalItems) % totalItems;
  items[currentIndex].classList.add('active');
}

/*==================== EmailJS integration ====================*/
(function () {
  emailjs.init("nXENJ4GfmZFzLKlbj");

  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const templateParams = {
      from_name: document.getElementById('name').value,
      from_email: document.getElementById('email').value,
      mobile: document.getElementById('mobile').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
    };

    emailjs.send("service_a6hoc0i", "template_tt85pvm", templateParams)
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("¡Tu mensaje ha sido enviado con éxito!");
        contactForm.reset();
      }, function (error) {
        console.error('FAILED...', error);
        alert("Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.");
      });
  });
})();