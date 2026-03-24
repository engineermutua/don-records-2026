import React, { useContext, useState } from 'react'
import './ContactsPage.css'
import MapComponent from '../../components/MapComponent/MapComponent'
import { ShopContext } from '../../Context/ShopContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const ContactsPage = () => {
    const {backend_url}=useContext(ShopContext);

    const [name,setName]=useState("");
    const [email,setEmail]=useState("")
    const [message,setMessage]=useState("");

    const sendEmail=async(e)=>{
        e.preventDefault();
        try {
            const formData=new FormData();
            formData.append("name",name);
            formData.append("email",email);
            formData.append("message",message);
            const response=await axios.post(`${backend_url}/api/user/contact`,{name,email,message},);
            console.log(response);
            if(response.data.success){
                toast.success(response.data.message);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <>
    <div className="contacts-container">
        <div className="contacts-form">
            <h3>Feel Free To contact us for Assistance</h3>
            <form method='post' onSubmit={sendEmail}>
                <div className="input-class">
                    <label htmlFor="phone">Phone number</label><br/>
                    <input type="text" name="" id="" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="input-class">
                    <label htmlFor="Email Address">Email Address</label><br/>
                    <input type="email" name="" id="" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="input-class">
                    <label htmlFor="Message">Message</label><br/>
                    <textarea rows={5} name="" id="" value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                </div>
                <div className="input-class">
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
        <div className="contacts-map">
            <h3>Our Location</h3>
           <MapComponent/>
        </div>
    </div>
    </>
  )
}

export default ContactsPage