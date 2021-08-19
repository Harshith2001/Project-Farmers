import React, { Component } from "react";

export default class Login extends Component {
    render() {
        return (
            <form>
                <div class="form-box">

                
                <div class="header-text">
			    LOGIN FORM
		        </div>

                
        <input placeholder="Enter Email Address" type="text"/>
        <input placeholder="Enter Password" type="password"/> 
        
        <button>login</button>
        <div class = "align">Don't have an account? <a href="/signup">Register Here</a></div>
	</div>
            </form>



        );
    }
}