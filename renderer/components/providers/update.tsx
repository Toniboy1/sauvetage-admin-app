import React, { ReactNode, createContext, useContext, useState } from "react";

interface UpdateContextType {
  updateMessage: string;
  updateStatus: (message: string) => void;
}

// Creating a context with an initial dummy value
const UpdateContext = createContext<UpdateContextType>({
  updateMessage: "",
  updateStatus: () => {},
});

// Context provider component
interface UpdateProviderProps {
  children: ReactNode;
}

export const UpdateProvider: React.FC<UpdateProviderProps> = ({ children }) => {
  const [updateMessage, setUpdateMessage] = useState("");

  const updateStatus = (message: string) => {
    setUpdateMessage(message);
  };

  return (
    <UpdateContext.Provider value={{ updateMessage, updateStatus }}>
      {children}
    </UpdateContext.Provider>
  );
};

// Hook to use update context
export const useUpdate = () => useContext(UpdateContext);
