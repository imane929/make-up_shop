import { createContext, useContext, useState, useEffect } from "react";

const RecentlyViewedContext = createContext();

export const RecentlyViewedProvider = ({ children }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [userId, setUserId] = useState(null);

  const loadRecentlyViewed = () => {
    const storedUserId = localStorage.getItem("userId");
    const storedUser = localStorage.getItem("user");
    const newUserId = storedUserId || (storedUser ? JSON.parse(storedUser)?._id || JSON.parse(storedUser)?.id : null);
    setUserId(newUserId);
  };

  useEffect(() => {
    loadRecentlyViewed();
    
    const handleStorageChange = () => {
      loadRecentlyViewed();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleStorageChange);
    
    const interval = setInterval(loadRecentlyViewed, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const storageKey = userId ? `recentlyViewed_${userId}` : "recentlyViewed_guest";
    const saved = localStorage.getItem(storageKey);
    setRecentlyViewed(saved ? JSON.parse(saved) : []);
  }, [userId]);

  useEffect(() => {
    const storageKey = userId ? `recentlyViewed_${userId}` : "recentlyViewed_guest";
    localStorage.setItem(storageKey, JSON.stringify(recentlyViewed));
  }, [recentlyViewed, userId]);

  const addToRecentlyViewed = (product) => {
    const productId = product._id || product.id;
    const filtered = recentlyViewed.filter(p => (p._id || p.id) !== productId);
    const updated = [product, ...filtered].slice(0, 6);
    setRecentlyViewed(updated);
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addToRecentlyViewed, clearRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
};

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);
