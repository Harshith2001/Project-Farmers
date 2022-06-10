import { useContext, useEffect } from "react";
import UserContext, { UserContextData } from "./UserContext";

export function useUserData() {
  const [curUserData, setCurUserData] = useContext(UserContext);

  useEffect(() => {
    const localdata = JSON.parse(localStorage.getItem("userData") || "{}") as UserContextData;
    setCurUserData(localdata);
  }, []);

  return curUserData;
}
