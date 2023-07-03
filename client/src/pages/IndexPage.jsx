import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css';

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      // setPlaces(...response.data,...response.data,...response.data,...response.data,...response.data,...response.data);
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-6 gap-y-8 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
      {places.length > 0 && places.map((place, index) => (
        <Link key={`${place._id}-${index}`} to={`/place/${place._id}`}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <div className="">
                <img className="rounded-2xl object-cover aspect-square" src={`http://localhost:4000/uploads/${place.photos?.[0]}`} alt="" />
              </div>
            )}
          </div>
          <h2 className="text-sm truncate leading-4">{place.address}</h2>
          <h3 className="font-bold leading-4 text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">₹{place.price} </span>per night
          </div>
        </Link>
      ))}
    </div>
  );
}
