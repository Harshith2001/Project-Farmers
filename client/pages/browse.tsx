import { AppShell, Button, Grid, Group, Modal, NumberInput, Paper, Title } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import HeaderMenuColored from "../components/NavHeader";

function ProductCard({ data }: { data: ProductInfoDto | null }) {
  const [opened, setOpened] = useState(false);

  const form = useForm({
    initialValues: {
      quantity: 1,
      bidValue: 0,
    },
  });

  async function onSubmit() {
    console.log(form.values);
    let x = await fetch(
      process.env.API_URL + `/api/price/${data?.cropName}?quantity=${form.values.quantity}`
    );
    console.log(await x.json());
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
                  onChange={(e) => form.setFieldValue("bidValue", e as number)}
                />
                <NumberInput
                  placeholder="(in number)"
                  label="Quantity"
                  required
                  onChange={(e) => form.setFieldValue("quantity", e as number)}
                  max={data?.availableQuantity}
                />
                <Button type="submit">Buy</Button>
              </Group>
            </form>
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
      .then((data) => setData(data));
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
