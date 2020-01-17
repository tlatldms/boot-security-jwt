import React, { Component } from 'react'
import axios from 'axios';
import ManageItem from './ManageItem';
import cookie from 'react-cookies';

class Manage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            notAuthorized: false,
            token: cookie.load('token')
        }
    }
    componentDidMount(){
        axios.get("http://localhost:8080/getusers",
        {headers: {
            "Authorization" : "Sieun "+ this.state.token
          }
        }
        )
        .then(res => {
            console.log(res.status);
            this.setState({
                users: res.data
            });
        }
        ).catch(e => {
            if (e.response) {
                if (e.response.status==500) {
                    this.setState({
                        notAuthorized: true
                    });
                }
            }
        })
    }

    render() {
        const userList = this.state.users.map(
            x => (
                <ManageItem
                    database= {x}
                />
            )
        );  
        return (
            <div>
                관리 페이지!
                {this.state.notAuthorized ? <div> 권한이 없습니다.</div> : userList}
            </div>
        )
    }
}

export default Manage
