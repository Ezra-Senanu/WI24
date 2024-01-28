// src/components/Gallery.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch photos from the server
    axios.get('/api/photos').then((response) => {
      setPhotos(response.data);
    });
  }, []);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div>
      <h1>Photography Portfolio</h1>
      <div>
        {photos.map((photo, index) => (
          <img
            key={index}
            src={`/uploads/${photo.filename}`}
            alt={`Photo ${index + 1}`}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={`/uploads/${photos[photoIndex].filename}`}
          nextSrc={`/uploads/${photos[(photoIndex + 1) % photos.length].filename}`}
          prevSrc={`/uploads/${photos[(photoIndex + photos.length - 1) % photos.length].filename}`}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + photos.length - 1) % photos.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % photos.length)}
        />
      )}
    </div>
  );
};

export default Gallery;
