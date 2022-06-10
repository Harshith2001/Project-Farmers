import { createContext, Dispatch, SetStateAction } from "react";

export type UserContextData = {
  userId: string;
  userType: "farmer" | "end-user";
};

type UserContextType = [UserContextData | null, Dispatch<SetStateAction<UserContextData | null>>];

const UserContext = createContext<UserContextType>([null, () => null]);

export default UserContext;
