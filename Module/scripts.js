document.addEventListener('DOMContentLoaded', () => {
  const pagesContainer = document.querySelector('.pages');
  let currentPage = 0;

  // Function to navigate to the next page
  const nextPage = () => {
      if (currentPage < pagesContainer.children.length - 1) {
          currentPage++;
          updatePages();
      }
  };

  // Function to navigate to the previous page
  const prevPage = () => {
      if (currentPage > 0) {
          currentPage--;
          updatePages();
      }
  };

  // Update the transform property to show the current page
  const updatePages = () => {
      pagesContainer.style.transform = `translateX(-${currentPage * 100}vw)`;
  };

  // Function to fetch images from a local file
  const fetchImages = async () => {
      try {

          const response = await fetch('images.json');
          const data = await response.json();

          // Render each page in the data
          data.forEach(pageData => {
              const page = document.createElement('div');
              page.className = 'page';

              // Render each image on the page
              pageData.page.forEach(image => {
                  const img = document.createElement('img');
                  img.src = image.imageUrl;
                  img.alt = image.title;
                  page.appendChild(img);
              });

              pagesContainer.appendChild(page);
          });

          // Update pages after loading images
          updatePages();
      } catch (error) {
          console.error('Error loading images:', error);
      }
  };


  fetchImages();

  // Event listeners for swipe gestures
  let touchStartX = 0;

  document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
  });

  document.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const swipeThreshold = 50;

      if (touchStartX - touchEndX > swipeThreshold) {
          nextPage();
      } else if (touchEndX - touchStartX > swipeThreshold) {
          prevPage();
      }
  });


  document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
          nextPage();
      } else if (e.key === 'ArrowLeft') {
          prevPage();
      }
  });
});
