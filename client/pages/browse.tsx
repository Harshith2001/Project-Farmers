import { AppShell, Button, Group, NumberInput, Paper, Title } from "@mantine/core";
import React, { useEffect } from "react";
import HeaderMenuColored from "../components/NavHeader";

function ProductCard({ data }: { data: ProductInfoDto | null }) {
  const [Hover, setHover] = React.useState(false);

  return (
    <Paper shadow="sm" radius="md" p="md" withBorder onMouseOver={() => setHover(true)}>
      <Group>
        <Title order={2}>{data?.productName || "Tomato"}</Title>
        <p>{data?.availableQuantity || "100kg"}</p>
        <p>by {data?.owner || "godzilla"}</p>
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
  // const []
  // useEffect(() => {

  return (
    <AppShell padding={0} header={<HeaderMenuColored />}>
      <Group>
        <ProductCard data={null} />
      </Group>
    </AppShell>
  );
}
