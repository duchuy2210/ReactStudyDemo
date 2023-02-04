import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const getRandomPhoto = async limitPhoto => {
  try {
    const response = await axios
      .get(`https://picsum.photos/v2/list?limit=${limitPhoto}`);
    return response.data;
  } catch (error) {
    // handle error
    console.log(error);
  }
};
const Photos = () => {
  const [randomPhotos, setRandomPhotos] = useState([]);
  const [limitPhoto, setLimitPhoto] = useState(8);

  useEffect(() => {
    getRandomPhoto(limitPhoto).then(images => {
      setRandomPhotos(images);
    });
  }, [randomPhotos]);
  const handleLoadMore =async () => {
    setLimitPhoto(limitPhoto => limitPhoto + 8);
    const images = await getRandomPhoto(limitPhoto);
    setRandomPhotos(images);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 p-5">
        {randomPhotos.length > 0 &&
          randomPhotos.map((photo, index) => {
            return (
              <div
                key={`${photo.download_url}${index}`}
                className="p-3 bg-white rounded-lg shadow-md">
                <img
                  className="h-[300px]"
                  src={photo.download_url}
                  alt={index}
                />
              </div>
            );
          })}
      </div>
      <div className="text-center">
        <button
          className="px-3 py-3 mb-10 text-white bg-purple-500 rounded-xl"
          onClick={() => handleLoadMore()}>
          Load More
        </button>
      </div>
    </div>
  );
};

export default Photos;
