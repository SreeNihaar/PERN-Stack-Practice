import React from 'react'
import {ShoppingCart} from 'lucide-react'

import "./Navbar.css";

export default function Navbar() {
  return (
    <div className='navbar'>
        <div className="name">Products</div>
        <div className="icons"> <ShoppingCart></ShoppingCart> </div>
    </div> 
  )
}
