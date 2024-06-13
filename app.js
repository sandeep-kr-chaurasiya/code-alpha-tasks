// Select necessary DOM elements
const slides = document.querySelectorAll('.slide');
const thumbs = document.querySelectorAll('.thumb');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const playPauseBtn = document.querySelector('.play-pause');
const slidesContainer = document.querySelector('.slides');

// State variables
let currentSlideIndex = 0;
let slideInterval;
let isPlaying = false;

// Function to show a specific slide
function showSlide(index) {
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    thumbs.forEach(thumb => thumb.classList.remove('active'));
    thumbs[index].classList.add('active');
}

// Function to move to the next slide
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
}

// Function to move to the previous slide
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
}

// Function to start the automatic slideshow
function playSlides() {
    slideInterval = setInterval(nextSlide, 1500);
    playPauseBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
    isPlaying = true;
}

// Function to stop the automatic slideshow
function pauseSlides() {
    clearInterval(slideInterval);
    playPauseBtn.innerHTML = '&#9658;'; // Play icon
    isPlaying = false;
}

// Function to toggle between play and pause
function togglePlayPause() {
    if (isPlaying) {
        pauseSlides();
    } else {
        playSlides();
    }
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
    pauseSlides();
    prevSlide();
});

nextBtn.addEventListener('click', () => {
    pauseSlides();
    nextSlide();
});

// Event listeners for thumbnail clicks
thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        pauseSlides();
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    });
});

// Event listener for play/pause button
playPauseBtn.addEventListener('click', togglePlayPause);

// Display the initial slide
showSlide(currentSlideIndex);
