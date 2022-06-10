import { AppShell, Loader } from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import HeaderMenuColored from "../../components/NavHeader";
import Profile from "../../components/Profile";

const ProfilePage: NextPage = ({ pageQuery }: any) => {
  const [data, setData] = useState<profileDto | null>(null);

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
    <AppShell padding={0} header={<HeaderMenuColored />} style={{ textAlign: "center" }}>
      {data ? <Profile data={data} /> : <Loader />}
    </AppShell>
  );
};

ProfilePage.getInitialProps = async ({ query }) => {
  let { user } = query;

  return { pageQuery: user };
};

export default ProfilePage;
