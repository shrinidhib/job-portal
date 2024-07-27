"use client"
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage ={userId: localStorage.getItem('userId'), role: localStorage.getItem('role')};
    console.log(userFromStorage)
    if (userFromStorage.userId) {
      setUser(userFromStorage);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUser must be used within a JobProvider');
    }
    return context;
  }

