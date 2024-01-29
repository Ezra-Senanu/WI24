document.addEventListener('DOMContentLoaded', function () {
  // Fetch and display images from the JSON file
  fetch('images.json')
      .then(response => response.json())
      .then(data => displayImages(data));
});

function displayImages(images) {
  const gallerySection = document.getElementById('gallery');

  images.forEach(image => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';

      const img = document.createElement('img');
      img.src = image.url;
      img.alt = image.alt;

      galleryItem.appendChild(img);
      gallerySection.appendChild(galleryItem);
  });
}
