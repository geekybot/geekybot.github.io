document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('.carousel-image');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentIndex = 0;

    // Function to handle video slides
    function handleVideoSlide(slide, isActive) {
        if (slide.tagName.toLowerCase() === 'video') {
            if (isActive) {
                slide.currentTime = 5; // Start at 5 seconds
                slide.play().catch(function(error) {
                    console.log("Video play failed:", error);
                });
            } else {
                slide.pause();
            }
        }
    }

    // Function to show specific slide
    function showSlide(index) {
        slides.forEach((slide, i) => {
            const isActive = i === index;
            slide.classList.toggle('active', isActive);
            handleVideoSlide(slide, isActive);
        });
    }

    // Function to show next slide
    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Function to show previous slide
    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Event listeners for buttons
    nextButton.addEventListener('click', showNextSlide);
    prevButton.addEventListener('click', showPrevSlide);

    // Auto-advance carousel every 8 seconds (longer to accommodate the 8-second video)
    let autoAdvance = setInterval(showNextSlide, 8000);

    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });

    // Resume auto-advance when mouse leaves
    carousel.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(showNextSlide, 8000);
    });

    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextSlide();
            } else {
                showPrevSlide();
            }
        }
    }

    // Initialize first slide
    showSlide(currentIndex);
}); 