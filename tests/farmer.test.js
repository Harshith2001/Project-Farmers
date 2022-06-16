import assert from "node:assert";
import test from "node:test";
import { CROP_NAMES, FIRST_NAMES, LAST_NAMES } from "./mock-data.js";
import { getRand, apiAddr } from "./mock-functions.js";

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
      email: `${fname}${getRand(100)}@farmer.com`,
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

  let quantity = getRand(100);
  const sendAddCropReq = await fetch(apiAddr("/api/product"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accountCreationRes.token,
    },
    body: JSON.stringify({
      cropName: CROP_NAMES[getRand(2)],
      userId: uid,
      quantity: quantity,
      availableQuantity: quantity,
      price: 50,
    }),
  });

  const addCropRes = await sendAddCropReq.json();

  await t.test("Add Crop", (t) => {
    assert.strictEqual(addCropRes.success, true);
  });
});
