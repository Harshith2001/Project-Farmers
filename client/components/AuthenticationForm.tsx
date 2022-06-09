import React from "react";
import { useForm, useToggle } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
} from "@mantine/core";
import Router from "next/router";

export function AuthenticationForm() {
  const [type, toggle] = useToggle("Login", ["Login", "Register"]);

  const form = useForm({
    initialValues: {
      email: "",
      userId: "", // for login
      name: `whatever${Math.floor(Math.random() * 100)}`,
      password: "", // for login
      mobile: `${Math.floor(Math.random() * 1000000000)}`,
      isFarmer: false,
    },

    validationRules: {
      // email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 8,
    },
  });

  function onSubmit(values: any) {
    let body, url;

    if (type === "Login") {
      body = JSON.stringify({
        userId: form.values.userId,
        password: form.values.password,
      });
      url = "/auth/login";
    } else {
      body = JSON.stringify({
        userId: form.values.userId,
        name: form.values.name,
        email: form.values.email,
        mobile: form.values.mobile,
        userType: form.values.isFarmer ? "farmer" : "end-user",
        password: form.values.password,
      });
      url = "/auth/register";
    }

    let req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    };

    fetch(process.env.API_URL + url, req)
      .then((x) => x.json())
      .then((x) => {
        console.log(x);
        if (x.success) {
          localStorage.setItem("jwt", x.token);
          localStorage.setItem("userData", x.userData);
          Router.push("/browse");
        } else {
          alert(x.message);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <Paper radius="md" p="xl" withBorder shadow={"lg"}>
      <Text size="lg" weight={500} align="center">
        {type}
      </Text>

      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group direction="column" grow>
          {type === "Register" && (
            <>
              <TextInput
                required
                label="Email"
                placeholder="hello@films.com"
                value={form.values.email}
                onChange={(event) => form.setFieldValue("email", event.currentTarget.value)}
                error={form.errors.email && "Invalid email"}
              />

              <TextInput
                label="Name"
                placeholder="Your Name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue("name", event.currentTarget.value)}
              />

              <TextInput
                label="Mobile"
                placeholder="Your Mobile"
                value={form.values.mobile}
                onChange={(event) => form.setFieldValue("mobile", event.currentTarget.value)}
              />

              <Checkbox
                label="Are you a farmer?"
                checked={form.values.isFarmer}
                onChange={(event) => form.setFieldValue("isFarmer", event.currentTarget.checked)}
              />
            </>
          )}

          <TextInput
            required
            label="User Id"
            placeholder="Your user Id"
            value={form.values.userId}
            onChange={(event) => form.setFieldValue("userId", event.currentTarget.value)}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
            error={form.errors.password && "Password should include at least 8 characters"}
          />

          {type === "Register" && <></>}
        </Group>

        <Group position="apart" mt="xl">
          <Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
            {type === "Register" ? "Already have an account? Login" : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{type}</Button>
        </Group>
      </form>
    </Paper>
  );
}
