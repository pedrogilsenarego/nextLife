"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface DataState {
  currentBusiness: string;
  timeRange: string;
}

const initialDataState: DataState = {
  currentBusiness: "total",
  timeRange: "currentMonth",
};

function getInitialState() {
  let currentBusiness = initialDataState.currentBusiness;
  let timeRange = initialDataState.timeRange;

  // Check if localStorage is defined (available in the browser environment)
  if (typeof window !== "undefined") {
    const storedCurrentBusiness = localStorage.getItem("currentBusiness");
    const storedTimeRange = localStorage.getItem("timeRange");

    // Check if storedCurrentBusiness is a valid JSON string
    if (storedCurrentBusiness !== null) {
      try {
        currentBusiness = JSON.parse(storedCurrentBusiness);
      } catch (error) {
        console.error(
          "Error parsing currentBusiness from localStorage:",
          error
        );
      }
    }

    // Check if storedTimeRange is a valid JSON string
    if (storedTimeRange !== null) {
      try {
        timeRange = JSON.parse(storedTimeRange);
      } catch (error) {
        console.error("Error parsing timeRange from localStorage:", error);
      }
    }
  }

  return {
    currentBusiness: currentBusiness || initialDataState.currentBusiness,
    timeRange: timeRange || initialDataState.timeRange,
  };
}

interface DataContextValue {
  state: DataState;
  setCurrentBusiness: React.Dispatch<
    React.SetStateAction<DataState["currentBusiness"]>
  >;
  setTimeRange: React.Dispatch<React.SetStateAction<DataState["timeRange"]>>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState = getInitialState();
  const [currentBusiness, setCurrentBusiness] = useState<
    DataState["currentBusiness"]
  >(initialState.currentBusiness);
  const [timeRange, setTimeRange] = useState<DataState["timeRange"]>(
    initialState.timeRange
  );

  const state = { currentBusiness, timeRange };

  const contextValue: DataContextValue = {
    state,
    setCurrentBusiness,
    setTimeRange,
  };

  useEffect(() => {
    localStorage.setItem("currentBusiness", JSON.stringify(currentBusiness));
  }, [currentBusiness]);
  useEffect(() => {
    localStorage.setItem("timeRange", JSON.stringify(timeRange));
  }, [timeRange]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
