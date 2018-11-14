import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: ""
        };
    }

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

    renderForm() {
        return (
            <div className="App-header" id="signUpForm">
                <form action="/signup" method="post" >
                    First name:<br/>
                    <input type="text" name="firstname" onChange={(e)=>{this.handleChangeFirstName(e)}}/><br/>
                    Last name:<br/>
                    <input type="text" name="lastname" onChange={(e)=>{this.handleChangeLastName(e)}}/><br/>
                    Email:<br/>
                    <input type="text" name="email" onChange={(e)=>{this.handleChangeEmail(e)}}/><br/>
                    <button type="submit" onClick={(e)=>{this.handleSubmit(e)}}>Sign Up</button>
                </form>
            </div>
        )

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Hate the MTA?<br/>
                        Join the revolution today
                    </p>
                    <button type="button" onClick={()=>{document.getElementById('signUpForm').scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"})}}>JOIN</button>
                </header>
                {this.renderForm()}
            </div>
        );
    }
}

export default App;
