import React, { Component } from "react";

export default class SignUp extends Component {
    render() {
        return (
            <form>
                 <div class="form-box">

                
<div class="header-text">
REGISTRATION FORM
</div>

<input placeholder="Enter Your Name" type="text"/>
<input placeholder="Enter Email Address" type="text"/>
<input placeholder="Your Password" type="password"/> 
<input id="terms" type="checkbox"/>
<button>Register</button>
<div class = "align">Have an account? <a href="/home">Login Here</a></div>
</div>
            </form>
        );
    }
}