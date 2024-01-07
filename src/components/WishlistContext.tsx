// WishlistContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface Car {
  vehicle: string;
  imageURL: string;
  price: string;
  description: string[];
}

interface WishlistContextProps {
  wishlist: Car[];
  addToWishlist: (car: Car) => void;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(
  undefined
);

export const WishlistProvider: React.FC = ({ children }: any) => {
  const [wishlist, setWishlist] = useState<Car[]>([]);

  useEffect(() => {
    // Load wishlist from localStorage on component mount
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  const addToWishlist = (car: Car) => {
    setWishlist((prevWishlist) => [...prevWishlist, car]);
  };

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
