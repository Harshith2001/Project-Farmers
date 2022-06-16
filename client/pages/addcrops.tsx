import { AppShell, Group, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { NotificationsProvider, showNotification } from "@mantine/notifications";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import HeaderMenuColored from "../components/NavHeader";
import { UserContextData } from "../lib/UserContext";

const Home: NextPage = () => {
  const form = useForm({
    initialValues: {
      cropName: "",
      quantity: 0,
      availableQuantity: 0,
      price: 0,
    },
  });

  function onSubmit(values: any) {
    const localdata = JSON.parse(localStorage.getItem("userData") || "{}") as UserContextData;
    let body = JSON.stringify({
      cropName: form.values.cropName,
      userId: localdata.userId,
      quantity: form.values.quantity,
      availableQuantity: form.values.availableQuantity,
      price: form.values.price,
    });
    let url = "/api/product";
    let req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
      body: body,
    };
    fetch(process.env.API_URL + url, req)
      .then((res) => res.json())
      .then((data) => {
        showNotification({
          title: data.message,
          message: `${data.data.cropName} - ${data.data.quantity}Kgs`,
        });
        form.setValues({
          cropName: "",
          quantity: 0,
          availableQuantity: 0,
          price: 0,
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <NotificationsProvider>
      <Head>
        <title>Add Crops</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <AppShell
        padding={0}
        header={<HeaderMenuColored />}
        style={{ textAlign: "center", justifyContent: "center" }}>
        <Paper radius="md" p="xl" withBorder shadow={"lg"} style={{ width: "300px", margin: "auto" }}>
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Group direction="column" align="center">
              <TextInput
                required
                label="Crop Name"
                placeholder="Crop Name"
                value={form.values.cropName}
                onChange={(event: { currentTarget: { value: any } }) =>
                  form.setFieldValue("cropName", event.currentTarget.value)
                }
                error={form.errors.cropName && "Invalid Crop Name"}
              />
              <TextInput
                required
                label="quantity"
                placeholder="quantity"
                value={(form.values.quantity, form.values.availableQuantity)}
                onChange={(event: { currentTarget: { value: any } }) => {
                  form.setFieldValue("quantity", event.currentTarget.value);
                  form.setFieldValue("availableQuantity", event.currentTarget.value);
                }}
                error={form.errors.quantity && "Invalid quantity"}
              />
              <TextInput
                required
                label="price"
                placeholder="price"
                value={form.values.price}
                onChange={(event: { currentTarget: { value: any } }) =>
                  form.setFieldValue("price", event.currentTarget.value)
                }
                error={form.errors.price && "Invalid price"}
              />
              <button type="submit">Submit</button>
            </Group>
          </form>
        </Paper>
      </AppShell>
    </NotificationsProvider>
  );
};

export default Home;
