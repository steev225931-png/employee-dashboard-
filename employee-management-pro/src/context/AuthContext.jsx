import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('peopleflow-auth') === 'true');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('peopleflow-user')) || null; }
    catch { return null; }
  });

  function login(email) {
    const nextUser = { name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), email };
    sessionStorage.setItem('peopleflow-auth', 'true');
    sessionStorage.setItem('peopleflow-user', JSON.stringify(nextUser));
    setUser(nextUser);
    setIsLoggedIn(true);
  }
  function logout() {
    sessionStorage.removeItem('peopleflow-auth');
    sessionStorage.removeItem('peopleflow-user');
    setUser(null);
    setIsLoggedIn(false);
  }
  return <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used inside AuthProvider');
  return value;
}