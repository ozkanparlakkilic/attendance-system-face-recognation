import { useState } from "react";
import ModelContext from "../contexts/ModelContext";

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState("");
  return (
    <ModelContext.Provider value={{ model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
};
