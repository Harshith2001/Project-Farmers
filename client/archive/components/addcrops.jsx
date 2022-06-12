import React from "react";
import NavBar from "../../components/NavHeader";

const onSubmit = (data) => console.log(data);
export default function Orders() {
  return (
    <>
      <NavBar />

      {/* <Form formId="user-profile" onSubmit={onSubmit}>
				<Field required>Name of crop</Field>
				<Field required>Quantity</Field>
				<Field required>Price (per kg)</Field>
				<div className="file btn btn-lg btn-primary" style={{ fontSize: 10.6, marginBottom: 20 }}>
					Change Photo
					<input type="file" name="file" />
				</div>
			</Form> */}
    </>
  );
}
