import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (

    <div className='footer' id='footer'>

      <div className="footer-content">

        {/* LEFT SECTION */}

        <div className="footer-content-left">

          <h1>Tomato.</h1>

          <p>
            Delivering fresh, delicious meals right to your doorstep.
            At Food Del, we combine quality ingredients with exceptional
            service to give you the best dining experience every single time.
          </p>

          <div className="footer-social-icons">

            <img
              src={assets.linkedin_icon}
              alt="LinkedIn"
            />

            <img
              src={assets.facebook_icon}
              alt="Facebook"
            />

            <img
              src={assets.twitter_icon}
              alt="Twitter"
            />

          </div>

        </div>

        {/* CENTER SECTION */}

        <div className="footer-content-center">

          <h2>COMPANY</h2>

          <ul>

            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>

          </ul>

        </div>

        {/* RIGHT SECTION */}

        <div className="footer-content-right">

          <h2>Get In Touch</h2>

          <ul>

            <li>+91 90000 00001</li>
            <li>contact@tomato.com</li>

          </ul>

        </div>

      </div>

      <hr />

      <p className="footer-copyright">
        Copyright 2024 © Tomato.com - All Rights Reserved.
      </p>

    </div>

  )
}

export default Footer