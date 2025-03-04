const imageCount = 5; // Adjust based on your total images per language
let currentLanguage = "english"; // Default to English
let currentImageIndex = 0;
let usingCustomAudio = false; // Flag to track custom audio usage
const swipeThreshold = 50; // Minimum swipe distance in pixels

// DOM elements
const hamburger = document.getElementById('hamburger');
const settings = document.getElementById('settings');
const languageSelect = document.getElementById('language-select');
const selectButton = document.getElementById('select-button');
const mantraImage = document.getElementById('mantra-image');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const speaker = document.getElementById('speaker');
const loopButton = document.getElementById('loop-button');
const audio = document.getElementById('mantra-audio');
const imageDisplay = document.getElementById('image-display');
const customAudioInput = document.getElementById('custom-audio');
const resetAudioButton = document.getElementById('reset-audio');
const audioForm = document.getElementById('audio-form');

// Update image based on language and index
function updateImage() {
    mantraImage.src = `images/${currentLanguage}/HC_${currentLanguage}-${currentImageIndex + 1}.jpg`;
}

// Initialize with English on page load
function init() {
    languageSelect.value = "english";
    updateImage();
    audio.src = `audio/hanuman_chalisa_english.mp3`;
    imageDisplay.style.display = 'block';
}

// Run initialization
init();

// Toggle settings menu
hamburger.addEventListener('click', () => {
    settings.style.display = settings.style.display === 'block' ? 'none' : 'block';
});

// Handle custom audio selection
customAudioInput.addEventListener('change', () => {
    if (customAudioInput.files.length > 0) {
        const file = customAudioInput.files[0];
        audio.src = URL.createObjectURL(file);
        usingCustomAudio = true;
    }
});

// Reset to default audio
resetAudioButton.addEventListener('click', () => {
    audio.src = `audio/hanuman_chalisa_${currentLanguage}.mp3`;
    usingCustomAudio = false;
    audioForm.reset(); // Clear the file input
});

// Language selection
selectButton.addEventListener('click', () => {
    const selectedValue = languageSelect.value;
    if (selectedValue === "") {
        alert("Please select a language!");
        return;
    }
    currentLanguage = selectedValue;
    currentImageIndex = 0;
    updateImage();
    audio.src = `audio/hanuman_chalisa_${currentLanguage}.mp3`;
    usingCustomAudio = false;
    audio.pause();
    audio.currentTime = 0;
    imageDisplay.style.display = 'block';
    settings.style.display = 'none';
    audioForm.reset(); // Clear custom audio selection
});

// Play audio
speaker.addEventListener('click', () => {
    audio.play();
});

// Toggle audio loop
let isLooping = false;
loopButton.addEventListener('click', () => {
    isLooping = !isLooping;
    audio.loop = isLooping;
    loopButton.textContent = isLooping ? "Disable Loop" : "Enable Loop";
});

// Previous button
prevButton.addEventListener('click', () => {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateImage();
    }
});

// Next button
nextButton.addEventListener('click', () => {
    if (currentImageIndex < imageCount - 1) {
        currentImageIndex++;
        updateImage();
    }
});

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;
imageDisplay.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});
imageDisplay.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchStartX - touchEndX;
    if (swipeDistance > swipeThreshold && currentImageIndex < imageCount - 1) {
        currentImageIndex++;
        updateImage();
    } else if (swipeDistance < -swipeThreshold && currentImageIndex > 0) {
        currentImageIndex--;
        updateImage();
    }
});