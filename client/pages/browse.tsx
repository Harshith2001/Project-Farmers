import { AppShell, Button, Group, NumberInput, Paper, Title } from "@mantine/core";
import React, { useEffect } from "react";
import HeaderMenuColored from "../components/NavHeader";

function ProductCard({ data }: { data: ProductInfoDto | null }) {
  const [Hover, setHover] = React.useState(false);

  return (
    <Paper shadow="sm" radius="md" p="md" withBorder onMouseOver={() => setHover(true)}>
      <Group>
        <Title order={2}>{data?.cropName || "Tomato"}</Title>
        <p>{data?.availableQuantity || "100kg"}kg</p>
        <p>by {data?.userId || "godzilla"}</p>
      </Group>
      {Hover && (
        <>
          <Group>
            <NumberInput placeholder="Bid value (in string)" label="Bid Value" required />
            <NumberInput placeholder="(in number)" label="Quantity" required />
          </Group>
          <Button>Buy</Button>
        </>
      )}
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
      <Group>
        {data.map((item) => (
          <ProductCard data={item} />
        ))}
      </Group>
    </AppShell>
  );
}
