import React, { useContext } from "react";
import { Avatar, Divider, Image, Paper, Title, Text } from "@mantine/core";
import UserContext from "../lib/UserContext";
import { useUserData } from "../lib/useUserData";

export default function Profile({ data }: any) {
  const user = useUserData();

  return (
    <Paper radius="md" p={0} withBorder shadow={"lg"} style={{ width: "500px", margin: "0 auto" }}>
      <Avatar
        size={150}
        radius={"xl"}
        style={{ margin: "auto" }}
        src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
        alt="it's me"
      />

      {user?.userId == data.userId && (
        <Text align="center" m={10} size="md">
          (This is You)
        </Text>
      )}
      <Divider my="sm" />
      <p>Username: {data?.userId || "Harsh"}</p>
      <p>Type: {data?.userType}</p>
      <p>Name: {data?.name || "Harshith"}</p>
      <p>Email: {data?.email || "human@gmail.com"}</p>
      <p>Phone: {data?.mobile || "1234567890"}</p>
      <p>City: {data?.city || "Mysore"}</p>
    </Paper>
  );
}
