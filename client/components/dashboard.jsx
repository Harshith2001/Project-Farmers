import React, { Component } from "react";

export default class dash extends Component {
    render() {
        return (
            <form>
               
                  <div class="sidebar">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">DASHBOARD</span>
    </div>
      <ul class="nav-links">
      <li>
          <a href="/profile">
            <i class='bx bx-pie-chart-alt-2' ></i>
            <span class="links_name">View profile</span>
          </a>
        </li>

        
        <li>
          <a href="#">
            <i class='bx bx-box' ></i>
            <span class="links_name">Add crop</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Orders</span>
          </a>
        </li>
        
         
        <li class="log_out">
          <a href="#">
            <i class='bx bx-log-out'></i>
            <span class="links_name">Log out</span>
          </a>
        </li>
      </ul>
  </div>
    
  

  </form>

        );
    }
}