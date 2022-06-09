import { createContext } from "react";

export type UserContextType = {
  userId: string;
  userType: "farmer" | "end-user";
};

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;
