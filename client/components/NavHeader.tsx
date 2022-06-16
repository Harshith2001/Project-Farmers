import React, { useContext, useEffect, useState } from "react";
import { createStyles, Header, Menu, Group, Center, Burger, Container, Title } from "@mantine/core";
import Link from "next/link";
import { useUserData } from "../lib/useUserData";
import { UserTypes } from "../types/usertypes";

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
    show: UserTypes;
  }[];
}

export default function HeaderMenuColored() {
  const { classes } = useStyles();
  const data = useUserData();

  let links: HeaderSearchProps["links"] = [
    { link: "/browse", label: "Browse", show: UserTypes.endUser },
    { link: `/profile/${data?.userId}`, label: "Profile", show: UserTypes.both },
    { link: "/addcrops", label: "Add crops", show: UserTypes.farmer },
    { link: "/orders", label: "Orders", show: UserTypes.both },
    { link: "/", label: "Logout", show: UserTypes.both },
    { link: "/", label: "Login", show: UserTypes.public },
  ];

  return (
    <Header height={56} className={classes.header} mb={50}>
      <Container>
        <div className={classes.inner}>
          <Title>Project Farmers</Title>
          <Group spacing={5}>
            {links.map((link) => {
              let findUserType = (() => {
                if (data == null || data == undefined) {
                  return UserTypes.public;
                } else if (data?.userType === "farmer") {
                  return UserTypes.farmer;
                } else if (data?.userType === "end-user") {
                  return UserTypes.endUser;
                } else return null;
              })();

              let showIt =
                link.show === UserTypes.all ||
                link.show === findUserType ||
                (link.show === UserTypes.both && findUserType != null && findUserType != UserTypes.public);

              if (!showIt) return null;

              return (
                <Link href={link.link} key={link.label}>
                  <a className={classes.link}>{link.label}</a>
                </Link>
              );
            })}
          </Group>
        </div>
      </Container>
    </Header>
  );
}
