import { useContext } from "react";
import ModelContext from "../contexts/ModelContext";

export const useAuth = () => {
  return useContext(ModelContext);
};
