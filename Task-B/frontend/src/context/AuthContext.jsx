import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AuthContext = createContext(null);

// optional external logout handler registration
let externalLogoutHandler = null;
export function registerExternalLogoutHandler(fn) {
  externalLogoutHandler = fn;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // keep auth in sync across tabs/windows
  useEffect(() => {
    const onStorage = e => {
      if (e.key === 'token') {
        // only update if different
        if (e.newValue !== token) {
          setToken(e.newValue);
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [token]);

  const login = newToken => setToken(newToken);
  const logout = () => {
    setToken(null);
    if (typeof externalLogoutHandler === 'function') {
      try {
        externalLogoutHandler();
      } catch (err) {
        // swallow errors from external handlers
        // eslint-disable-next-line no-console
        console.error('externalLogoutHandler error', err);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

