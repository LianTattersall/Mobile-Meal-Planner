import { createContext, useState } from "react";

export const SelectedDateContext = createContext();

export const SelectedDateProvider = ({ children }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    index: today.getDay(),
    date: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
  });
  const [meals, setMeals] = useState({});
  return (
    <SelectedDateContext.Provider
      value={{ selectedDate, setSelectedDate, meals, setMeals }}
    >
      {children}
    </SelectedDateContext.Provider>
  );
};
