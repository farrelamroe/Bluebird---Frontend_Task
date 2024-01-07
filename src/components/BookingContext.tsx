// BookingContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface Car {
  vehicle: string;
  imageURL: string;
  price: string;
  description: string[];
}

interface BookingContextProps {
  bookedCars: Car[];
  bookCar: (car: Car) => void;
}

const BookingContext = createContext<BookingContextProps | undefined>(
  undefined
);

export const BookingProvider: React.FC = ({ children }: any) => {
  const [bookedCars, setBookedCars] = useState<Car[]>([]);

  useEffect(() => {
    // Load booked cars from localStorage on component mount
    const storedBookedCars = localStorage.getItem("bookedCars");
    if (storedBookedCars) {
      setBookedCars(JSON.parse(storedBookedCars));
    }
  }, []);

  const bookCar = (car: Car) => {
    setBookedCars((prevBookedCars) => [...prevBookedCars, car]);
  };

  useEffect(() => {
    // Save booked cars to localStorage whenever it changes
    localStorage.setItem("bookedCars", JSON.stringify(bookedCars));
  }, [bookedCars]);

  return (
    <BookingContext.Provider value={{ bookedCars, bookCar }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
