import { AppShell, Group, Paper } from "@mantine/core";
import HeaderMenuColored from "../components/NavHeader";

function OrderCard({ data }: { data: ProductInfoDto | null }) {
  return (
    <Paper shadow="sm" radius="md" p="md" withBorder>
      <Group></Group>
    </Paper>
  );
}

export default function orders() {
  return (
    <AppShell padding={0} header={<HeaderMenuColored />}>
      <OrderCard data={null} />
    </AppShell>
  );
}
