import assert from "node:assert";
import test from "node:test";
import { API_LOCAL_URL_ADDR } from "../api/bin/www.js";
import { FIRST_NAMES, LAST_NAMES } from "./mock-data.js";

function apiAddr(to) {
  return `${API_LOCAL_URL_ADDR}${to}`;
}
const getRand = (till = 10) => Math.floor(Math.random() * till) - 1;

test("farmer Account create and Add Crop", async (t) => {
  let fname = FIRST_NAMES[getRand()];
  let lname = LAST_NAMES[getRand()];
  let uid = `${fname}${lname}`.toLowerCase();

  const sendCreateFarmerAccountReq = await fetch(apiAddr("/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: uid,
      password: "farmer1",
      name: `${fname} ${lname}`,
      email: `${fname}${getRand()}@farmer.com`,
      userType: "farmer",
      mobile: getRand(1000_000_0000),
      city: "Mysore",
    }),
  });

  const accountCreationRes = await sendCreateFarmerAccountReq.json();

  await t.test("Account creation", (t) => {
    assert.strictEqual(accountCreationRes.userData.userType, "farmer");
    assert.strictEqual(accountCreationRes.userData.userId, uid);
  });
});
