import React, { useContext, useEffect, useRef, useState } from 'react'
import { assets } from '../../assets/assets'
import './BeatsPage.css'
import  toast from 'react-hot-toast'
import axios from 'axios'
import {ManagementContext} from '../../Context/ManagementContext'

const BeatsPage = () => {
  const [thumbnail, setThumbnail] = useState(null);
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [price,setPrice]=useState();
  const [tags,setTags]=useState("");
  const [producer,setProducer]=useState("");
  const [audio, setAudio] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const audio_tag = useRef(null);

  const {backend_url}=useContext(ManagementContext)

  const [beats,setBeats]=useState([]);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
  }

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAudioSrc = file;
      if (audio) {
        URL.revokeObjectURL(audio)
      }
      setAudio(newAudioSrc);
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const formData=new FormData();
      thumbnail && formData.append("thumbnail",thumbnail);
      formData.append("title",title);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("tags",tags);
      formData.append("producer",producer);
      audio && formData.append("audio",audio);
      formData.append("isFeatured",isChecked);

      const response=await axios.post(`${backend_url}/api/admin/addBeat`,formData,);
      if(response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }

const deleteBeat=async(id)=>{
  try {
    const response=await axios.post(`${backend_url}/api/admin/deleteBeat/${id}`);
    if(response.data.success){
      toast.success(response.data.message);
    }else{
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error)
  }
}

useEffect(()=>{
  const fetchBeats=async()=>{
    try {
      const response=await axios.get(`${backend_url}/api/user/beats`);
      if(response.data.success){
        setBeats(response.data.beats);
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }
  fetchBeats()
},[beats,backend_url]);

useEffect(() => {  
  return () => {
    if (audio) {
      URL.revokeObjectURL(audio)
    }
  }
}, [audio])
return (
  <>
    <div className="beats-container">
      {/*-------------------------------*/}
      <div className="beats-left">
        <div className="beats-left-header">
          <p>beats</p>
        </div>
        <div className="beats-left-content">
          {
            beats.map((product, i) => (
              <div key={product._id} className="merch-product">
                <div className="merch-id">
                  <p>{i + 1}</p>
                </div>
                <div className="merch-img">
                  <img id='merch-img' src={product.thumbnail} alt="" />
                </div>
                <div className="merch-title">
                  <p>Title: {product.title}</p>
                </div>
                <div className="merch-quantity">
                  <p>{product.isFeatured ? "Featured" :"Not Featured"}</p>
                </div>
                <div className="merch-price">
                  <p>price {product.price}</p>
                </div>
                <div id='merch-actions' className="merch-actions">
                  <img id='merch-action' onClick={()=>deleteBeat(product._id)} src={assets.deleteI} alt="" />
                  {/*<img id='merch-action' src={assets.edit} alt="" />*/}
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/*-------------------------------*/}
      <div className="beats-right">
        <div className="beats-right-header">
          <h1>Add beats</h1>
        </div>
        <div className="beats-right-content">
          <form onSubmit={handleSubmit} method='post'>
            <div className="form-img">
              <label htmlFor="image">
                <img id='prod-img' src={thumbnail && thumbnail ? URL.createObjectURL(thumbnail) : assets.fileI} alt="" />
                <input
                  type="file"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                  name="image"
                  id="image"
                  hidden
                />
              </label>
              <p>Thumbnail {thumbnail && thumbnail ? thumbnail.name : ""}</p>

            </div>
            <div className="form-class">
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' />
            </div>
            <div className="form-class">
              <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description' />
            </div>
            <div className="form-class">
              <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Price' />
            </div>
            <div className="form-class">
              <input type="text" value={tags} onChange={(e)=>setTags(e.target.value)} placeholder='Tags (e.g. Dancehall type beat, sad type beat, J.cole)' />
            </div>
            <div className="form-class">
              <input type="text" value={producer} onChange={(e)=>setProducer(e.target.value)} placeholder='Producer (use default the_don)' />
            </div>
            <div className="form-class">
              <label htmlFor="audio">Audio
                <input onChange={handleAudioChange} type="file" name="" id="" />
              </label>
              {
                audio && audio
                  ?
                  <audio 
                  ref={audio_tag} 
                  controls 
                  preload="auto" 
                  autoPlay
                  controlsList="nodownload" 
                  onContextMenu={(e) => e.preventDefault()}
                  >
                    <source src={URL.createObjectURL(audio)} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  :
                  <></>
              }
            </div>
            <div className="form-check">
              <label htmlFor="isChecked">Feature beat on HomePage</label>
              <input checked={isChecked} onChange={handleChange} type="checkbox" name="" id="" />
            </div>
            <div className="form-btn">
              <button type='submit'>Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
)
}

export default BeatsPage