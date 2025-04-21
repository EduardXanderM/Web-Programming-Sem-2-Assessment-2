const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
let currentIndex = 0;

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
}

thumbnails.forEach((thumb, i) => {
  thumb.addEventListener("click", () => {
    showSlide(i);
  });
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
}, 10000);

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

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
    });