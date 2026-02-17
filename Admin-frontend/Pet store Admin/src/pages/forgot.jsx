import image from '../assets/pet.jpg'
import { useState } from 'react'
import { sendCredentials } from '../../api.js/petApi'
import { useNavigate } from 'react-router-dom'
import './Forgot.css'

function Forgot() {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await sendCredentials(email)
      console.log(response)

      if (response?.message === "Credentials sent to the provided email") {
        navigate('/message')
      } else {
        console.error('Failed to send credentials:', response?.message)
      }
    } catch (error) {
      console.error("Error sending credentials:", error)
    }
  }

  return (
    <div className="forgot">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <div className="forgot-left">
          <h1 className="forgot-title">Enter Your Email Address</h1>

          <input
            className="forgot-input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="forgot-btn" type="submit">
            Send Credentials
          </button>
        </div>

        <div className="forgot-right">
          <img src={image} alt="forgot" />
        </div>
      </form>
    </div>
  )
}

export default Forgot
