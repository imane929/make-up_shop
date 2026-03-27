import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  const loadCart = () => {
    const storedUserId = localStorage.getItem("userId");
    const storedUser = localStorage.getItem("user");
    const newUserId = storedUserId || (storedUser ? JSON.parse(storedUser)?._id || JSON.parse(storedUser)?.id : null);
    setUserId(newUserId);
  };

  useEffect(() => {
    loadCart();
    
    const handleStorageChange = () => {
      loadCart();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleStorageChange);
    
    const interval = setInterval(loadCart, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const storageKey = userId ? `cart_${userId}` : "cart_guest";
    const saved = localStorage.getItem(storageKey);
    setCart(saved ? JSON.parse(saved) : []);
  }, [userId]);

  useEffect(() => {
    const storageKey = userId ? `cart_${userId}` : "cart_guest";
    localStorage.setItem(storageKey, JSON.stringify(cart));
  }, [cart, userId]);

  const addToCart = (product) => {
    const productId = product._id || product.id;
    const colorKey = product.selectedColor || "";
    const sizeKey = product.selectedSize || "";
    
    const exist = cart.find(p => {
      const pColor = p.selectedColor || "";
      const pSize = p.selectedSize || "";
      return (p._id || p.id) === productId && pColor === colorKey && pSize === sizeKey;
    });
    
    if (exist) {
      setCart(cart.map(p => {
        const pColor = p.selectedColor || "";
        const pSize = p.selectedSize || "";
        if ((p._id || p.id) === productId && pColor === colorKey && pSize === sizeKey) {
          return { ...p, quantity: p.quantity + (product.quantity || 1) };
        }
        return p;
      }));
    } else {
      setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
    }
  };

  const removeFromCart = (cartKey) => {
    setCart(cart.filter(p => {
      const key = `${p._id || p.id}-${p.selectedColor || ""}-${p.selectedSize || ""}`;
      return key !== cartKey;
    }));
  };

  const updateQuantity = (cartKey, quantity) => {
    if (quantity < 1) {
      return;
    } else {
      setCart(cart.map(p => {
        const key = `${p._id || p.id}-${p.selectedColor || ""}-${p.selectedSize || ""}`;
        if (key === cartKey) {
          return { ...p, quantity };
        }
        return p;
      }));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((total, p) => total + p.price * p.quantity, 0);
  const totalItems = cart.reduce((total, p) => total + p.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalPrice,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
