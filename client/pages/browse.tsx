import { AppShell, Button, Grid, Group, Modal, NumberInput, Paper, Title } from "@mantine/core";
import { Module } from "module";
import React, { useEffect, useState } from "react";
import HeaderMenuColored from "../components/NavHeader";

function ProductCard({ data }: { data: ProductInfoDto | null }) {
  const [opened, setOpened] = useState(false);

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
            <Group>
              <NumberInput placeholder="Bid value (in string)" label="Bid Value" required />
              <NumberInput
                placeholder="(in number)"
                label="Quantity"
                required
                max={data?.availableQuantity}
              />
              <Button>Buy</Button>
            </Group>
          </Paper>
        </Modal>
      </Group>
    </Paper>
  );
}

export default function browse() {
  const [data, setData] = React.useState<ProductInfoDto[]>([]);
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
