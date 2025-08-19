import React, { useState } from 'react';
import './login.css'; // Reuse the same CSS

const Register = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setMsg('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/swiggy/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        setMsg(data.msg);
        setTimeout(() => {
          window.location.href = '/swiggy/login';
        }, 1000);
      } else {
        setMsg(data.msg);
      }
    } catch (error) {
      setMsg('Server error: ' + error.message);
    }
  };

  return (
    <div className="login0">
      <h1>Register</h1>
      <div className="loginimg">
        <p>Already have an account? <a href="/swiggy/login">Login</a></p>
        <img src="images/Login.avif" alt="Register" />
      </div>
      <div className="Login">
        <input
          type="email"
          placeholder="e-mail"
          className="mn"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Enter password"
          className="mn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button onClick={handleRegister} id="loginbtn">Register</button>

        <p>By clicking on Register, I accept the Terms & Conditions & Privacy Policy</p>
<p style={{ color: msg.toLowerCase().includes('success') ? 'green' : 'red' }}>{msg}</p>
      </div>
    </div>
  );
};

export default Register;
