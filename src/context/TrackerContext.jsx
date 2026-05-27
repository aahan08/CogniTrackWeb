import { createContext, useState } from "react";

export const TrackerContext = createContext();

export function TrackerProvider({ children }) {
  const [weekData, setWeekData] = useState({});

  return (
    <TrackerContext.Provider value={{ weekData, setWeekData }}>
      {children}
    </TrackerContext.Provider>
  );
}
