import React, { useContext } from "react";
import { Divider, Image } from "@mantine/core";
import UserContext from "../lib/UserContext";

export default function Profile({ data }: any) {
  //   const user = useContext(UserContext);

  return (
    <>
      <div style={{ width: 240, marginLeft: "auto", marginRight: "auto" }}>
        <Image
          radius="md"
          src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          alt="Random unsplash image"
        />
      </div>
      <Divider my="sm" style={{ marginLeft: "300px", marginRight: "300px" }} />
      <p>Username: {data?.userId || "Harsh"}</p>
      <p>Name: {data?.name || "Harshith"}</p>
      <p>Email: {data?.email || "human@gmail.com"}</p>
      <p>Phone: {data?.mobile || "1234567890"}</p>
      <p>City: {data?.city || "Mysore"}</p>
    </>
  );
}
