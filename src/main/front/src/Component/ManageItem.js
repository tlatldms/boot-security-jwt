import React, { Component } from 'react'
import axios from 'axios';
class ManageItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    deleteUser = (e) => {
        axios.post("http://localhost:8080/deleteuser",
        {
            username: this.props.database.username
        }
        )
        .then(res => {
            console.log(res);
        }
        ).catch(e => {
            console.log(e);
        })

    }
    render() {
        const {username, role, email} = this.props.database;
        return ( 
            <div className="user">
                username: {username}, email: {email}, role:  {role} <button onClick={this.deleteUser}>삭제하기</button>
            </div>
        );
    }
}

export default ManageItem
