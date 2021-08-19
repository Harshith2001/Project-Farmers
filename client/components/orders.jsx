import React from 'react'
import data from './data.js'

// const data = [
//   {
//   id:1,
//   img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSlj6P0WiQJI6tvelVGxKck67BjywVvr6YNIG7xg62UyXE64p_Efs_2eNx0R4MklfN7_5Zn2l--L7E&usqp=CAc",
//   cropName:'Potatoes',
//   price: '20/kg'
//   }
//   ,
//   {
//   id:2,
//   img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQOmUriyVWi9qeAuPc61YmPJmXUdXa87dadJvjfL-jfSD24Z2iw_WoTfjgx2uZ5yjEoIfSOr_-edd8&usqp=CAc",
//   cropName:'Tomatoes',
//   price:'30/kg'
//   }
//   ,
//   {
//   id:3,
//   img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTKnacSmS2dV9AWMq9kkghVL0wpMK9Ja-3nRnSYiXltN2Uo8ZtIADQBD6u-qa7iQkZ63GbCavW9sdU&usqp=CAc",
//   cropName:'Onions',
//   price:'40/kg'
//   }
// ];


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
            <div className="orderBox">
                {data.map((dat)=>{
                    const {img, cropName, price} = dat;
                    return (
                        <div className="order" style={{marginLeft:5, marginRight:5}}>
                            <img src={img} alt=''></img>
                            <h1>{cropName}</h1>
                            <h4>{price}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// const order = (props) => {
//     const {img, cropName, price} = props;

//     return (
//         <div className="order">
//             <img src={img} alt=''></img>
//             <h1>{cropName}</h1>
//             <h4>{price}</h4>
//         </div>
//     )
// }
