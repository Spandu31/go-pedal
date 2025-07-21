import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/available-cycles');
      } else {
        alert(data.error || 'Invalid login credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Error during login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Login to GO PEDAL</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
