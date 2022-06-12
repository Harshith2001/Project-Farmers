import { AppShell, Grid, Group, Paper, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import HeaderMenuColored from "../components/NavHeader";
import { UserContextData } from "../lib/UserContext";
import { useUserData } from "../lib/useUserData";

function OrderCard({ data }: { data: orderDto | null }) {
  return (
    <Paper shadow="sm" radius="md" p="md" withBorder>
      <Group>
        <Title order={2}>{data?.cropName || "UNKNOWN PRODUCT"}</Title>
        <p>Order Id: {data?._id || "1234"}</p>
        <p>Sold By {data?.fUserId || "Pupa"}</p>
        <p>Sold Quantity: {data?.quantity.toString() || "100kgs"}</p>
        <p>Total Price Paid: {data?.price || "10000"}</p>
      </Group>
    </Paper>
  );
}

export default function orders() {
  const [data, setData] = useState<orderDto[]>([]);

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
      <Grid p={10}>
        {data.map((item) => (
          <Grid.Col span={3}>
            <OrderCard data={item} />
          </Grid.Col>
        ))}
      </Grid>
    </AppShell>
  );
}
