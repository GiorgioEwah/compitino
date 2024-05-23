const burger = document.querySelector(".burger");
const nav = document.querySelector(".navbar-links ul");

burger.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.querySelectorAll(".navbar-links a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    nav.classList.remove("active"); // Close the burger menu after clicking
  });
});

const content = document.querySelector(".content");
const thumb = document.querySelector(".faux-scrollbar-thumb");
let isDragging = false;
let startY = 0;
let startTop = 0;

content.addEventListener("scroll", () => {
  const scrollPercentage =
    content.scrollTop / (content.scrollHeight - content.clientHeight);
  const thumbHeight = thumb.clientHeight;
  thumb.style.top = `${
    scrollPercentage * (content.clientHeight * 0.8 - thumbHeight)
  }px`;
});

thumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  startY = e.clientY;
  startTop = parseInt(window.getComputedStyle(thumb).top, 10);
  document.body.style.userSelect = "none"; // Disable text selection
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const deltaY = e.clientY - startY;
    const newTop = startTop + deltaY;
    const maxTop = content.clientHeight * 0.8 - thumb.clientHeight;
    thumb.style.top = `${Math.min(Math.max(newTop, 0), maxTop)}px`;
    const scrollPercentage = newTop / maxTop;
    content.scrollTop =
      scrollPercentage * (content.scrollHeight - content.clientHeight);
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    document.body.style.userSelect = ""; // Re-enable text selection
  }
});

// Ensure the scrollbar starts at the top
thumb.style.top = "0px";

const slides = document.querySelectorAll(".carousel img");
const indicators = document.querySelectorAll(".carousel-indicators div");
let currentIndex = 0;

function goToSlide(index) {
  slides[currentIndex].classList.remove("active");
  indicators[currentIndex].classList.remove("active");
  currentIndex = index;
  slides[currentIndex].classList.add("active");
  indicators[currentIndex].classList.add("active");
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    goToSlide(index);
  });
});

const parallaxItems = document.querySelectorAll(".parallax-item");
const section4 = document.querySelector("#section4");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const section4Top = section4.offsetTop;
  const startScroll = Math.max(scrollTop - section4Top, 0);

  parallaxItems.forEach((item, index) => {
    const speed = (index + 1) * 0.5; // Adjust speed multiplier as needed
    item.style.transform = `translateY(-${startScroll * speed}px)`;
  });
});
