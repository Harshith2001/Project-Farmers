import { AppShell, Grid, Group, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import HeaderMenuColored from "../components/NavHeader";
import { UserContextData } from "../lib/UserContext";
import { useUserData } from "../lib/useUserData";

function OrderCard({ data }: { data: orderDto | null }) {
  return (
    <Paper shadow="sm" radius="md" p="md" withBorder style={{ width: "500px" }}>
      <Stack>
        <Group style={{ backgroundColor: "rgb(120, 180, 240)", borderRadius: "5px" }} p={5}>
          <Title order={2}>{data?.cropName || "UNKNOWN PRODUCT"}</Title>
          <Text size="xs">from {data?.fUserId || "Pupa"}</Text>
        </Group>
        <Group position="apart">
          <Text size="xs">Order Id: {data?._id || "1234"}</Text>
          <Text>{data?.quantity.toString() || "100"} Kg</Text>
          <Text>Paid: {data?.price || "10000"}</Text>
        </Group>
      </Stack>
    </Paper>
  );
}

export default function orders() {
  const [data, setData] = useState<orderDto[] | null>(null);

  useEffect(() => {
    const localdata = JSON.parse(localStorage.getItem("userData") || "{}") as UserContextData;

    fetch(`http://localhost:3100/api/orders/${localdata?.userId}`, {
      headers: {
        Authorization: localStorage.getItem("jwt") || "",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AppShell padding={0} header={<HeaderMenuColored />}>
      <Stack style={{ margin: "0 auto" }} align="center">
        {data ? data?.map((item) => <OrderCard data={item} />) : <Loader />}
      </Stack>
    </AppShell>
  );
}
