import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();
  const { login: ctxLogin } = useAuth();

  const handle = async e => {
    e.preventDefault();
    try {
      const { data } = await register(email, password);
      // use context login for consistent behavior
      ctxLogin(data.token);
      nav('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
        <h2>Register</h2>
        <form onSubmit={handle}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button type="submit">Register</button>
            <Link to="/login" className="secondary" style={{ alignSelf: 'center', padding: '8px 10px', textDecoration: 'none' }}>
              Login
            </Link>
          </div>
        </form>
        {err && <p className="error">{err}</p>}
      </div>
    </div>
  );
}
