import { useState } from "react";
import UserContext from "../contexts/UserContext";

export const UserProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userData ? userData : "");
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
