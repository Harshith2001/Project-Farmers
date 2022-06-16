import { AppShell, Button, Group, Modal, NumberInput, Paper, Title, Text, Stack } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { NotificationsProvider, showNotification } from "@mantine/notifications";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Check } from "tabler-icons-react";
import HeaderMenuColored from "../components/NavHeader";
import { UserContextData } from "../lib/UserContext";

function ProductCard({ data }: { data: ProductInfoDto | null }) {
  const [opened, setOpened] = useState(false);
  const [price, setPrice] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      quantity: 2,
      bidValue: 107,
    },
  });

  async function onSubmit() {
    console.log(form.values);
    let x = await fetch(
      process.env.API_URL + `/api/price/${data?.cropName}?quantity=${form.values.quantity}`
    );
    let fetchedPrice = await x.json();
    setPrice(fetchedPrice as string);
  }
  async function onSubmitx() {
    // console.log(form.values);
    const localdata = JSON.parse(localStorage.getItem("userData") || "{}") as UserContextData;
    let body = {
      fUserId: data?.userId,
      productId: data?._id,
      quantity: form.values.quantity,
      eUserId: localdata.userId,
      bidValue: form.values.bidValue,
    };
    console.log(body);
    let x = await fetch(process.env.API_URL + `/api/orders`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
    });
    let fetchedPrice = await x.json();
    showNotification({
      title: fetchedPrice.message,
      message: `${data?.cropName} - ${form.values.quantity}Kgs bought`,
      icon: <Check size={48} strokeWidth={2} color={"white"} />,
      autoClose: 10000,
    });
    setTimeout(() => setOpened(false), 500);

    // setPrice(fetchedPrice as string);
    console.log(fetchedPrice);
  }

  return (
    <Paper shadow="sm" radius="md" p="md" withBorder>
      <Group grow>
        <Title order={2}>{data?.cropName || "UNKNOWN PRODUCT"}</Title>
        <p style={{ textAlign: "center" }}>{data?.availableQuantity || "100kg"}kg</p>
        <Link href={`/profile/${data?.userId}`}>
          <a>by {data?.userId || "unknown"}</a>
        </Link>
        <Button onClick={() => setOpened(true)}>Buy</Button>
      </Group>
      <Modal opened={opened} onClose={() => setOpened(false)} title={`${data?.cropName} by ${data?.userId}`}>
        <Paper radius="md" p="md" withBorder m={5}>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack align={"center"}>
              <NumberInput
                placeholder="Bid value (in string)"
                label="Bid Value"
                required
                value={form.values.bidValue}
                onChange={(e) => form.setFieldValue("bidValue", e as number)}
              />
              <NumberInput
                placeholder="(in number)"
                label="Quantity"
                required
                value={form.values.quantity}
                onChange={(e) => form.setFieldValue("quantity", e as number)}
                max={data?.availableQuantity}
              />
              <Button type="submit">Bid</Button>
            </Stack>
          </form>
        </Paper>
        {price != null && (
          <Paper radius="md" p="md" withBorder m={5}>
            <Group position="apart">
              <Text size="lg" weight={500} align="center">
                Final Price: {price}
              </Text>
              <Button onClick={() => onSubmitx()}>Confirm Buy</Button>
            </Group>
          </Paper>
        )}
      </Modal>
    </Paper>
  );
}

export default function browse() {
  const [data, setData] = useState<ProductInfoDto[]>([]);

  useEffect(() => {
    fetch("http://localhost:3100/api/product")
      .then((res) => res.json())
      .then((datax: ProductInfoDto[]) => setData(datax));
  }, []);

  return (
    <NotificationsProvider>
      <AppShell padding={0} header={<HeaderMenuColored />}>
        <Stack style={{ margin: "0 auto", width: "500px" }}>
          {data.map((item) => (
            <ProductCard data={item} />
          ))}
        </Stack>
      </AppShell>
    </NotificationsProvider>
  );
}
