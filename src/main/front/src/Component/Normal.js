import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';

class Normal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isNormal: false,
            msg: '',
            token: cookie.load('token')
        }
    }
    componentDidMount(){
        axios.get("http://localhost:8080/onlynormal",
        {headers: {
            "Authorization" : "Bearer "+ this.state.token
          }
        }
        )
        .then(res => {
            this.setState({
                isNormal:true,
                msg: res.data
            });
        }
        ).catch(e => {
            if (e.response) {
                if (e.response.status==500) {
                    this.setState({
                        isNormal: false
                    });
                }
            }
        })
    }
    render() {
        return (
            <div>
                일반 유저만 보이는 메시지: {this.state.isNormal ? this.state.msg : ""}
            </div>
        )
    }
}

export default Normal
