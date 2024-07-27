import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use user context
export function useUser() {
  return useContext(UserContext);
}
