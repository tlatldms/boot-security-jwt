import React, { Component } from 'react'
import axios from 'axios';

class NewUser extends Component {
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
    
    handleEmailCheck = (e) => {
        axios.post("http://localhost:8080/newuser/checkemail", 
            { email: this.state.email}
        )
        .then(res => {
            if (res.data){
                alert("사용 가능한 이메일입니다.");
                this.setState({
                    checked_email : true 
                });
            } else {
                alert("이미 존재하는 이메일입니다.");
                this.setState({
                    email:'',
                    checked_email: false
                });
            }
        }
        ).catch(e => {
            console.log(e);
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        if (!this.state.checked_email) {
            alert("이메일 중복체크를 먼저 해주십시오.");
        } else {
            axios.post("http://localhost:8080/newuser/add",  {
            
                username: String(this.state.username),
                email: String(this.state.email),
                password: String(this.state.password)
                
            }).then(res => {
                if (!res.data.success){
                    alert("이미 존재하는 아이디입니다.");
                } else {
                    alert("가입에 성공했습니다.");
                    window.location.reload();
                }
            }
            ).catch(e => {
                console.log(e);
            })
        }
    
    }
  

    render() {
        return (
            <React.Fragment>
                NewUser
                <form onSubmit={this.handleSubmit}>
                    Email
                    <input 
                        name="email"
                        value= {this.state.email}
                        onChange={this.handleChange}
                    /> <button type="button" onClick={this.handleEmailCheck}>중복체크</button>
                    <br />
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
                
                <div><button type="submit"  >확인</button></div>
                </form>

            </React.Fragment>
        )
    }
}

export default NewUser
