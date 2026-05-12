import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { url } from '../../config'

const LoginPopup = ({ setShowLogin }) => {

  const [currState, setCurrState] = useState("Login")

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  // INPUT CHANGE HANDLER

  const onChangeHandler = (event) => {

    const name = event.target.name
    const value = event.target.value

    setData((prevData) => ({
      ...prevData,
      [name]: value
    }))

  }

  // LOGIN / REGISTER FUNCTION

  const onLogin = async (event) => {

    event.preventDefault()

    try {

      let newUrl = url

      if (currState === "Login") {

        newUrl += "/api/user/login"

      } else {

        newUrl += "/api/user/register"

      }

      const response = await axios.post(newUrl, data)

      console.log("API RESPONSE:", response.data)

      if (response.data.success) {

        // SAVE TOKEN

        localStorage.setItem(
          "token",
          response.data.token
        )

        alert(
          currState === "Login"
            ? "Login Successful ✅"
            : "Account Created Successfully ✅"
        )

        // CLOSE POPUP

        setShowLogin(false)

        // CLEAR INPUTS

        setData({
          name: "",
          email: "",
          password: ""
        })

      }
      else {

        alert(response.data.message)

      }

    }
    catch (error) {

      console.log(error)

      alert("Server Error ❌")

    }

  }

  return (

    <div className='login-popup'>

      <form
        onSubmit={onLogin}
        className="login-popup-container"
      >

        {/* TITLE */}

        <div className="login-popup-title">

          <h2>{currState}</h2>

          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />

        </div>

        {/* INPUTS */}

        <div className="login-popup-inputs">

          {
            currState === "Sign Up" &&

            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder='Your Name'
              required
            />
          }

          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Your Email'
            required
          />

          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder='Password'
            required
          />

        </div>

        {/* BUTTON */}

        <button type='submit'>

          {
            currState === "Sign Up"
              ? "Create Account"
              : "Login"
          }

        </button>

        {/* TERMS */}

        <div className="login-popup-condition">

          <input type="checkbox" required />

          <p>
            By continuing, I agree to the
            terms of use & privacy policy.
          </p>

        </div>

        {/* TOGGLE LOGIN/SIGNUP */}

        {

          currState === "Login"

            ? (

              <p>

                Create a new account?

                <span
                  onClick={() => setCurrState("Sign Up")}
                >
                  {" "}Click Here
                </span>

              </p>

            )

            : (

              <p>

                Already have an account?

                <span
                  onClick={() => setCurrState("Login")}
                >
                  {" "}Login Here
                </span>

              </p>

            )

        }

      </form>

    </div>

  )

}

export default LoginPopup