import { AppShell, Loader } from "@mantine/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderMenuColored from "../../components/NavHeader";
import Profile from "../../components/Profile";
import UserContext, { UserContextType } from "../../lib/UserContext";

const ProfilePage: NextPage = ({ pageQuery }: any) => {
  const [data, setData] = useState<profileDto | null>(null);
  const [curUserData, setCurUserData] = useState<UserContextType | null>(null);

  useEffect(() => {
    const localdata = JSON.parse(localStorage.getItem("userData") || "{}") as UserContextType;
    setCurUserData(localdata);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3100/api/user/${pageQuery}`, {
      headers: {
        Authorization: localStorage.getItem("jwt") || "",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data[0]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={curUserData}>
      <AppShell padding={0} header={<HeaderMenuColored />} style={{ textAlign: "center" }}>
        {data ? <Profile data={data} /> : <Loader />}
      </AppShell>
    </UserContext.Provider>
  );
};

ProfilePage.getInitialProps = async ({ query }) => {
  let { user } = query;

  return { pageQuery: user };
};

export default ProfilePage;
