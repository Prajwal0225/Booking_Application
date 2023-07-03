import { useState } from "react";
import './App.css'

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  

  if (showAllPhotos) {
    return (
       
      <div className="absolute inset-0 bg-gray-100 text-black min-h-screen">
        <div className="p-8 grid gap-4 bg-gray-100">
          <div>
            <h2 className=" text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2x shadow-black-500 bg-white-600 text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close Photos
            </button>
          </div>
          <div className="grid h-80 grid-cols-3 gap-4 ">
  {place?.photos?.length > 0 &&
    place.photos.map((photo, index) => (
      <div key={index} className="relative">
        <img
          src={"http://localhost:4000/uploads/" + photo}
          alt=""
          className="w-full h-60 object-cover cursor-pointer rounded-2xl images-hover"
        />
      </div>
    
              ))}
          </div>
        </div>
      </div>
      
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-1 grid-cols-[1fr_1fr] rounded-3xl overflow-hidden ">
        <div>
          {place.photos?.[0] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-spuare cursor-pointer object-cover w-full h-full"
              src={"http://localhost:4000/uploads/" + place.photos[0]}
              alt=""
            />
          )}
        </div>
        <div className="grid gap-1 grid-cols-[1fr_1fr]">
          {place.photos?.[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className=" aspect-spuare cursor-pointer object-cover w-full h-full"
              src={"http://localhost:4000/uploads/" + place.photos[1]}
              alt=""
            />
          )}
          <div className="border overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className=" aspect-spuare cursor-pointer object-cover w-full h-full"
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt=""
              />
            )}
          </div>
          <div className="border overflow-hidden">
            {place.photos?.[3] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className=" aspect-spuare cursor-pointer object-cover w-full h-full"
                src={"http://localhost:4000/uploads/" + place.photos[3]}
                alt=""
              />
            )}
          </div>
          <div className="border overflow-hidden">
            {place.photos?.[4] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className=" aspect-spuare cursor-pointer object-cover w-full h-full"
                src={"http://localhost:4000/uploads/" + place.photos[4]}
                alt=""
              />
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
