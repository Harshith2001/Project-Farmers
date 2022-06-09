import { createContext } from "react";

export type UserContextType = {
  userId: string;
  userType: "farmer" | "end-user";
};

const UserContext = createContext(JSON.parse(localStorage.getItem("userData") || "{}"));

export default UserContext;
