import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
                checked_email: false,
                token:''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }
  

    handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/newuser/login", 
        { username: this.state.username,
          password: this.state.password}
    )
    .then(res => {
        console.log(res.data);
        this.setState({
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken
        });
        cookie.save('access-token', res.data.accessToken, { path: '/' })
        cookie.save('refresh-token', res.data.refreshToken, { path: '/' })    
    }
    ).catch(e => {
        console.log(e);
    })
    }
  

    render() {
        return (
            <React.Fragment>
                Login Page!
                <form onSubmit={this.handleLogin}>
                    Username
                    <input 
                        value={this.state.username}
                        name="username"
                        onChange={this.handleChange}
                    />
                    <br />
                    Password
                <input 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                
                <div><button type="submit" >로그인하기</button></div>
                </form>
               
            </React.Fragment>
        )
    }
}

export default Login
