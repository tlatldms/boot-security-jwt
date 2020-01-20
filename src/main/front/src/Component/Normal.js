import React, { Component } from 'react'
import axios from 'axios';
import cookie from 'react-cookies';

class Normal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isNormal: false,
            accessToken: cookie.load('access-token'),
            refreshToken: cookie.load('refresh-token')
        }
    }

    requestAccessToken = () => {
        axios.post("http://localhost:8080/newuser/refresh", {
            accessToken: this.state.accessToken,
            refreshToken: this.state.refreshToken,
        },

        )
        .then(res => {
            console.log(res);
            if (res.data.success) {
                console.log("success to refresh token to: " + res.data.accessToken);
                cookie.save('access-token', res.data.accessToken, { path: '/' })
                this.setState({
                    isNormal: true
                })
            } else {
                console.log("failed to refresh access token. You need re-login.");
                this.setState({
                    isNormal: false
                })
            }
        }
        ).catch(e => {
            console.log(e);
        })
    }
    componentDidMount(){
        axios.get("http://localhost:8080/user/normal",
        {headers: {
            "Authorization" : "Bearer "+ this.state.accessToken
          }
        }
        )
        .then(res => {
            if (res.status == 200) {
                this.setState({
                    isNormal:true,
                });
            } 
        }
        ).catch(e => {
            if (e.response) {
                if (e.response.status==500) {
                    this.setState({
                        isNormal: false
                    });
                } else if (e.response.status == 401) {
                    console.log("got 401");
                    this.requestAccessToken();
                }
            }
        })
    }
    render() {
        return (
            <div>
                일반 유저만 보이는 refresh button: {this.state.isNormal ? <button onClick={this.requestAccessToken}> 토큰 요청하기</button> : "" }
            </div>
        )
    }
}

export default Normal
