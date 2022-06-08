import React from "react";
import { createStyles, Header, Menu, Group, Center, Burger, Container, Title } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors[theme.primaryColor][6],
    borderBottom: 0,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    h1: {
      color: theme.white,
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.white,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 7 : 5],
    },
  },
}));

interface HeaderSearchProps {
  links: {
    link: string;
    label: string;
  }[];
}

export default function HeaderMenuColored() {
  const { classes } = useStyles();

  let links: HeaderSearchProps["links"] = [
    { link: "/profile/dashboard", label: "Home" },
    { link: "/profile", label: "Profile" },
    { link: "/addcrops", label: "Add crops" },
    { link: "/orders", label: "Orders" },
    { link: "/", label: "Logout" },
  ];

  return (
    <Header height={56} className={classes.header} mb={120}>
      <Container>
        <div className={classes.inner}>
          <Title>Project Farmers</Title>
          <Group spacing={5}>
            {links.map((link) => (
              <a key={link.label} href={link.link} className={classes.link}>
                {link.label}
              </a>
            ))}
          </Group>
        </div>
      </Container>
    </Header>
  );
}
