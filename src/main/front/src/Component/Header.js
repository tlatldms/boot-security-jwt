import React from 'react'
import { Link } from "react-router-dom";

function Header() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/new">회원가입</Link>
            <br/>
            <Link to="/manage">관리 페이지</Link>
            <br />
            <Link to="/login">로그인 페이지</Link>
            <br />
            <Link to="/normal">일반인 페이지</Link>
          </li>
         
        </ul>
      </div>
    )
  }
  
  export default Header;