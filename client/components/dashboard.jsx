import React, { Component } from "react";

export default class dash extends Component {
    render() {
        return (
            <form>
               
                  <div class="sidebar">
    <div class="logo-details">
      <i class='bx bxl-c-plus-plus'></i>
      <span class="logo_name">FARMER</span>
    </div>
      <ul class="nav-links">
      <li>
          <a href="/profile">
            <i class='bx bx-pie-chart-alt-2' ></i>
            <span class="links_name">View profile</span>
          </a>
        </li>

        
        <li>
          <a href="/addcrops">
            <i class='bx bx-box' ></i>
            <span class="links_name">Add crop</span>
          </a>
        </li>
        <li>
          <a href="/orders">
            <i class='bx bx-list-ul' ></i>
            <span class="links_name">Orders</span>
          </a>
        </li>
        
         
        <li class="log_out">
          <a href="/">
            <i class='bx bx-log-out'></i>
            <span class="links_name">Log out</span>
          </a>
        </li>
      </ul>
  </div>
  
  <section class="home-section">
    <nav>
      <div class="sidebar-button">
        <i class='bx bx-menu sidebarBtn'></i>
        <span class="dashboard">DASHBOARD</span>
      </div>
      {/* <div class="search-box">
        <input type="text" placeholder="Search..."/>
        <i class='bx bx-search' ></i>
      </div> */}
      {/* <div class="profile-details">
        <!--<img src="images/profile.jpg" alt="">-->
        <span class="admin_name">Prem Shahi</span>
        <i class='bx bx-chevron-down'><i/>
      </div> */}
    </nav>
    </section>
  

  </form>

        );
    }
}