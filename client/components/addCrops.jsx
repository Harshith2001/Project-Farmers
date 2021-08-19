import React from 'react'
import { Form, Field } from "@leveluptuts/fresh";

const onSubmit = (data) => console.log(data);
export default function Orders() {
    return (
        <div>
            <div id="abc">
                <nav>
                    <ul>
                        <li><a href="/dashboard">Home</a></li>
                        <li><a href="/profile">View Profile</a></li>
                        <li><a href="/addCrops">Add crops</a></li>
                        <li><a href="/orders">Orders</a></li>
                        <li><a href="/login">Logout</a></li>
                    </ul>
                </nav>
            </div>
            <h3>    </h3>
            <Form formId="user-profile" onSubmit={onSubmit}>
            <Field required>Name of crop</Field>
            <Field required>Quantity</Field>
            <Field required>Price (per kg)</Field>
            <div class="file btn btn-lg btn-primary" style={{fontSize:10.6, marginBottom:20}}>
                Change Photo
                <input type="file" name="file"/>
            </div>
            </Form>
        </div>
    )
}