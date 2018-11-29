import React, { Component } from 'react';
import './App.css';

const axios = require('axios');

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            submitted: false,
            clicked: false,
            error: false
        };
    }

    handleChangeFirstName = (e) => {
        this.setState({ firstName: e.target.value, error: false });
    }

    handleChangeLastName = (e) => {
        this.setState({ lastName: e.target.value, error: false });
    }

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value, error: false });
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.validateEmail(this.state.email)) {
            this.setState({ error: true, email: "" });
        } else if (this.state.firstName && this.state.lastName && this.state.email) {
            this.setState({ clicked: true });
            axios.post('/signup', {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email
                })
                .then((response) => {
                    if (response.status === 200) {
                        this.setState({ submitted: true, clicked: false }, () => {
                            document.getElementById('completePage').scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
            });
        } else {
            this.setState({ error: true });
        }
    }

    renderForm() {
        return (
            <div className="App-header" id="signUpForm">
                <form action="/signup" method="post" >
                    <input type="text" name="firstname" className="signup_input" placeholder="First name" onChange={(e)=>{this.handleChangeFirstName(e)}}/><br/>
                    {this.state.error && !this.state.firstName ? <div className="error_message">Please enter your first name</div> : <div className="error_message"></div>}
                    <input type="text" name="lastname" className="signup_input" placeholder="Last name" onChange={(e)=>{this.handleChangeLastName(e)}}/><br/>
                    {this.state.error && !this.state.lastName ? <div className="error_message">Please enter your last name</div> : <div className="error_message"></div>}
                    <input type="email" name="email" className="signup_input" placeholder="Email" onChange={(e)=>{this.handleChangeEmail(e)}}/><br/>
                    {this.state.error && !this.state.email ? <div className="error_message">Please enter your email</div> : <div className="error_message"></div>}
                    <button type="submit" className="signup_btn" disabled={this.state.clicked} onClick={(e)=>{this.handleSubmit(e)}}>Sign Up</button>
                </form>
            </div>
        )
    }

    renderComplete() {
        return (
            <div className="App-header" id="completePage">
                <h2>Thank you for signing up!</h2>
                <h3>Expect to hear from us soon</h3>
            </div>
        )
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Tired of the MTA??</h1>
                    <h2>So are we....</h2>
                    <p>Underground NYC is the first live app that lets you know everything there is to your commute.</p>
                    <button type="button" className="signup_btn" onClick={()=>{document.getElementById('signUpForm').scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"})}}>JOIN NOW</button>
                </header>
                {this.renderForm()}
                {this.state.submitted? this.renderComplete() : null}
            </div>
        );
    }
}

export default App;
