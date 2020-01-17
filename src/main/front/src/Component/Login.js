import React, { Component } from 'react'
import axios from 'axios';

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
        console.log(res.data.token);
        this.setState({
            token: res.data.token
        });
        document.cookie = "token=" + res.data.token;
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
