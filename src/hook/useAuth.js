import { useContext } from "react";
import UserContext from "../contexts/UserContext";

export const useAuth = () => {
  return useContext(UserContext);
};
