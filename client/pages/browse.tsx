import {
  AppShell,
  Button,
  Divider,
  Grid,
  Group,
  Modal,
  NumberInput,
  Paper,
  Title,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
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
    // setPrice(fetchedPrice as string);
    console.log(fetchedPrice);
  }

  return (
    <Paper shadow="sm" radius="md" p="md" withBorder>
      <Group>
        <Title order={2}>{data?.cropName || "UNKNOWN PRODUCT"}</Title>
        <p>{data?.availableQuantity || "100kg"}kg</p>
        <p>by {data?.userId || "unknown"}</p>
        <Button onClick={() => setOpened(true)}>Buy</Button>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title={`${data?.cropName} by ${data?.userId}`}>
          <Paper radius="md" p="md" withBorder>
            <form onSubmit={form.onSubmit(onSubmit)}>
              <Group>
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
                <Button type="submit">Buy</Button>
              </Group>
            </form>
            {price != null && (
              <>
                <Divider p={10} />
                <Text size="lg" weight={500} align="center">
                  Final Price: {price}
                </Text>
                <Button onClick={() => onSubmitx()}>Bid</Button>
              </>
            )}
          </Paper>
        </Modal>
      </Group>
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
    <AppShell padding={0} header={<HeaderMenuColored />}>
      <Grid p={10}>
        {data.map((item) => (
          <Grid.Col span={4}>
            <ProductCard data={item} />
          </Grid.Col>
        ))}
      </Grid>
    </AppShell>
  );
}
