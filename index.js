const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
let currentIndex = 0;
let autoScrollTimer;

function updateSlidePosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  thumbnails.forEach((thumb, i) => {
    if (i === currentIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

function showSlide(index) {
  currentIndex = index;
  updateSlidePosition();
  resetAutoScrollTimer();
}

function resetAutoScrollTimer() {
  clearInterval(autoScrollTimer); 
  startAutoScroll(); 
}

function startAutoScroll() {
  autoScrollTimer = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  }, 10000); 
}

thumbnails.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    showSlide(i); 
  });
});

startAutoScroll();
updateSlidePosition();

let lastScrollTop = 0;
    const navbar = document.querySelector("ul");

    window.addEventListener("scroll", () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.classList.add("hide-navbar");
        } else {
            // Scrolling up
            navbar.classList.remove("hide-navbar");
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
});

document.addEventListener("DOMContentLoaded", function () {
  const faders = document.querySelectorAll('.fade-in');

  function checkFade() {
    faders.forEach(fader => {
      const rect = fader.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        fader.classList.add('show');
      } else {
        fader.classList.remove('show'); 
      }
    });
  }

  window.addEventListener('scroll', checkFade);
  checkFade(); 
});

const images = document.querySelectorAll('.character-image-link');

images.forEach(img => {
  const learnMoreText = document.createElement('span');
  learnMoreText.textContent = 'Learn More';
  learnMoreText.classList.add('learn-more');
  img.parentElement.appendChild(learnMoreText);

  img.addEventListener('mouseenter', () => {
    learnMoreText.style.opacity = '1';
  });

  img.addEventListener('mouseleave', () => {
    learnMoreText.style.opacity = '0';
  });
});
