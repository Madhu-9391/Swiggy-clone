import React, { useState } from 'react';
import './login.css'; // import your CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      setMsg('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/swiggy/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({email, password })
});
      const data = await response.json();

      if (response.ok) {
        localStorage.clear();
         // ✅ Store token and user name in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail',data.email)
        localStorage.setItem('userName', data.name); // optional
        
        setMsg('Login successful!');
        setTimeout(() => {
          window.location.href = '/profile'; // redirect to your dashboard
        }, 1000);
      } else {
        setMsg(data.msg || 'Invalid credentials!');
      }
    } catch (error) {
      setMsg('Server error: ' + error.message);
    }
  };

  return (
    <div className="login0">
      <h1>Login</h1>
      <div className="loginimg">
        <p>or <a href="/swiggy/register">create an account</a></p>
        <img src="/images/Login_food.jpeg" alt="Login" />
      </div>
      <div className="Login">
        <input
          type="email"
          placeholder="email"
          className="mn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />

        <input
          type="password"
          placeholder="Enter password"
          className="mn"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />

        <button onClick={handleLogin} id="loginbtn">Login</button>

        <p>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
        <p style={{ color: msg.includes('success') ? 'green' : 'red' }}>{msg}</p>
      </div>
    </div>
  );
};

export default Login;
