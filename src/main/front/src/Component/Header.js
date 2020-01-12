import React from 'react'
import { Link } from "react-router-dom";

function Header() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/new">회원가입</Link>
          </li>
         
        </ul>
      </div>
    )
  }
  
  export default Header;