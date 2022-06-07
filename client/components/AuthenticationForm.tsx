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

export function AuthenticationForm() {
  const [type, toggle] = useToggle("Login", ["Login", "Register"]);

  const form = useForm({
    initialValues: {
      email: "",
      userId: "", // for login
      name: "",
      password: "", // for login
      mobile: "",
      userType: "", // farmer or end-user
      terms: true,
    },

    validationRules: {
      // email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 8,
    },
  });

  function onSubmit(values: any) {
    let req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: form.values.userId,
        password: form.values.password,
      }),
    };
    fetch(process.env.API_URL + "/auth/login", req)
      .then((x) => x.json())
      .then((x) => {
        console.log(x);
        if (x.success) {
          localStorage.setItem("jwt", x.token);
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
            </>
          )}

          <TextInput
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

          {type === "Register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)}
            />
          )}
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
