document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 1;

    function showSlide(slideIndex) {
        const slides = document.querySelectorAll('.carousel-slide');
        if (slideIndex > slides.length) {
            currentSlide = 1;
        }
        if (slideIndex < 1) {
            currentSlide = slides.length;
        }

        slides.forEach((slide) => {
            slide.style.transform = `translateX(-${(currentSlide - 1) * 100}%)`;
        });
    }

    function nextSlide() {
        showSlide(currentSlide += 1);
    }

    function prevSlide() {
        showSlide(currentSlide -= 1);
    }

    // Set up event listeners for next and previous buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }

    // Automatically transition to the next slide every 3 seconds
    setInterval(nextSlide, 30000);
    // Assume you have an array of image URLs for the carousel
    const carouselImages = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'];

    // Function to update color theme based on the current image
    function updateColorTheme(imageUrl) {
        Vibrant.from(imageUrl).getPalette().then(palette => {
            const header = document.querySelector('header');
            const footer = document.querySelector('footer');

            // You can customize which color to use (Vibrant, Muted, DarkVibrant, etc.)
            const headerColor = palette.Vibrant.hex;
            const footerColor = palette.Muted.hex;

            header.style.backgroundColor = headerColor;
            footer.style.backgroundColor = footerColor;
        });
    }

    // Example: Change color theme when the image changes in the carousel
    let currentImageIndex = 0;

    function changeImage() {
        const currentImageUrl = carouselImages[currentImageIndex];
        updateColorTheme(currentImageUrl);

        // Increment the index (loop back to the first image when reaching the end)
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    }

    // Add an event listener to your carousel to trigger the color change
    // This can be a click event, a time-based event, or any event based on your carousel implementation
    document.getElementById('nextBtn').addEventListener('click', changeImage);

    // Initial color theme setup (use the first image)
    updateColorTheme(carouselImages[0]);
});
