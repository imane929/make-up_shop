import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);

  const loadWishlist = () => {
    const storedUserId = localStorage.getItem("userId");
    const storedUser = localStorage.getItem("user");
    const newUserId = storedUserId || (storedUser ? JSON.parse(storedUser)?._id || JSON.parse(storedUser)?.id : null);
    setUserId(newUserId);
  };

  useEffect(() => {
    loadWishlist();
    
    const handleStorageChange = () => {
      loadWishlist();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleStorageChange);
    
    const interval = setInterval(loadWishlist, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const storageKey = userId ? `wishlist_${userId}` : "wishlist_guest";
    const saved = localStorage.getItem(storageKey);
    setWishlist(saved ? JSON.parse(saved) : []);
  }, [userId]);

  useEffect(() => {
    const storageKey = userId ? `wishlist_${userId}` : "wishlist_guest";
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [wishlist, userId]);

  const getProductId = (product) => product._id || product.id;

  const addWishlist = (product) => {
    const productId = getProductId(product);
    if (!wishlist.find(p => getProductId(p) === productId)) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeWishlist = (id) => {
    setWishlist(wishlist.filter(p => getProductId(p) !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some(p => getProductId(p) === id);
  };

  const toggleWishlist = (product) => {
    const productId = getProductId(product);
    if (isInWishlist(productId)) {
      removeWishlist(productId);
    } else {
      addWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addWishlist, removeWishlist, isInWishlist, toggleWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
