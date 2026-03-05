import React from 'react'
import './ContactsPage.css'
import MapComponent from '../../components/MapComponent/MapComponent'

const ContactsPage = () => {
  return (
    <>
    <div className="contacts-container">
        <div className="contacts-form">
            <h3>Feel Free To contact us for Assistance</h3>
            <form method='post'>
                <div className="input-class">
                    <label htmlFor="phone">Phone number</label><br/>
                    <input type="text" name="" id="" />
                </div>
                <div className="input-class">
                    <label htmlFor="Email Address">Email Address</label><br/>
                    <input type="email" name="" id="" />
                </div>
                <div className="input-class">
                    <label htmlFor="Message">Message</label><br/>
                    <textarea rows={5} name="" id=""></textarea>
                </div>
                <div className="input-class">
                    <button>Submit</button>
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