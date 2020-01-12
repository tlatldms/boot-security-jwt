import React, { Component } from 'react'
import axios from 'axios';

class NewUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        })
    }
    
    handleSubmit = (e) => {
        axios.post("http://localhost:8080/demo/add",  {
            
            username: String(this.state.username),
            email: String(this.state.email),
            password: String(this.state.password)
         
        }).then(res => {
            console.log(res);
        }
        ).catch(e => {
            console.log(e);
        })
    }

    render() {
        return (
            <React.Fragment>
            <div>
                Email
                <input 
                    name="email"
                    onChange={this.handleChange}
                />
            </div>
             <div>
                Username
                <input 
                    name="username"
                    onChange={this.handleChange}
                />
            </div>
             <div>
                 Password
             <input 
                    name="password"
                    onChange={this.handleChange}
                />
            </div>
            <div><button onClick={this.handleSubmit}>확인</button></div>
            </React.Fragment>
        )
    }
}

export default NewUser
