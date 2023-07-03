import { useEffect, useState } from "react";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import axios from "axios";
import {Link, Navigate, useParams, useLocation} from "react-router-dom";


export default function PlacesFormPage(){
  const{id} = useParams();
    const[title,setTitle] = useState('');
  const[address,setAddress] = useState('');
  const[addedPhotos,setAddedPhotos] = useState([]);
  const[photoLink,setPhotoLink] = useState('');
  const[description,setDescription]= useState('');
  const[perks,setPerks]=useState([]);
  const[extraInfo,setExtraInfo] = useState('');
  const[checkIn,setCheckIn] = useState('');
  const[checkOut,setCheckOut] = useState('');
  const[maxGuests,setMaxGuest] = useState(1);
  const [redirect,setRedirect] = useState(false);
  const [price,setPrice] =useState(100);

  useEffect(()=>{
    if(!id){
      return;
    }

    axios.get('/places/'+id).then(response =>{
      const {data} = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuest(data.maxGuests);
      setPrice(data.price);
    });
  },[id]);
  

  function inputHeader(text){
    return(
      <h2 className="text-2xl mt-4">{text}</h2>
    );
  }

  function inputDescription(text){
    return(
      <p className="text-gray-500 text-sm">{text}</p>
    );
  }

  function preInput(header,description){
    return(
      <>
        {inputHeader(header)}
        {inputDescription(description)}
        
      </>
    )
  }

  async function addPhotoByLink(ev){
    ev.preventDefault();
    const {data:filename} = await axios.post('/upload-by-link',{link:photoLink});
    setAddedPhotos((prev)=>{
      return[...prev,filename];
    });
    setPhotoLink('');
  }


  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios.post('/upload', data, {
      headers: {'Content-type':'multipart/form-data'}
    }).then(response => {
      const {data:filenames} = response;
      setAddedPhotos(prev => {
        return [...prev, ...filenames];
      });
    })
  }

  async function savePlace(ev) {
    const placeData = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests,price,};
    ev.preventDefault();
    if(id){
      //update
      await axios.put('/places', { id,...placeData });
  
    setRedirect(true);
    }else{
      await axios.post('/places', {...placeData });
  
    setRedirect(true);
    }
    
  }
  

  if(redirect){
    return <Navigate to ={"/account/places"}/>
  }

  function removePhoto(ev,filename){
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter(photo => photo !== filename)]);
  }

  function selectAsMainPhoto(ev,filename){
    ev.preventDefault();
    const addedPhotosWithoutselected = addedPhotos.filter(photo => photo !== filename);
    const newAddedPhotos = [filename,...addedPhotosWithoutselected];
    setAddedPhotos(newAddedPhotos);
  }


    return(
        <>
        <AccountNav />
            <form onSubmit={savePlace}>
        {preInput('Title','title for your place. Should be short and catchy as advertisement')}
            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for exaple: My lovely apt"/>
            {preInput('Address','Address to this place')}
            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address"/>
            {preInput('Photos','more = better')}
            <div className="flex gap-2">
              <input type ="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a link .....jpg'}/>
              <button onClick={addPhotoByLink} className="bg-gray-200 grow px-4 rounded-2xl">Add&nbsp;photo</button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 ">
            {addedPhotos.length > 0 &&
  addedPhotos.map((link, index) => (
    <div className="h-32 flex relative" key={index}>
      <img className="rounded-2xl w-full object-cover" src={`http://localhost:4000/uploads/${link}`} alt="" />
      
      <button onClick={(ev)=> removePhoto(ev,link)} className="absolute cursor-pointer bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

      </button>

      <button onClick={(ev)=> selectAsMainPhoto(ev,link)} className="absolute cursor-pointer bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-2 px-3">
      {link === addedPhotos[0] && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
</svg>

      )}
      {link !== addedPhotos[0] && (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
      )}
      


      </button>
    </div>
  ))}
            <label className="flex items-center gap-1 justify-center border bg-transparent rounded-2xl min p-2 text-2xl text-gray-600 cursor-pointer">
  <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
  Upload
</label>

            </div>
            {preInput('Description','Description of the place')}
            <textarea value={description} onChange={ev => setDescription(ev.target.value)}/>
            {preInput('Perks','select all the perks of your place')}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            
            <Perks selected={perks} onChange={setPerks}/>

            </div>
            {preInput('Extra info','house rules,etc')}
            <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)}/>
            {preInput('Check in&out times','add check in and out times,remember to have some time window for cleaning the room between guests')}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
              <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
                <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00"/>
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Check Out time</h3>
                <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="11:00"/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input type="number" value={maxGuests} onChange={ev => setMaxGuest(ev.target.value)}/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input type="number" value={price} onChange={ev => setPrice(ev.target.value)}/>
              </div>
              
              
            </div>

            
            
              <button className="primary my-4">Save</button>
            
        </form>
        </>
    )
}