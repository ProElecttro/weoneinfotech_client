import { useState, ChangeEvent } from "react";

import "../styles/signIn.css";
import { NavLink, useNavigate } from "react-router-dom";

function SignIn() {
   const navigate = useNavigate()

  const initialFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    
    if(formData.email === undefined || formData.password === undefined){
      alert("Please enter a valid email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/v1/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        navigate('/home')
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="register">
      <p className="title">Sign in</p>
      <label htmlFor="email">Email address</label>
      <br />
      <input
        type="email"
        name="email"
        onChange={handleInputChange}
        className="input-Box"
        placeholder="Enter your email address"
      />

      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        name="password"
        onChange={handleInputChange}
        className="input-Box"
        placeholder="Enter your password"
      />

      <div className="signup">
        <button className="signin-btn" onClick={handleSubmit}>
          Login
        </button>
        <p className="newID">New to weoneinfotech?</p>
        <button className="signup-btn">
          <NavLink to="/register"> <strong>Create an account</strong></NavLink>
        </button>
      </div>
    </div>
  );
}

export default SignIn;