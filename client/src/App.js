import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');

class App extends Component {

    // state = {users: []}
    //
    // componentDidMount() {
    //   fetch('/users')
    //     .then(res => res.json())
    //     .then(users => this.setState({ users }));
    // }
    //
    // render() {
    //   return (
    //     <div className="App">
    //       <h1>Users</h1>
    //       {this.state.users.map(user =>
    //         <div key={user.id}>{user.username}</div>
    //       )}
    //     </div>
    //   );
    // }

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: ""
        };
    }

    // onClickSignUp() {
    //     //   fetch('/users')
    //     //     .then(res => res.json())
    //     //     .then(users => this.setState({ users }));
    //     post('/signup');
    // }

    handleChangeFirstName = (e) => {
        this.setState({firstName: e.target.value});
    }

    handleChangeLastName = (e) => {
        this.setState({lastName: e.target.value});
    }

    handleChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/signup', {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
        });
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Hate the MTA?<br/>
                        Join the revolution today
                    </p>
                    <form action="/signup" method="post" >
                        First name:<br/>
                        <input type="text" name="firstname" onChange={(e)=>{this.handleChangeFirstName(e)}}/><br/>
                        Last name:<br/>
                        <input type="text" name="lastname" onChange={(e)=>{this.handleChangeLastName(e)}}/><br/>
                        Email:<br/>
                        <input type="text" name="email" onChange={(e)=>{this.handleChangeEmail(e)}}/><br/>
                        <button type="submit" onClick={(e)=>{this.handleSubmit(e)}}>Sign Up</button>
                    </form>
                </header>
            </div>
        );
    }
}

export default App;
